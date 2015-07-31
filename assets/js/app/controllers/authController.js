app.controller('AuthController', ['$http', '$scope',
	function($http, $scope){
		var me = this;
		me.model = {};
		me.message = undefined;

		me.login = function(){
			me.message = undefined;
			$http.post('/auth/email/', me.model)
			.success(function(data){	
				if(!data.success){
					me.message = data.message;
				}else{
					location = '/profile/' + data.userId;			
				}
			})
			.error(function(data){
				console.log(data);
				console.log('Error occured while logging in.');
			});
		}

		me.validate = function(){
			me.message = '';
			if(!me.model.name){
				me.message += 'Name is required.'
			}
			var re = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i
			if(!me.model.email || !re.test(me.model.email)){
				me.message += ' Email is required.'
			}
			if(!me.model.password || me.model.password.length < 6){
				me.message += ' Password should be at least 6 characters long.'
			}			
			if(!me.model.team){
				me.message += ' You should select your team.'	
			}
			if(me.message){
				return false;
			}
		}

		me.register = function(data){
			if(!me.validate()){
				return;
			}
			if(me.registering){
				return;
			}
			me.registering = true;
			me.message = '';
			$http.post('/auth/register', me.model)
			.success(function(data){	
				if(!data.success){
					if(data.badCaptcha){
						me.message = 'Captcha is wrong';
					}else{
						me.message = data.message;
						return;
					}					
				}else{
					me.userId = data.userId;					
					location = '/profile/' + me.userId;
				}
			})
			.error(function(data){
				console.log(data);
				console.log('Error occured while registering.');
				alert(JSON.stringify(data));
			});
		}
	}
]);