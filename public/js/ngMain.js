// instatiate
angular.module('bpApp', ['ngRoute', 'ngMaterial'])

// configure
angular.module('bpApp')
	.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.when('/', {
				templateUrl : './html/views/home.html',
				controller  : 'mainController as main'
			})
		}
	]);

// mainController
angular.module('bpApp')
	.controller('mainController', ['$http', function($http){
		console.log('view loaded!')
		// this. = mainController $scope
		this.controllerAsTest = function(){
			console.log('controllerAsTest!')
		}
	}]);