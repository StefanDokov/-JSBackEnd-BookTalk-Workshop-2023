const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config');

exports.findByUsername = (username) => User.findOne({username});
exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, email, password, rePassword) => {

    if (password !== rePassword) {
        throw new Error(`Password missmatch!`);
    }
   
   const existingUser = await User.findOne({email});


   if (existingUser) {
    throw new Error('User already exists!');
   }


   const hashPassword = await bcrypt.hash(password, 10);

   await User.create({ username, email, password: hashPassword});

   return this.login(email, password);
}

exports.login = async(email, password) => {

   const user = await this.findByEmail(email);

   if (!user) {
    throw new Error('Invalid email or password!');
   }

   const isValid = await bcrypt.compare(password,user.password);

   if (!isValid) {
    throw new Error('Invalid email or password!');
   }
   
   const payload = {_id: user._id, email, username: user.username}
   const token = await jwt.sign(payload, config.SECRET)


  return token;

}