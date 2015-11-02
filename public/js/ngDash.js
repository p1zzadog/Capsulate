angular.module('capsuleApp')
	.controller('dashController', ['$http', function($http){

		var dashCtrl = this;

		// Get authenticated user info
		$http({
			method : 'get',
			url    : '/api/me',
		}).then(function(returnData){
			if (returnData.data.user) {
				dashCtrl.user = returnData.data.user;
				// if authenticated, get capsules for user
				getCapsules();
				getInvites();
			}
			else {
				window.location.href='/#/auth/login';
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

		function getInvites(){
			$http({
				method : 'get',
				url    : '/api/get-invites'
			}).then(function(returnCapsules){
				if (returnCapsules.data.capsules){
					console.log(returnCapsules.data.capsules)
					dashCtrl.inviteCapsules = returnCapsules.data.capsules;
					dashCtrl.inviteCapsules.forEach(function(capsule){
						capsule.unlockWrapper = moment(capsule.unlockDate).format("dddd, MMMM Do YYYY");
					});
				};
			});
		};


		// Min and Max dates for Date Object
		dashCtrl.createCapsuleForm = {};
		dashCtrl.createCapsuleForm.unlockDate = new Date();
  		dashCtrl.minDate = dashCtrl.createCapsuleForm.unlockDate;
  		dashCtrl.maxDate = new Date(
      		dashCtrl.createCapsuleForm.unlockDate.getFullYear() + 10,
      		dashCtrl.createCapsuleForm.unlockDate.getMonth(),
      		dashCtrl.createCapsuleForm.unlockDate.getDate()
      	);

  		// number of friends to add

  		dashCtrl.createCapsuleForm.inviteFriends = [];
      	
  		// create capsule form submit
		dashCtrl.createCapsule = function() {
			$http({
				method : 'post',
				url    : '/api/create-capsule',
				data   : dashCtrl.createCapsuleForm,
			}).then(function(returnData){
				console.log(returnData.data);
				// Need to write a function to display success
				// window.location.href="/#/"
			});

			dashCtrl.createCapsuleForm = {};
			dashCtrl.createCapsuleForm.inviteFriends = [];
			dashCtrl.createCapsuleForm.unlockDate = new Date();
			getCapsules();
		}

		// view unlocked capsule
		dashCtrl.openCapsule = function(index){
			dashCtrl.unlockedCapsule = [];
			$http({
				method : 'get',
				url    : '/api/open-capsule/' + dashCtrl.userCapsules[index]._id,
			}).then(function(returnData){
				dashCtrl.unlockedCapsule[index] = returnData.data;
			});	
		};

		dashCtrl.openInvite = function(index){
			dashCtrl.openedInvite = [];
			$http({
				method : 'get',
				url    : '/api/open-invite/' + dashCtrl.inviteCapsules[index]._id,
			}).then(function(returnData){
				if (returnData.data.success){
					dashCtrl.openedInvite[index]=true;
				}
				else console.log(returnData.data.error)				
			})
		}

		dashCtrl.submitContribution = function(index){

		}

	}]);