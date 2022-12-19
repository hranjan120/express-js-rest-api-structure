const isEmpty = (value) => (typeof value === 'string' && !value.trim()) || typeof value === 'undefined' || value === null;

const isNotNumber = (n) => {
    if (!n) return true;
    return Number.isNaN(Number(n));
};

const isMongoId = (mId) => {
    if (!mId) { return false; }
    if (mId.match(/^[0-9a-fA-F]{24}$/)) { return true; } return false;
};

const escapeRegExp = (str) => {
    if (str) {
        return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
    }
    return str;
};

/*
*----------------------------
*/
module.exports = {
    isEmpty,
    isNotNumber,
    isMongoId,
    escapeRegExp,
};
