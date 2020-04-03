/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = {
    login : (req, res, next)=> {
      passport.authenticate('local', function(error, user, info) {
          if (error){ 
              console.log(error)
              return res.json(401, error)
            };
          if (!user) return res.json(401, { message: 'Invalid Credentails' });
  
          
          req.logIn(user, function(err) {
              if (err){
                res.send(err)
              };

              const token = jwt.sign(user.toJSON() , sails.config.JWT_CONFIG.secret, {
                expiresIn: 604800 // 1 week
              });
              return res.send({
                  message: "success",
                  token : 'JWT ' + token,
                  userID :user.id,
              });
          });
      })(req, res, next);
    },
    logout : (req , res ) => {
        req.logout();
        res.send('logout successful');
    },
    resetPassword:(req , res)=>{

    }
};

