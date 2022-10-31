const Pool = require('../config/db');

const selectData = () => Pool.query('SELECT * FROM products');
console.log('data', selectData())
const insertData = (data) => {
  const {
    name, stock, price, photo
  } = data;
  console.log('data',data)
  return Pool.query(
    `INSERT INTO products(name,stock,price,category_id,photo) VALUES('${name}',${stock},${price},1,'${photo}')`
  );
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
