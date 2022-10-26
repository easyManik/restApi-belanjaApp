const Pool = require('../config/db');

const selectData = () => Pool.query('SELECT * FROM products');
const insertData = (data) => {
  const {
    id, name, stock, price,
  } = data;
  return Pool.query(`INSERT INTO products(id,name,stock,price) VALUES(${id},'${name}',${stock},${price})`);
};
const updateData = (id, data) => {
  const { name, stock, price } = data;
  return Pool.query(`UPDATE products SET name='${name}',stock='${stock}',price='${price}' WHERE id='${id}'`);
};
const deleteData = (id) => Pool.query(`DELETE FROM products where id ='${id}'`);
const searchData = (data) => Pool.query(`SELECT * FROM products WHERE name ILIKE '%${data}%'`);
const sortData = (sortby, sort, page, limit) => Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} OFFSET ${page} LIMIT ${limit} `);
const pagination = (_limit, _offset) => Pool.query(`SELECT * FROM products LIMIT ${_limit} OFFSET ${_offset}`);
const getData = () => Pool.query('SELECT products.name AS product_name, products.price AS harga, category.name AS category_name FROM products JOIN category ON products.category_id = category.id');

module.exports = {
  selectData, insertData, deleteData, updateData, searchData, sortData, pagination, getData,
};
