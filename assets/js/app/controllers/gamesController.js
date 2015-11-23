app.controller('GamesController', ['$http', '$scope',
	function($http, $scope){
		var me = this;

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
	}]
);