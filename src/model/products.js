const Pool = require('../config/db')

const selectData = () => {
  return Pool.query(`SELECT * FROM products`);
}
const insertData = (data) => {
const {id, name, stock, price} = data;
  return Pool.query(`INSERT INTO products(id,name,stock,price) VALUES(${id},'${name}',${stock},${price})`);
}

const updateData = (id, data) => {
const {name, stock, price} = data;
  return Pool.query(`UPDATE products SET name='${name}',stock='${stock}',price='${price}' WHERE id='${id}'`);
}
const deleteData = (id) => {
  return Pool.query(`DELETE FROM products where id ='${id}'`);
}
const searchData = (data) =>{
  return Pool.query(`SELECT * FROM products WHERE name LIKE '${data}'`)
}
const sortData = () =>{
  return Pool.query(`SELECT * FROM products ORDER BY id asc`)
}
const pagination = () =>{
  return Pool.query(`SELECT * FROM products LIMIT 20 OFFSET 40`)
}
module.exports = {selectData, insertData, deleteData, updateData, searchData, sortData, pagination }