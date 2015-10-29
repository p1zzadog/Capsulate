// instatiate
angular.module('capsuleApp', ['ui.router', 'ngMaterial'])

// configure
angular.module('capsuleApp')
	.config(['$stateProvider', '$mdThemingProvider',
		function($stateProvider, $mdThemingProvider){
			$stateProvider
				.state('home', {
					url         : '/view/home',
					templateUrl : '/html/views/home.html',
					controller  : 'homeController as homeCtrl'
				})
				.state('login', {
					url         : '/auth/login',
					templateUrl : 'html/views/login.html',
					controller  : 'loginController as loginCtrl',

				})
				.state('dashboard', {
					url         : '/view/dash',
					templateUrl : 'html/views/dash.html',
					controller  : 'dashController as dashCtrl',
				})
			$mdThemingProvider.theme('default')
				.primaryPalette('deep-purple')
				.accentPalette('light-blue')
				.warnPalette('red')
		}
	]);

angular.module('capsuleApp')
	.controller('mainController', ['$http', '$mdSidenav', function($http, $mdSidenav){
		var mainCtrl = this;
		console.log('main view loaded!');

		mainCtrl.sideNavOpen = function(){
			$mdSidenav('left').open();
		}

		mainCtrl.sideNavClose = function(){
			$mdSidenav('left').close();
		}

	}]);
