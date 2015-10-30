angular.module('capsuleApp')
	.controller('loginController', ['$http', '$timeout', function($http, $timeout){
		var loginCtrl = this;

		loginCtrl.processLogin = function(){
			$http({
				method : 'post',
				url    : '/auth/process-login',
				data   : loginCtrl.loginForm
			}).then(function(returnData){
				if (returnData.data.success) {
					window.location.href="/#/view/dash";
				}
				else {
					console.log('login error', returnData.data.error)
					loginCtrl.loginError = true;
					loginCtrl.loginErrorMessage = returnData.data.error;
					$timeout(function(){
						loginCtrl.loginError=false;
					}, 1500);

				};
			}, function(err){
				console.log('loginCtrl.processLogin err error', err);
			});

		};

		loginCtrl.processSignup = function(){
			$http({
				method : 'post',
				url    : '/auth/register-user',
				data   : loginCtrl.signupForm
			}).then(function(returnData){
				if (returnData.data.success) {
					window.location.href="/#/view/dash";
				}
				else {
					console.log(returnData.data.error);
				};
			}, function(err){
				console.log(err);
			});
		};


	}]);