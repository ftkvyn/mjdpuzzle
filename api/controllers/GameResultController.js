/**
 * GameResultController
 *
 * @description :: Server-side logic for managing Gameresults
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	save: function (req, res) {
		if(!req.session.user){
			return res.error('Not allowed!');
		}
		GameResult.findOne({game: req.body.id, user: req.session.user.id})
		.exec(function(err, oldResult){
			if(oldResult){
				return res.send('Duplicate');
			}
			Game.findOne(req.body.id)
			.exec(function(err, game){
				if(err){
					console.log(err);
					return res.error('Error');		
				}
				GameResult.create({game: game.id, points: game.points, user: req.session.user.id})
				.exec(function(err, result){
					if(err){
						console.log(err);
						return res.error('Error');		
					}
					return res.send('Success');
				});
			});
		});
	}
};

