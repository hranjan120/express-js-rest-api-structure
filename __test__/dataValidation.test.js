/* eslint-disable no-useless-escape */
const { isMongoId, isNotNumber, escapeRegExp } = require('../src/utils/dataValidation');

/*-------------------*/
test('VALIDATE isMongoId, To check a given string is valid 24 character mongo ID', async () => {
    const mid = '62d92c4be742616d0046dc9e';
    const mid1 = '62d92c4be742616d0046dc9ee';
    expect(isMongoId(mid)).toBeTruthy();
    expect(isMongoId(mid1)).toBeFalsy();
});

/*-------------------*/
test('VALIDATE isNotNumber, To check a given value is valid Number or not', async () => {
    const num = 34;
    expect(isNotNumber(num)).toBeFalsy();
});

/*-------------------*/
test('VALIDATE escapeRegExp, To escape special character from given string for mongoDB', async () => {
    const txt = '.dfv$ccdc';
    const escapedTxt = escapeRegExp(txt);
    expect(escapedTxt).toMatch('\\.dfv\\$ccdc');
});
