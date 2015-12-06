module.exports = function(req, res, next) {
  var teams = gamesService.getTeamResults(function(teams){
  	  res.locals.teams = teams;
  	  res.locals.currentUser = req.session.user;
  	  next();
  });
};