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
			c.games = c.games || [];
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
			me.model.order = me.categories.length;
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
			var query;
			if(cat.gameModel.id){
				query = $http.put('/api/game/' + cat.gameModel.id, cat.gameModel)
			}else{
				cat.gameModel.order =  cat.games.length;
				query = $http.post('/api/game', cat.gameModel);
			}
			query
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

		me.editGame = function(cat, game){
			cat.gameModel = game;
		}

		me.cancelEditGame = function(cat, game){
			cat.gameModel = {
				points: 5,
				difficulty: 'Easy',
				category: cat.id,
				author: me.user.id
			};
		}

		me.deleteGame = function(game, index){
			if(!confirm('Are you sure you want to delete the game and all its results?')){
				return;
			}
			$http.delete('/api/game/' + game.id)
			.success(function(data){
				//ToDo: reorder after delete.
				me.loadCategories();
			})
			.error(function(data){
				me.loading = false;
				console.log(data);
				alert('Error adding game.');
			});		
		}

		me.move = function(arr, index, isCategory, isUp, event){
			var mapModel = function(item){
				var model = {};
				for(var key in item){
					if(item.hasOwnProperty(key)){
						if( (key != 'games') && (key != 'id')){
							model[key] = item[key];
						}
					}
				}
				return model;
			}
			if(me.loading){
				return;
			}
			me.loading = true;
			event.stopPropagation();
			var entity, otherIndex;
			if(isCategory){
				entity = 'category';
			}else{
				entity = 'game';
			}

			if(isUp){
				otherIndex = index - 1;
			}else{
				otherIndex = index + 1;
			}

			var tmp = arr[index].order || 0;
			arr[index].order = arr[otherIndex].order;
			arr[otherIndex].order = tmp;
			$http.put('/api/' + entity + '/' + arr[index].id, mapModel(arr[index]))
			.success(function(){
				$http.put('/api/' + entity + '/' + arr[otherIndex].id, mapModel(arr[otherIndex]))
				.success(function(){
					me.loading = false;
				})
				.error(function(data){
					console.log(data);
					alert('Error');
				});	
			})
			.error(function(data){
				console.log(data);
				alert('Error');
			});
		}
	}]
);