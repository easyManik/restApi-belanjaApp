/* eslint-disable camelcase */
const Pool = require('../config/db');

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const create = ({
  id,
  email,
  password,
  fullname,
  role,
  phone_number,
  store_name,
  otp,
}) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'INSERT INTO users(id, email, password, fullname, role, phone_number, store_name,otp,verif )VALUES($1, $2, $3, $4, $5, $6, $7, $8, 0)',
      [id, email, password, fullname, role, phone_number, store_name, otp],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const verification = (email) =>
  new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE "email"='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );

const update = (
  {
    fullname,
    email,
    phone_number,
    photo,
    gender,
    birth,
    address,
    store_name,
    store_description,
    updated_at,
  },
  emailUser
) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'UPDATE users SET fullname = COALESCE($1, fullname), email = COALESCE($2, email), phone_number = COALESCE($3, phone_number), photo = COALESCE($4, photo), gender = COALESCE($5, gender), birth = COALESCE($6, birth), address = COALESCE($7, address), store_name = COALESCE($8, store_name), store_description = COALESCE($9, store_description), updated_at = COALESCE($10, updated_at)  WHERE email = $11',
      [
        fullname,
        email,
        phone_number,
        photo,
        gender,
        birth,
        address,
        store_name,
        store_description,
        updated_at,
        emailUser,
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};
module.exports = {
  findByEmail,
  create,
  update,
  verification,
};
