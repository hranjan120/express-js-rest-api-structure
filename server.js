require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const mongoose = require('mongoose');

const logger = require('./log/logger');

const app = require('./app');

/* ******************************************************************
*---------------------------mongodb connection----------------------
******************************************************************* */
(async () => {
  try {
    mongoose.set('strictQuery', true);
    const db = `${process.env.DB_CONN_URL}`;
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Database');
  } catch (err) {
    console.log(err);
  }
})();

/*
*---------------------------------------------------------------------
*/
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`App is on: ${app.get('env')} Mode`);
});

process.on('uncaughtException', (error, origin) => {
  logger.log(
    'error',
    'Global uncaughtException',
    { tags: 'uncaughtException', additionalInfo: { body: '', errorDetail: error.stack } },
  );
  console.log('----- Uncaught exception -----');
  console.log(error);
  console.log(origin);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.log(
    'error',
    'Global unhandledRejection',
    { tags: 'unhandledRejection', additionalInfo: { body: '', errorDetail: reason.stack } },
  );
  console.log('----- Unhandled Rejection at -----');
  console.log(promise);
  console.log(reason.stack);
});
