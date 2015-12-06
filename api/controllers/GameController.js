/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	nextGame: function(req, res) {
		var id = req.params.id;
		Game.findOne(id)
		.populate('category')
		.exec(function(err, game){
			if(err || !game){
				console.log(err);
				return res.send('Not found');
			}
			var num = + game.order || 0;
			Game.findOne({order : num + 1, category: game.category.id})
			.exec(function(err, nextGame){
				if(err || !nextGame){
					var num = + game.category.order || 0;
					Category.findOne({order : num + 1})
					.populate('games')
					.exec(function(err, nextCategory){
						if(err || !nextCategory || !nextCategory.games){
							return res.send('Not found');				
						}else{
							return res.send({id: nextCategory.games[0].id});		
						}
					});
				}else{
					return res.send({id: nextGame.id});
				}
			});

		});
	}
};

