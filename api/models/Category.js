/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
	    type: 'string',
	    unique: true,
	    required: true
	},

	friendlyId:{
	    type: 'string',
	    unique: true,
	},

	order: {
		type: 'integer'
	},

	defaultImgUrl:{
		type: 'string'
	},

	games:{
		collection: 'Game',
		via: 'category'
	}
  },

  beforeCreate: function (values, cb) {    	
	friendlyIdService.findFriendlyId(Category, values.name,
		function(friendlyId){
			values.friendlyId = friendlyId;
			cb();
		});
  },
};

