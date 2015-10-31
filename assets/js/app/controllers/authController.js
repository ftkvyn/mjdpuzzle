app.controller('AuthController', ['$http', '$scope',
	function($http, $scope){
		var me = this;
		me.model = {};
		me.message = null;

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

		me.validate = function(showMessage){
			me.model.message = '';
			var message = '';
			if(!me.model.name){
				message += 'Name is required.'
			}
			var re = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i
			if(!me.model.email || !re.test(me.model.email)){
				message += ' Email is required.'
			}
			if(!me.model.password || me.model.password.length < 6){
				message += ' Password should be at least 6 characters long.'
			}
			if(me.model.password != me.model.passwordConfirm){
				message += ' Password should mach confirmation.'
			}			
			if(!me.model.team){
				message += ' You should select your team.'	
			}
			if(!me.model.captcha){
				message += 'Code is required.'
			}
			if(showMessage){
				me.model.message = message;
			}
			if(message){
				return false;
			}
			return true;
		}

		me.validateFb = function(showMessage){
			me.model.message = '';
			var message = '';
			if(!me.model.team){
				message += ' You should select your team.'	
			}
			if(!me.model.captcha){
				message += 'Code is required.'
			}
			if(showMessage){
				message = message;
			}
			if(message){
				return false;
			}
			return true;
		}

		me.validateProfile = function(){
			me.model.message = '';
			var message = '';
			if(!me.model.name){
				message += 'Name is required.'
			}
			if(me.model.originalEmail){
				var re = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i
				if(!me.model.email || !re.test(me.model.email)){
					message += ' Email is required.'
				}
			}
			if(me.model.newPassword){
				if(!me.model.newPassword || me.model.newPassword.length < 6){
					message += ' Password should be at least 6 characters long.'
				}
				if(me.model.newPassword != me.model.newPasswordConfirm){
					message += ' Password should mach confirmation.'
				}			
			}
			me.model.message = message;
			if(message){
				return false;
			}
			return true;
		}

		me.register = function(data){
			if(!me.validate(true)){
				return;
			}
			if(me.registering){
				return;
			}
			me.registering = true;
			me.model.message = '';
			$http.post('/auth/register', me.model)
			.success(function(data){	
				me.registering = false;
				if(!data.success){
					if(data.badCaptcha){
						me.model.message = 'Captcha is wrong';
					}else{
						me.model.message = data.message;
						return;
					}					
				}else{
					me.userId = data.userId;					
					location = '/profile/' + me.userId;
				}
			})
			.error(function(data){
				me.registering = false;
				console.log(data);
				console.log('Error occured while registering.');
				alert(JSON.stringify(data));
			});
		}

		me.saveProfile = function(){
			if(!me.validateProfile(true)){
				return;
			}
			if(me.registering){
				return;
			}
			me.registering = true;
			$http.post('/auth/update', me.model)
			.success(function(data){	
				me.registering = false;
				if(!data.success){
					me.model.message = data.message;
					return;
				}else{
					location = '/profile/';
				}
			})
			.error(function(data){
				me.registering = false;
				console.log(data);
				console.log('Error occured while updating profile.');
				alert(JSON.stringify(data));
			});
		}
	}
]);