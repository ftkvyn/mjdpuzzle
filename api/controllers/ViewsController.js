/**
 * ViewsController
 *
 * @description :: Server-side logic for managing Views
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var ejs = require('ejs');
var fs = require('fs');

module.exports = {
	home: function(req,res){
		return res.view('home');
	},

	register: function(req,res){
		req.session.message = null;
		if(req.session.fbMessage){
			req.session.message = req.session.fbMessage;
			req.session.fbMessage = null;
		}		
		if(!req.session.message){
			req.session.message = '';
		}
		req.session.captcha = null;
		req.session.team = null;
		var code = registerCodes.getCode();
		req.session.correctCaptcha = code.code;
		code.code = null;
		res.view('register', {
			locals:{message: req.session.message, code: code}
		});		
	},

	profile: function(req, res){
		var userId = req.params.id;
		if(!userId && !req.session.user){
			return	res.redirect('/register');
		}
		if(!userId){
			userId = req.session.user.id;
		}
		User.findOne(userId).exec(function(err, user){
			if(err || !user){
				console.log(err);
				return res.redirect('/notFound');
			}
			gamesService.getCategoriesWithGames(userId, function(err, categories){
				if(err){
					console.log(err);
				}
				res.view('profile', {
					locals:{
						user: user, 
						message: req.session.message,
						categories: categories
					}
				});	
			});
		});		
	},

	editProfile: function(req, res){
		var userId = req.params.id;
		if(!userId && !req.session.user){
			return	res.redirect('/register');
		}
		if(!userId){
			userId = req.session.user.id;
		}
		User.findOne(userId).exec(function(err, user){
			if(err || !user){
				console.log(err);
				return res.redirect('/notFound');
			}
			res.view('editProfile', {
				locals:{user: user, message: req.session.message}
			});	
		})
	},

	admin: function(req,res){
		res.locals.layout = 'adminLayout.ejs';
		res.view('admin/main');		
	},

	recoverPassword: function(req,res){
		res.view('recoverPassword');		
	},

	rankings: function(req,res){
		gamesService.getRankings(function(err, users){
			res.view('rankings', {
				locals:{users: users}
			});		
		});		
	},

	points: function(req,res){
		gamesService.getCategoriesWithGames(req.session.user.id, function(err, categories, data){
			if(err){
				console.log(err);
			}
			res.view('points', {
				locals:{data: data, categories: categories}
			});		
		});
	},

	challenges: function(req,res){
		var friendlyId = req.params.friendlyId;
		Category.findOne({friendlyId : friendlyId})
		.sort('order')
		.populate('games')
		.exec(function(err, category){
			res.view('challenges', {
				locals:{challenge: category}
			});		
		});		
	},

	about: function(req,res){
		res.view('about');		
	},

	books: function(req,res){
		res.view('books');		
	},

	game: function(req,res){
		if(!req.session.user){
			return res.redirect('/register');
		}
		var id = req.params.id;
		Game.findOne(id)
		.populate('category')
		.populate('author')
		.exec(function(err, game){
			var data = {currentUser : req.session.user, teams: res.locals.teams, game : game};
			fs.readFile(sails.config.appPath + '/views/layout.ejs', 'utf8', function (err, layout) {
				var index = layout.indexOf('<%- body %>');				
				var header = layout.substring(0, index);
				var footer = layout.substring(index).replace('<%- body %>', '');
				var fileName = sails.config.appPath + '/views/game.ejs';
				fs.readFile(fileName, 'utf8', function (err, template) {
					template = header + template + footer;
					var html = ejs.render(template, data, {
						filename: fileName
					});	
					res.send(html);
				});
			});
		});
		
	},
};

