/* eslint-disable camelcase */
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const authHelper = require('../helpers/auth');
const cloudinary = require('../helpers/cloudinary');

const { findByEmail, create, update, verification } = require('../model/users');
const commonHelper = require('../helpers/common');
const sendmail = require('../helpers/mail');

const register = async (req, res, next) => {
  try {
    const { email, password, fullname, role, phone_number, store_name } =
      req.body;
    const { rowCount } = await findByEmail(email);
    const digit = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digit[Math.floor(Math.random() * 10)];
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    if (rowCount) {
      return next(createError(403, 'User sudah terdaftar'));
    }
    const data = {
      id: uuidv4(),
      email,
      password: passwordHash,
      fullname,
      role,
      phone_number,
      store_name,
      otp,
    };
    const result = await create(data);
    if (result) {
      console.log(result);
      const verifyUrl = `http://localhost:3000/users/${req.body.email}/${otp}`;
      const sendEmail = sendmail(data.email, otp, verifyUrl, data.fullname);
      if (sendEmail == 'email not send') {
        return commonHelper.response(res, null, 404, 'User gagal register');
      }
      commonHelper.response(res, null, 201, 'User berhasil register');
    }
    // sendEmail(email, otp, fullname);
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
    // commonHelper.response(res, null, 400, 'User gagal register');
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findByEmail(email);

    if (!user) {
      return commonHelper.response(
        res,
        null,
        403,
        'email atau password anda salah'
      );
    }
    if (user.verif === 0) {
      return commonHelper.response(res, null, 403, 'email belum diverifikasi');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return commonHelper.response(
        res,
        null,
        403,
        'email atau password anda salah'
      );
    }
    delete user.password;
    delete user.otp;
    delete user.verif;

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.generateRefreshToken(payload);

    return commonHelper.response(res, user, 201, 'anda berhasil login');
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const profile = async (req, res, next) => {
  const email = req.decoded.email;
  const {
    rows: [user],
  } = await findByEmail(email);
  // delete user.password;
  commonHelper.response(res, user, 200, 'get data sucess');
};

const updateProfile = async (req, res, next) => {
  try {
    const emailUser = req.decoded.email;
    console.log(emailUser);
    const {
      rows: [user],
    } = await findByEmail(emailUser);
    const result = parseInt(user.total);
    if (result === 0) {
      return commonHelper.response(res, 404, 'Data not found');
    }
    const {
      fullname,
      email,
      phone_number,
      gender,
      birth,
      address,
      store_name,
      store_description,
    } = req.body;
    const updated_at = new Date();
    const photos = req.file.path;
    const ress = await cloudinary.uploader.upload(photos);
    const data = {
      fullname,
      email,
      phone_number,
      photo: ress.url,
      gender,
      birth,
      address,
      store_name,
      store_description,
      updated_at,
    };
    await update(data, emailUser);
    commonHelper.response(res, data, 201, 'update user success');
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT2);
  const payload = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };
  const result = {
    token: authHelper.generateToken(payload),
    refreshToken: authHelper.generateRefreshToken(payload),
  };
  commonHelper.response(res, result, 200);
};

const otp = async (req, res, next) => {
  // const { email, otp } = req.body;
  const {
    rows: [users],
  } = await findByEmail(req.body.email);
  if (!users) {
    return commonHelper.response(res, null, 404, 'email not found');
  }
  if (users.otp === req.body.otp) {
    const result = await verification(req.body.email);
    return commonHelper.response(
      res,
      result,
      200,
      'verification email success'
    );
  }

  return commonHelper.response(
    res,
    users,
    404,
    'Otp not valid, please check your email!'
  );
};

module.exports = {
  register,
  login,
  profile,
  refreshToken,
  updateProfile,
  otp,
};
