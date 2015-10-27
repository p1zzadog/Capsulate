angular.module('capsuleApp')
	.controller('dashController', ['$http', function($http){

		// not really secure but all they can get is the view which is public anyway
		$http({
			method : 'get',
			url    : '/auth/check',
		}).then(function(returnData){
			if (returnData.data.error) {
				console.log('ngDash /auth/check redirect');
				window.location.href='#/auth/login';
			};
		})

		var dashCtrl = this;

		$http({
			method : 'get',
			url    : '/api/me',
		}).then(function(returnData){
			if (returnData.data.user) {
				console.log(returnData.data.user);
				dashCtrl.user = returnData.data.user;
			}
			else {
				console.log('ngDash /api/me error route', returnData.data);
				window.location.href='#/auth/login';
			};
		})

	}]);