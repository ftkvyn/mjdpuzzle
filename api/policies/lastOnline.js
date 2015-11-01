module.exports = function(req, res, next) {

  // console.log(req.session.user);
  if (req.session.user) {
    User.update(req.session.user.id, {lastVisit: new Date()})
    .exec(function(err, user){
    	// console.log(user);
  		return next();  	
    });
  }
  else{
  	return next();
  }
};
