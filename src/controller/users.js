const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { common } = require('../middleware/common');
const { create, findEmail, verification } = require('../model/users');
const { generateToken } = require('../helpers/auth');
const email = require('../middleware/email');

const Port = process.env.PORT;
const Host = process.env.HOST;

const UsersController = {
  insert: async (req, res, next) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    console.log('role', req.params.role);
    const role = req.params.role;

    if (users) {
      return common(res, 404, false, 'email already use', ' register fail');
    }

    const digit = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digit[Math.floor(Math.random() * 10)];
    }

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password);
    const data = {
      id: uuidv4(),
      email: req.body.email,
      password,
      fullname: req.body.fullname,
      role,
      otp,
    };
    try {
      const result = await create(data);
      if (result) {
        console.log(result);
        const verifyUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        const sendEmail = email(data.email, otp, verifyUrl, data.fullname);
        if (sendEmail == 'email not send') {
          return common(res, 404, false, null, ' register fail');
        }
        common(
          res,
          200,
          true,
          { email: data.email },
          'register success. check email!'
        );
      }
    } catch (err) {
      console.log(err);
      common(res, 404, false, err, ' register fail');
    }
  },
  login: async (req, res, next) => {
    console.log('email', req.body.email);
    console.log('password', req.body.password);
    // let {rows:[users]} = await findEmail(req.body.email)
    // if(!users){
    //   return common(res, 404, false, null, ' email not found');

    // }
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return common(res, 404, false, null, ' email not found');
    }

    if (users.verif == 0) {
      return common(res, 404, false, null, ' email not verify');
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return common(res, 404, false, null, 'wrong password');
    }
    delete users.password;
    delete users.otp;
    delete users.verif;
    const payload = {
      email: users.email,
      role: users.role,
    };
    users.token = generateToken(payload);
    common(res, 200, false, users, 'login success');
  },

  otp: async (req, res, next) => {
    console.log('Email', req.body.email);
    console.log('Password', req.body.otp);
    const {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return common(res, 404, false, null, 'email not found');
    }

    if (users.otp == req.body.otp) {
      const result = await verification(req.body.email);
      return common(res, 200, true, result, 'verification email success ');
    }
    return common(
      res,
      404,
      false,
      null,
      'Otp not valid, please check your email!'
    );
  },
};

exports.UsersController = UsersController;
