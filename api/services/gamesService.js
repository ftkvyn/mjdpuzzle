var Q = require('q');

exports.getCategoriesWithGames = function(userId, cb){
	var qs = [Category.find()
			.sort('order')
			.populate('games'),
			GameResult.find({user: userId})];
	Q.all(qs)
	.catch(function(data){
		cb(data);
	})
	.done(function(data){
		var categories = data[0];
		var results = data[1];
		var total = 0, earned = 0;
		for (var r = results.length - 1; r >= 0; r--) {
			for (var c = categories.length - 1; c >= 0; c--) {
				categories[c].complete = 0;
				if(categories[c].games){
					for (var g = categories[c].games.length - 1; g >= 0; g--) {
						if(results[r].game == categories[c].games[g].id){
							categories[c].games[g].isComplete = true;
							earned += categories[c].games[g].points;
							categories[c].complete++;
						}
						total += categories[c].games[g].points;
					}
				}
			}
		};
		cb(null, categories, {total: total, earned : earned});
	});
}

exports.getRankings = function(cb){
	GameResult.find()
	.exec(function(err, results){
		results = results || [];
		var rankings = {};
		var topUsers = [];
		var topNum = 10;
		for (var i = results.length - 1; i >= 0; i--) {
			if(!rankings[results[i].user]) {
				rankings[results[i].user] = 0;
			}
			rankings[results[i].user] += results[i].points;
			if(topUsers.indexOf(results[i].user) > -1){
				continue;
			}
			if(topUsers.length < topNum){
				topUsers.push(results[i].user);
				continue;
			}
			var minUser = 0;
			for (var k = topUsers.length - 1; k >= 1; k--) {
				if(rankings[topUsers[k]] < rankings[topUsers[minUser]]){
					minUser = k;
				}
			};
			if(rankings[minUser] < rankings[results[i].user]){
				topUsers[minUser] = results[i].user;
			}
		};
		User.find({id : topUsers})
		.exec(function(err, users){
			var result = [];
			for (var i = users.length - 1; i >= 0; i--) {
				users[i].points = rankings[users[i].id];
			};
			users = users.sort(function(a,b){
				return b.points - a.points;
			})
			return cb(null, users);
		});
	});
}

exports.getTeamResults = function(cb){
	GameResult.find()
	.populate('user')
	.exec(function(err, results){
		try{
			console.log(results);
			var teams = {
				'null': 0,
				'astu' : 0, 
				'blackdragon' : 0, 
				'sorcesec' : 0
			};
			var total = 0;
			for (var i = results.length - 1; i >= 0; i--) {
				teams[results[i].user.team] += results[i].points;
				total += results[i].points
			};
			var best = 'null';
			for(var t in teams){
				teams[t] = Math.round(100 * teams[t] / total);
				if(teams[t] > teams[best]){
					best = t;
				}
			}
			teams.best = best;
			cb(teams);
		}
		catch(ex){
			cb({});	
		}
	});
}