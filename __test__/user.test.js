const mongoose = require('mongoose');

const supertest = require('supertest');
const app = require('../app');
const UserModal = require('../src/model/UserModal');

beforeEach((done) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(
    global.__MONGO_URI__,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done(),
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

/*-------------------*/
test('USER SCHEMA TEST Create new Object of User Schema and Result must have Mongo ID', async () => {
  const userDt = await UserModal.create({
    userName: 'Test user',
    userEmail: 'testuser@email.com',
    userAddress: '',
    userStatus: 'INACTIVE',
  });
  expect(mongoose.Types.ObjectId.isValid(userDt._id)).toBeTruthy();
});

/*-------------------*/
test('ADD AND UPDATE NEW USER /user/v1/manage-user', async () => {
  const userDt = {
    userName: 'Test user One',
    userEmail: 'testuserone@email.com',
    userAddress: '',
    userStatus: 'ACTIVE',
    userId: 'NA',
    actionType: 'ADD_NEW',
  };

  /* ---------Add new User----------*/
  await supertest(app).post('/user/v1/manage-user')
    .send(userDt)
    .expect(200)
    .then(async (response) => {
      expect(response.body.statusText).toBe('OK');

      const updateData = response.body.payload;
      updateData.userId = updateData._id;
      updateData.actionType = 'UPDATE';
      delete updateData._id;
      delete updateData.__v;
      delete updateData.createdAt;
      delete updateData.updatedAt;

      /* ---------Update Added User----------*/
      await supertest(app).post('/user/v1/manage-user')
        .send(updateData)
        .expect(200)
        .then(async (response1) => {
          expect(response1.body.statusText).toBe('OK');
          expect(response1.body.payload._id).toBe(updateData.userId);
        });

      /* ---------Get added User----------*/
      await supertest(app).get('/user/v1/get-all-user?pgno=1&row=25')
        .expect(200)
        .then((response2) => {
          expect(response2.body.statusText).toBe('OK');
          expect(response2.body.payload.userData.length).toBeGreaterThan(0);
        });
    });
});
