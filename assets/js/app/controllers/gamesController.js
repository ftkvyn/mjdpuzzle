app.controller('GamesController', ['$http', 
	function($http){
		var me = this;
		me.gameId = null;

		me.initGame = function(id){
			me.gameId = id;
		}

		me.loadCategories = function(){
			me.model = {};
			$http.get('/api/category')
			.success(function(data){
				me.loading = false;
				me.categories = data;
			})
			.error(function(data){
				me.loading = false;
				console.log(data);
			});
		}

		me.reload = function(){
			window.location.reload();
		}

		me.checkSolution = function(){
			if(window.validateGame){
				window.validateGame(me.sendResult);
			}
		}

		me.nextGame = function(){
			$http.get('/api/games/nextGameId/' + me.gameId)
			.success(function(data){
				if(!data || !data.id){
					window.location = '/';	
				}else{
					window.location = '/game/' + data.id;
				}
			})
			.error(function(){
				window.location = '/';
			});
		}

		me.sendResult = function(result){
			if(result){
				me.modalSuccess = true;
				$http.post('/api/games/success/', {id: me.gameId})
				.success(function(data){
					//Do nothing;
				});
			}else{
				me.modalFail = true;
			}
		}
	}]
);