const successResponse = (msg, dt = {}) => ({
  statusText: 'OK', statusValue: 200, message: msg, payload: dt,
});

const badResponse = (msg) => ({ statusText: 'FAIL', statusValue: 400, message: msg });

const unauthorizedResponse = (msg) => ({ statusText: 'FAIL', statusValue: 401, message: msg });

const forbiddenResponse = (msg) => ({ statusText: 'FAIL', statusValue: 403, message: msg });

/*
*----------------------------
*/
module.exports = {
  successResponse,
  badResponse,
  unauthorizedResponse,
  forbiddenResponse,
};
