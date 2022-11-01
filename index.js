const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { common } = require('./src/middleware/common');

const router = require('./src/routes/index');

const app = express();

app.use(xss());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', router);
app.use('/img', express.static('/upload'));

app.all('*', (req, res, next) => {
  common(res, 404, false, null, '404 Not Found');
});
// console.log('env', process.env)
// console.log('data', getProduct);

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
