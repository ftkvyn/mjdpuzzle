/**
 * ViewsController
 *
 * @description :: Server-side logic for managing Views
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	home: function(req,res){
		return res.view('home', {
			locals:{currentUser : req.session.user}
		});
	},

	register: function(req,res){
		res.locals.message = null;
		req.session.message = null;
		if(!req.session.message){
			req.session.message = '';
		}
		req.session.correctCaptcha = 'friend';
		req.session.captcha = null;
		req.session.team = null;
		res.view('register', {
			locals:{currentUser : req.session.user, message: req.session.message}
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
			res.view('profile', {
				locals:{currentUser : req.session.user, user: user, message: req.session.message}
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
				locals:{currentUser : req.session.user, user: user, message: req.session.message}
			});	
		})
	},

	admin: function(req,res){
		res.locals.layout = 'adminLayout.ejs';
		res.view('admin/main',{
			locals:{currentUser : req.session.user}
		});		
	},

	recoverPassword: function(req,res){
		res.view('recoverPassword', {
			locals:{currentUser : req.session.user}
		});		
	},

	rankings: function(req,res){
		res.view('rankings', {
			locals:{currentUser : req.session.user}
		});		
	},

	points: function(req,res){
		res.view('points', {
			locals:{currentUser : req.session.user}
		});		
	},

	challenges: function(req,res){
		var friendlyId = req.params.friendlyId;
		Category.findOne({friendlyId : friendlyId})
		.populate('games')
		.exec(function(err, category){
			res.view('challenges', {
				locals:{currentUser : req.session.user, challenge: category}
			});		
		});		
	},

	about: function(req,res){
		res.view('about', {
			locals:{currentUser : req.session.user}
		});		
	},

	books: function(req,res){
		res.view('books', {
			locals:{currentUser : req.session.user}
		});		
	},

	game: function(req,res){
		var id = req.params.id;
		Game.findOne(id)
		.populate('category')
		.populate('author')
		.exec(function(err, game){
			res.view('game', {
				locals:{currentUser : req.session.user, game : game}
			});		
		});
		
	},
};

