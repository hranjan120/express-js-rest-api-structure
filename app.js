const express = require('express');

const logger = require('./log/logger');
/*
*-------------------------Include routes----------------------
*/

const userRoutes = require('./src/routes/userRoutes');

/*
*---------------------Middleware section-------------------
*/
const app = express();
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* ------ Uncomment below Middleware to get Log of each request------*/
// app.use((req, res, next) => {
//   logger.log('info', `Requesting ${req.method} ${req.originalUrl}`, { tags: 'http', additionalInfo: { body: req.body, headers: req.headers } });
//   next();
// });
/* ********************************************************************
*-------------------------Use Routes middleware----------------------
********************************************************************* */
app.get('/', async (req, res) => {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || '🤐';
    const env = process.env.NODE_ENV || 'NA';

    res.status(200).json({
      statusText: 'OK', statusValue: 200, message: '👋 Hello by Express Api 😐', payload: { ipAddress, env },
    });
  } catch (err) {
    res.status(500).json({ statusText: 'ERROR', statusValue: 500, messages: 'The Server was unable to complete your request' });
  }
});

/*------------------------------------------*/
app.use('/user', userRoutes);

/*--------------------------------------------*/
app.all('*', async (req, res) => {
  const ip = req.headers['x-forwarded-for'];
  res.status(404).json({
    statusText: 'FAIL', statusValue: 404, message: 'Requested url is not available..', ipAddress: ip,
  });
});

app.use((err, req, res, next) => {
  console.log(typeof next);
  logger.log(
    'error',
    `Requesting ${req.method} ${req.originalUrl}`,
    { tags: 'http', additionalInfo: { body: req.body, headers: req.headers, errorDetail: err.stack } },
  );
  res.status(err.status || 500).json({
    statusText: 'ERROR', statusValue: err.status || 500, message: err.errMsg || 'Unable to Process your request',
  });
});

/*
*----------------------------------------------------------------------------
*/

module.exports = app;
