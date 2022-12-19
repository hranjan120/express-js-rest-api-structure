const UserModal = require('../model/UserModal');

/*
*---------------User Setion----------------
*/
exports.createNewUser = async (userDt) => {
  const newUserDt = new UserModal(userDt);
  const addedUser = await newUserDt.save();
  return addedUser;
};

/*------------------------*/
exports.updateUser = async (userDt, bdId) => {
  const updatedUser = await UserModal.findOneAndUpdate({ _id: bdId }, { $set: userDt }, { new: true });
  return updatedUser;
};

/*----------*/
exports.fetchAllUser = async (limit, page, text, type, sortBys) => {
  let sortBy = { createdAt: 'desc' };
  const dbQuery = {};
  let filter = '';
  if (type === 'active') {
    dbQuery.userStatus = 'Active';
  }
  if (type === 'inactive') {
    dbQuery.userStatus = 'Inactive';
  }
  if (sortBys === 'name') {
    sortBy = { userName: 'asc' };
  }
  if (text) {
    if (text === 'inactive') {
      dbQuery.userStatus = 'Inactive';
    } else if (text === 'active') {
      dbQuery.userStatus = 'Active';
    } else {
      filter = text;
    }
  }
  const userData = await UserModal.find(dbQuery).or([
    { userName: { $regex: `.*${filter}.*`, $options: 'i' } },
    { userStatus: { $regex: `.*${filter}.*`, $options: 'i' } }])
    .limit(limit)
    .skip(limit * page)
    .sort(sortBy)
    .select({
      userName: 1, userEmail: 1, userAddress: 1, userStatus: 1,
    });

  const totalCount = await UserModal.countDocuments();
  return { userData, totalCount };
};
