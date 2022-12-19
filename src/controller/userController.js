const Joi = require('joi');

const { isMongoId, isNotNumber, escapeRegExp } = require('../utils/dataValidation');
const { successResponse, badResponse } = require('../utils/makeResponse');

const { createNewUser, updateUser, fetchAllUser } = require('../services/userServices');

/*
*-----------------------------Routes Section------------------------
*/
exports.manageUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userName: Joi.string().max(300).required().label('User Name'),
      userEmail: Joi.string().email().max(300).label('User Email'),
      userAddress: Joi.string().required().allow('').label('Address'),
      userStatus: Joi.string().required().valid('ACTIVE', 'INACTIVE').label('User Status'),
      actionType: Joi.string().required().valid('UPDATE', 'ADD_NEW').label('Action Type'),
      userId: Joi.string().required().label('User Id'),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json(badResponse(result.error.details[0].message));
    }

    if (req.body.actionType === 'ADD_NEW') {
      const newData = {
        userName: req.body.userName,
        userEmail: req.body.userEmail.toLowerCase(),
        userAddress: req.body.userAddress,
        userStatus: req.body.userStatus,
      };
      const userRes = await createNewUser(newData);
      return res.status(200).json(successResponse('New User added Successfully', userRes));
    }

    if (!isMongoId(req.body.userId)) {
      return res.status(400).json(badResponse('Provide valid User Id'));
    }

    const updData = {
      userName: req.body.userName,
      userEmail: req.body.userEmail.toLowerCase(),
      userAddress: req.body.userAddress,
      userStatus: req.body.userStatus,
    };
    const updateRes = await updateUser(updData, req.body.userId);
    return res.status(200).json(successResponse('User data updated Successfully', updateRes));
  } catch (err) {
    return next(err);
  }
};

/*---------------------*/
exports.getAllUser = async (req, res, next) => {
  try {
    const {
      pgno, row, text, type, sortBy,
    } = req.query;
    if (isNotNumber(pgno) || isNotNumber(row)) {
      return res.status(400).json(badResponse('Provide valid Page and Limit'));
    }

    const limit = Math.abs(row) || 10;
    const page = (Math.abs(pgno) || 1) - 1;
    const filterText = escapeRegExp(text);

    const userRes = await fetchAllUser(limit, page, filterText, type, sortBy);

    return res.status(200).json({
      statusText: 'OK',
      statusValue: 200,
      message: 'All Users.',
      payload: {
        userData: userRes.userData, total: userRes.totalCount,
      },
    });
  } catch (err) {
    return next(err);
  }
};
