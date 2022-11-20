const Pool = require('../config/db');

const updateData = (id, data) => {
  const { name, stock, price, photo } = data;
  return Pool.query(
    `UPDATE products SET name='${name}',stock='${stock}',price='${price}',photo='${photo}' WHERE id='${id}'`
  );
};
const deleteData = (id) => Pool.query(`DELETE FROM products where id ='${id}'`);

const selectData = ({ limit, offset, sort, sortby, search }) =>
  Pool.query(
    `SELECT products.id,products.name,products.stock,  products.price, category.name as category, products.photo FROM products  JOIN category ON products.category_id = category.id WHERE (products.name) ILIKE ('%${search}%') 
  ORDER BY products.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset} `
  );
// console.log('data', selectData());

const insertData = (data) => {
  const { name, stock, price, photo } = data;
  console.log('data', data);
  return Pool.query(
    `INSERT INTO products( name,stock,price,category_id,photo) VALUES('${name}',${stock},${price},1,'${photo}')`
  );
};

// const searchData = (data) =>
//   Pool.query(`SELECT * FROM products WHERE name ILIKE '%${data}%'`);
// const sortData = (sortby, sort, page, limit) =>
//   Pool.query(
//     `SELECT * FROM products ORDER BY ${sortby} ${sort} OFFSET ${page} LIMIT ${limit} `
//   );
// const pagination = (limit, offset) =>
//   Pool.query(`SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`);
const getData = (id) =>
  Pool.query(
    `SELECT products.name AS product_name, products.price AS harga, category.name AS category_name FROM products JOIN category ON products.category_id = category.id where products.id= '${id}'`
  );

module.exports = {
  selectData,
  insertData,
  deleteData,
  updateData,
  getData,
};
