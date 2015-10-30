// instatiate
angular.module('capsuleApp', ['ui.router', 'ngMaterial', 'ngMessages'])

// configure
angular.module('capsuleApp')
	.config(['$stateProvider', '$mdThemingProvider',
		function($stateProvider, $mdThemingProvider){
			$stateProvider
				.state('home', {
					url         : '',
					templateUrl : '/html/views/home/home.html',
					controller  : 'homeController as homeCtrl'
				})
				.state('login', {
					url         : '/auth/login',
					templateUrl : 'html/views/login/login.html',
					controller  : 'loginController as loginCtrl',
				})
				.state('dash', {
					url         : '/view/dash',
					templateUrl : 'html/views/dash/dash.html',
					controller  : 'dashController as dashCtrl',
				})

			$mdThemingProvider.theme('default')
				.primaryPalette('deep-purple')
				.accentPalette('light-blue')
				.warnPalette('red')
		}
	]);

angular.module('capsuleApp')
	.controller('navController', ['$http', '$mdSidenav', function($http, $mdSidenav){
		var navCtrl = this;
		console.log('nav view loaded!');

		navCtrl.sideNavOpen = function(){
			$mdSidenav('left').open();
		}

		navCtrl.sideNavClose = function(){
			$mdSidenav('left').close();
		}

	}]);
