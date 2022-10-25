CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    category VARCHAR,
    category_id INT REFERENCES category(id)
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    products_id INT REFERENCES products(id),
    amount INT NOT NULL,
    total INT NOT NULL,
    status INT REFERENCES payment_status(id)
);

CREATE TABLE payment_status(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);


INSERT INTO category(id,name) VALUES(1,'Baju'),(2,'Sepatu');

INSERT INTO products(id,name,stock,price,category_id) VALUES(1,'T-shirt',24,120000,1);
INSERT INTO products(id,name,stock,price,category_id) VALUES(2,'Jas Formal',20,500000,1);
INSERT INTO products(id,name,stock,price,category_id) VALUES(3,'Sport shoes',24,300000,2);
INSERT INTO products(id,name,stock,price,category_id) VALUES(4,'Polo shirt',24,120000,1);
INSERT INTO products(id,name,stock,price,category_id) VALUES(5,'Sepatu pancus',24,120000,2);



INSERT INTO payment_status(id,name) VALUES(1,'unpaid');
INSERT INTO payment_status(id,name) VALUES(2,'paid');

INSERT INTO transactions(id,email,products_id,amount,total,status) VALUES(1,'easy@pijar.id',1,2,240000,2);


SELECT products.name,products.stock,products.price,category.name as category
FROM products
INNER JOIN category
ON products.category_id = category.id;

SELECT transactions.email, products.name 
as products_name, transactions.amount, products.price, transactions.total, payment_status.name 
as status FROM transactions 
JOIN products ON transactions.products_id = products.id 
JOIN payment_status ON transactions.status = payment_status.id;

UPDATE transactions SET status=2 WHERE id=1;

ALTER TABLE transactions ADD username VARCHAR(255) AFTER id;