// instatiate
angular.module('capsuleApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate'])

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
				.state('home2', {
					url         : '/',
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
				.primaryPalette('indigo')
				.accentPalette('light-blue')
				.warnPalette('red')
		}
	]);

angular.module('capsuleApp')
	.controller('navController', ['$http', '$mdSidenav', '$window', '$scope', function($http, $mdSidenav, $window, $scope){
		var navCtrl = this;

		navCtrl.bannerClose = false;

		navCtrl.sideNavOpen = function(){
			$mdSidenav('left').open();
		}

		navCtrl.sideNavClose = function(){
			$mdSidenav('left').close();
		}

		navCtrl.closeBanner = function(){
			console.log('closeBanner');
			navCtrl.bannerClose = true;
		}

		angular.element($window).bind("scroll", function() {
           	if (this.pageYOffset >= 850) {
               	navCtrl.bannerClose = true;
            }
           	$scope.$apply();
       	});

		


	}]);

