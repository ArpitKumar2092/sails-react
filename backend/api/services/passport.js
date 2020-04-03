
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;



const JWT_OPTION = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: sails.config.JWT_CONFIG.secret,
    issuer: '',
    audience: '',
}


async function findById(id, fn) {
    const usr = await User.findOne(id);
    if (usr) {
        return fn(null, usr);
    }
}


passport.serializeUser(function (user, done) {
    console.log('serialize');
    //In serialize user you decide what to store in the session. Here I'm storing the user id only.
    done(null, user.id);
   
});

passport.deserializeUser(function (id, done) {
    console.log('deserializeUser');
    //Here you retrieve all the info of the user from the
    //session storage using the user id stored in the session earlier using serialize user.
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new JwtStrategy(JWT_OPTION, function(jwt_payload, done) {
    return done(null, jwt_payload);
}));

passport.use(new LocalStrategy({ // or whatever you want to use
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password',
    session:false,
    passReqToCallback: false,
  }, function (username, password, done) {
            User.findOne({email:username}).exec((err , result)=>{
                if(err){
                    return done(err , null)
                }
                if(!result){
                    return done(null , null ,{
                        message : "Invalid Email",
                    })
                }
                bcrypt.compare(password, result.password, function (err, res) {
                    if(err || !res){
                        return done(null, false, {
                            message: 'Invalid Password'
                        });
                    }else{
                        console.log('return');
                        return done(null, result, {
                            message: 'Logged In Successfully'
                        });
                    }
                })

            });
    }
));