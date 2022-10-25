const Pool = require('../config/db');

const selectData = () => {
    return Pool.query('SELECT * FROM transactions');
}

const insertData = (data) => {
    const {id, email, products_id, amount, total, status} = data;
    return Pool.query(`INSERT INTO transactions(id,email,products_id,amount,total,status) VALUES(${id},'${email}',${products_id},${amount},${total},${status})`);
}

const updateData = (id, data) => {
    const { email, amount, total, status } = data
    return Pool.query(`UPDATE transactions SET email='${email}',amount=${amount},total=${total}, status=${status} WHERE id=${id}`);
}

const deleteData = (id) => {
    return Pool.query(`DELETE FROM transactions where id='${id}'`);
}


module.exports = {selectData, insertData, deleteData, updateData}