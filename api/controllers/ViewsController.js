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
		if(!res.locals.message){
			res.locals.message = '';
		}
		req.session.correctCaptcha = 'Mellon';
		res.view('register', {
			locals:{currentUser : req.session.user}
		});		
	},
};

