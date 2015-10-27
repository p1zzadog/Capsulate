angular.module('capsuleApp')
	.controller('loginController', ['$http', function($http){
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
					console.log('loginCtrl.processLogin returnData error', returnData.data.error);
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