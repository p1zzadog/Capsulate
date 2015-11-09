angular.module('capsuleApp')
	.controller('dashController', ['$http', 'Upload', function($http, Upload){

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
				getSharedCapsules();
			}
			else {
				window.location.href='/#/auth/login';
			};
		});

		// Min and Max dates for Date Object
		dashCtrl.createCapsuleForm = {};
		dashCtrl.createCapsuleForm.unlockDate = new Date();
  		dashCtrl.minDate = dashCtrl.createCapsuleForm.unlockDate;
  		dashCtrl.maxDate = new Date(
      		dashCtrl.createCapsuleForm.unlockDate.getFullYear() + 10,
      		dashCtrl.createCapsuleForm.unlockDate.getMonth(),
      		dashCtrl.createCapsuleForm.unlockDate.getDate()
      	);

  		// initialize inviteFriends array
  		dashCtrl.createCapsuleForm.inviteFriends = [];
      	
  		// create capsule form submit
		dashCtrl.createCapsule = function() {

			console.log('dashCtrl.createCapsuleForm: ', dashCtrl.createCapsuleForm)
			// CODE FOR PRODUCTION
			dashCtrl.createCapsuleForm.creationDate = new Date();
			
			// CODE FOR DEMO!! Remove me for production
			// dashCtrl.createCapsuleForm.creationDate = new Date(1996, 9, 8);
			// /CODE FOR DEMO

			$http({
				method : 'post',
				url    : '/api/create-capsule',
				data   : dashCtrl.createCapsuleForm,
			}).then(function(returnData){
				console.log(returnData.data.success);
				upload(dashCtrl.capsuleImageUpload.image, returnData.data.capsuleId);
			});

			dashCtrl.createCapsuleForm = {};
			dashCtrl.createCapsuleForm.inviteFriends = [];
			dashCtrl.createCapsuleForm.unlockDate = new Date();
			getCapsules();
			dashCtrl.selectedIndex = 1;
		}

		


		// view unlocked capsule
		dashCtrl.openCapsule = function(index){
			if (!dashCtrl.unlockedCapsule[index]){
				closeCapsules();
				closeShared();
				dashCtrl.unlockedCapsule = [];
				$http({
					method : 'get',
					url    : '/api/open-capsule/' + dashCtrl.userCapsules[index]._id,
				}).then(function(returnData){
					dashCtrl.unlockedCapsule[index] = returnData.data;
					dashCtrl.openCapsuleButtonText[index] = "Close!";
					getContributions(dashCtrl.unlockedCapsule[index]);
				});	
			}
			else {
				closeCapsules();
				closeShared();
			}
		};

		// view invite contribution form
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

		dashCtrl.openShared = function(index){
			if (!dashCtrl.unlockedSharedCapsule[index]){
				closeCapsules();
				closeShared();
				dashCtrl.unlockedSharedCapsule = [];
				$http({
					method : 'get',
					url    : '/api/open-shared/' + dashCtrl.sharedCapsules[index]._id,
				}).then(function(returnData){
					dashCtrl.unlockedSharedCapsule[index] = returnData.data;
					dashCtrl.openSharedButtonText[index] = "Close!";
					getContributions(dashCtrl.unlockedSharedCapsule[index]);
				});	
			}
			else {
				closeCapsules();
				closeShared();
			}
		}

		// submit contribution form
		dashCtrl.submitContribution = function(index){
			dashCtrl.inviteForm.capsuleId = dashCtrl.inviteCapsules[index]._id;
			$http({
				method : 'post',
				url    : '/api/submit-contribution',
				data   : dashCtrl.inviteForm,
			}).then(function(returnData){
				if (returnData.data.success){
					dashCtrl.openedInvite[index] = false;
					getInvites();
				}
			})
			dashCtrl.inviteForm = {};
		}

		// utility functions
		function getCapsules(){
			$http({
				method : 'get',
				url    : '/api/get-capsules'
			}).then(function(returnCapsules){
				if (returnCapsules.data.capsules){
					dashCtrl.userCapsules = returnCapsules.data.capsules;
					dashCtrl.userCapsules.forEach(function(capsule){
						capsule.unlockWrapper = moment(capsule.unlockDate).format("dddd, MMMM Do YYYY");
						capsule.creationWrapper = moment(capsule.creationDate).format("dddd, MMMM Do YYYY");
					});
					closeCapsules();

				};
			});
		};

		function getInvites(){
			$http({
				method : 'get',
				url    : '/api/get-invites'
			}).then(function(returnCapsules){
				if (returnCapsules.data.capsules){
					dashCtrl.inviteCapsules = returnCapsules.data.capsules;
					dashCtrl.inviteCapsules.forEach(function(capsule){
						capsule.unlockWrapper = moment(capsule.unlockDate).format("dddd, MMMM Do YYYY");
					});
				};
			});
		};

		function getSharedCapsules(){
			$http({
				method : 'get',
				url    : '/api/get-shared'  
			}).then(function(returnCapsules){
				if (returnCapsules.data.capsules) {
					dashCtrl.sharedCapsules = returnCapsules.data.capsules;
					dashCtrl.sharedCapsules.forEach(function(capsule){
						capsule.unlockWrapper = moment(capsule.unlockDate).format("dddd, MMMM Do YYYY");
						capsule.creationWrapper = moment(capsule.creationDate).format("dddd, MMMM Do YYYY");
					});
					closeShared();
				};
			});
		};

		function getContributions(capsule){
			$http({
				method : 'get',
				url    : '/api/get-contributions/' + capsule._id
			}).then(function(returnData){
				dashCtrl.contributions = returnData.data;
			})
		}

		closeCapsules = function(){
			dashCtrl.unlockedCapsule = [];
			dashCtrl.openCapsuleButtonText = [];
			for (var i = 0; i<dashCtrl.userCapsules.length; i++){
				dashCtrl.openCapsuleButtonText[i]="Open";
			};			
		};

		closeShared = function(){
			dashCtrl.unlockedSharedCapsule = [];
			dashCtrl.openSharedButtonText = [];
			for (var i = 0; i<dashCtrl.sharedCapsules.length; i++){
				dashCtrl.openSharedButtonText[i]="Open";
			};	
		}

		upload = function (file, capsuleId) {
        	Upload.upload({
            	url    : '/api/upload-photo',
            	method : 'post',
            	data   : {
            		file      : file,
            		capsuleId : capsuleId,
            	}
        	}).then(function (resp) {
        		console.log('resp', resp)
            	console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        	}, function (resp) {
            	console.log('Error status: ' + resp.status);
        	}, function (evt) {
            	var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            	console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        	});
    	};

	}]);