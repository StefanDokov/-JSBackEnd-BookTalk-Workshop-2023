const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    minLength: 2
  },
  author: {
    type: String,
    required: [true, 'Author is required!'],
    minLength: 5,

  },
  genre: {
    type: String,
    required: [true, 'Genre is required!'],
    minLength: 3
  },
  stars: {
    type: Number,
    required: [true, 'Stars are required!(1-5)'],
    min: 1,
    max: 5

  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required!'],
    validate: {
        validator: function(value) {
          return value.startsWith('http://') || value.startsWith('https://');
        },
        message: 'URL is invalid!'
      }
  },
  review: {
    type: String,
    required: [true, 'Review is reqiured!'],
    minLength: 10
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  wishingList: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]


});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;