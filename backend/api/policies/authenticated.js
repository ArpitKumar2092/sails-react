// We use passport to determine if we're authenticated

const passport = require('passport');
module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (error, user, info) {
		console.log('JWT Policy');
		
      if (error) {
		  console.log('Inside Error')
		  return res.serverError(error);
		}

      if (!user) {
		return res.forbidden({
			message: 'Invalid Credential'}, info && info.code, info && info.message); 
	  }
	 
      req.user = user;
      return next();
    })(req, res);
};


function demo(req, res, next) {

	'use strict';

	

	// Sockets
	if(req.isSocket)
	{
		if(req.session &&
		req.session.passport &&
		req.session.passport.user)
		{
			return next();
		}

		res.json(401);
	}
	// HTTP
	else
	{
		if(req.isAuthenticated())
		{
			console.log('Policy Request ')
			return next();
		}
		
                // If you are using a traditional, server-generated UI then uncomment out this code:
                /*
                res.redirect('/login');
                */

                // If you are using a single-page client-side architecture and will login via socket or Ajax, then uncomment out this code:
                
                res.status(401);
                res.end();
                
	}

};
