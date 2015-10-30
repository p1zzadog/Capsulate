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
					// views       : {
					// 	"loginView"    : {
					// 		template : 'arbitrary blah blah',
					// 		// templateUrl : 'html/views/login/login.login.html',
					// 	},
					// 	"registerView" : {
					// 		templateUrl : 'html/views/login/login.register.html',
					// 	},
					// },

				})
				.state('login.login', {
					url         : '/login',
					templateUrl : 'html/views/login/login.login.html',

				})
				.state('login.register', {
					url         : '/register',
					templateUrl : 'html/views/login/login.register.html',

				})
				.state('login.loggedin', {
					url         : '/loggedin',
					templateUrl : 'html/views/login/login.loggedin.html',

				})
				.state('dashboard', {
					url         : '/view/dash',
					templateUrl : 'html/views/dash/dash.html',
					controller  : 'dashController as dashCtrl',
				})
				.state('dashboard.create', {
					url         : '/create',
					templateUrl : '/html/views/dash/dash.create.html'
				})
				.state('dashboard.manage', {
					url         : '/manage',
					templateUrl : '/html/views/dash/dash.manage.html'
				})
				.state('dashboard.invites', {
					url         : '/invites',
					templateUrl : '/html/views/dash/dash.invites.html'
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
