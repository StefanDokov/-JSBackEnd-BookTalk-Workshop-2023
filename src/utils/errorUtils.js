
const mongoose = require('mongoose');

exports.getFirstMongooseError = (error) => {
   const errors = Object.keys(error.errors).map(key => error.errors[key].message);
  return errors[0];
}

exports.getErrorMessage = (error) => {
    
    switch (error.name) {
        case 'Error':
            return error.message;
            case 'ValidationError':
                return this.getFirstMongooseError(error);
                default: 
                return error.message;
    }


}