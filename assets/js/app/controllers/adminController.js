app.controller('AdminController', ['$http', '$scope',
	function($http, $scope){
		var me = this;

		me.user = null;
		me.categories = [];
		me.model = {};
		me.loading = true;
		me.defaultPoints = {
			'Easy': 5,
			'Medium': 10,
			'Difficult': 15,
			'Hard': 20
		};

		me.mapCategory = function(c){
			c.isExpanded = false;
			c.gameModel = {
				points: 5,
				difficulty: 'Easy',
				category: c.id,
				author: me.user.id
			};
			return c;
		}

		me.loadCategories = function(){
			me.model = {};
			$http.get('/api/category')
			.success(function(data){
				me.loading = false;
				me.categories = data.map(me.mapCategory);
			})
			.error(function(data){
				me.loading = false;
				console.log(data);
				alert('Error loading categories.');
			});
		}

		me.toggleCategory = function(cat){
			cat.isExpanded = !cat.isExpanded;
		}

		me.difficultyChanged = function(cat){
			cat.gameModel.points = me.defaultPoints[cat.gameModel.difficulty];
		}

		me.addCategory = function(){
			if(!me.model.name){
				return;
			}
			if(me.loading){
				return;
			}
			me.loading = true;
			$http.post('/api/category', me.model)
			.success(function(data){
				me.loadCategories();
			})
			.error(function(data){
				me.loading = false;
				console.log(data);
				alert('Error adding category.');
			});	
		}

		me.addGame = function(cat, index){
			if(!cat.gameModel.name){
				return;
			}
			if(me.loading){
				return;
			}
			me.loading = true;
			$http.post('/api/game', cat.gameModel)
			.success(function(data){
				$http.get('/api/category/' + cat.id)
				.success(function(data){
					me.categories[index] = me.mapCategory(data);
					me.categories[index].isExpanded = true;
					me.loading = false;
				});
			})
			.error(function(data){
				me.loading = false;
				console.log(data);
				alert('Error adding game.');
			});	
		}

		me.deleteGame = function(game, index){
			$http.delete('/api/game/' + game.id)
			.success(function(data){
				me.loadCategories();
			})
			.error(function(data){
				me.loading = false;
				console.log(data);
				alert('Error adding game.');
			});		
		}
	}]
);