/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
	    type: 'string',
	    required: true
	},

	category: {
		model: 'Category',
		required: true
	},

	imgUrl:{
		type: 'string'
	},

	order: {
		type: 'integer'
	},

	author:{
		model: 'User',
		required: true
	},

	difficulty:{
		type: 'string',
		enum: ['Easy', 'Medium', 'Difficult', 'Hard']
	},

	points:{
		type: 'integer'
	},

	viewPage: {
		type: 'string',
	},
  },

  afterDestroy: function (values, cb) {
  	var ids = values.map(function(v){return v.id});
  	GameResult.destroy({game: ids})
  	.exec(function(){
  		cb();
  	});
  }
};

