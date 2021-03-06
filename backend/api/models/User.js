/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    name:{
      type:"string"
    },
    password :{
      type:"string"
    },
    username:{
      type:"string"
    },
    email:{
      type:"string"
    },
    friends:{
      type:'array',
      defaultTo:1,
    },
    toJSON: function () {
      const obj = this.toObject();
      delete obj.password;
      return obj;
    },
  },
  beforeCreate: function (user, cb) {
    if (user.password) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
            cb(err);
          } else {
            user.password = hash;
            cb();
          }
        });
      });
    }else{
      cb();
    }
  }, 
  beforeUpdate: this.beforeCreate,
};

