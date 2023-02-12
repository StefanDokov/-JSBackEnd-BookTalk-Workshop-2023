const jwtCallback = require('jsonwebtoken');
const util = require('util');


exports.sign = util.promisify(jwtCallback.sign);
exports.verify = util.promisify(jwtCallback.verify);