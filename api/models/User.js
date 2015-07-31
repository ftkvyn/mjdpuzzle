/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	email: {
	    type: 'email',
	    unique: true
	},
	password: {
	    type: 'string'	    
	},
	name: {
	    type: 'string',
	},
	team:{
		type: 'string',
		enum: ['astu', 'blackdragon', 'sorcesec']	
	}
	profilePicSmall: {
		type: 'string'
	},
	profilePicLarge: {
		type: 'string'
	},
	recoveryKey: {
		type: 'string'
	},	

	isAdmin:{
		type:'boolean'
	},

	fb_token: {
	    type: 'string',
	},
	fb_id: {
	    type: 'string',
      	unique: true
	},

	toJSON: function() {
      var obj = this.toObject();
      delete obj.fb_token;
      delete obj.fb_id;
      delete obj.vk_token;
      delete obj.vk_id;
      delete obj.password;
      delete obj.email;
      return obj;
    },
  }
};

