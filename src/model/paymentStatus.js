const Pool = require('../config/db');

const selectData = () => Pool.query('SELECT * FROM payment_status');

const insertData = (data) => {
  const { id, name } = data;
  return Pool.query(`INSERT INTO payment_status(id,name) VALUES(${id},'${name}')`);
};

const updateData = (id, data) => {
  const { name } = data;
  return Pool.query(`UPDATE payment_status SET name='${name}' WHERE id='${id}'`);
};

const deleteData = (id) => Pool.query(`DELETE FROM payment_status where id='${id}'`);

module.exports = {
  selectData, insertData, deleteData, updateData,
};
