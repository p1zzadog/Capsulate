angular.module('capsuleApp')
	.controller('dashController', ['$http', function($http){

		var dashCtrl = this;

		// Get authenticated user info
		$http({
			method : 'get',
			url    : '/api/me',
		}).then(function(returnData){
			if (returnData.data.user) {
				console.log(returnData.data.user);
				dashCtrl.user = returnData.data.user;
				// if authenticated, get capsules for user
				getCapsules();
			}
			else {
				console.log('ngDash /api/me error route', returnData.data);
				window.location.href='#/auth/login';
			};
		});

		function getCapsules(){
			$http({
				method : 'get',
				url    : '/api/get-capsules'
			}).then(function(returnCapsules){
				if (returnCapsules.data.capsules){
					dashCtrl.userCapsules = returnCapsules.data.capsules;
					dashCtrl.userCapsules.forEach(function(capsule){
						capsule.unlockWrapper = moment(capsule.unlockDate).format("dddd, MMMM Do YYYY");
					});
				};
			});
		};


		// Min and Max dates for Date Object
		dashCtrl.createCapsuleForm = {};
		dashCtrl.createCapsuleForm.unlockDate = new Date();
  		dashCtrl.minDate = new Date(
      		dashCtrl.createCapsuleForm.unlockDate.getFullYear(),
      		dashCtrl.createCapsuleForm.unlockDate.getMonth(),
      		dashCtrl.createCapsuleForm.unlockDate.getDate()
      	);
  		dashCtrl.maxDate = new Date(
      		dashCtrl.createCapsuleForm.unlockDate.getFullYear() + 10,
      		dashCtrl.createCapsuleForm.unlockDate.getMonth(),
      		dashCtrl.createCapsuleForm.unlockDate.getDate()
      	);

  		// create capsule form submit
		dashCtrl.createCapsule = function() {
			dashCtrl.createCapsuleForm.locked = true;
			console.log(dashCtrl.createCapsuleForm);
			$http({
				method : 'post',
				url    : '/api/create-capsule',
				data   : dashCtrl.createCapsuleForm,
			}).then(function(returnData){
				console.log(returnData.data);
			});

			dashCtrl.createCapsuleForm = {};
			getCapsules();
		}


		dashCtrl.click = function(){
			console.log('click!')
		}

	}]);