/**
 * ViewsController
 *
 * @description :: Server-side logic for managing Views
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	home: function(req,res){
		res.view('home', {
			locals:{currentUser : req.session.user}
		});		
	},

	register: function(req,res){
		res.locals.message = null;
		req.session.message = null;
		if(!req.session.message){
			req.session.message = '';
		}
		req.session.correctCaptcha = 'mellon';
		req.session.captcha = null;
		req.session.team = null;
		res.view('register', {
			locals:{currentUser : req.session.user, message: req.session.message}
		});		
	},

	profile: function(req, res){
		res.redirect('/');
	}
};

