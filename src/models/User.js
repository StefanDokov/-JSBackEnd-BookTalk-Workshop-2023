const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        minLength: 4,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        minLength: 10,
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minLength: 3,
    },
    wish: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book',
    }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;
