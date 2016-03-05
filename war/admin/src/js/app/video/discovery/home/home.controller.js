'use strict';

app
   .controller('HomeController', function ($scope, $rootScope, $timeout, usSpinnerService, 
		   Tube, TubeSearch, ParseLinks, localStorageService) {
       $scope.tubes = [];
       $scope.musics = [];
       $scope.topPlays = [];
       $scope.page = 1;
       $scope.cursor = null;
       $scope.cursorMusic = null;
       $scope.cursorTopPlay = null;
       $scope.invalidQuerySearch = null;
       $scope.spinneractive = false;
       $scope.invalidName = null;
       $scope.value = 10;
       $scope.busy  = false;
       $scope.querySearch = 'status:' + AppConstant.APPROVED_STATUS;
       $scope.loadAll = function() {
    	   initData($scope.cursor, AppConstant.MAX_INIT_PAGE_SIZE);
       };
       $scope.reset = function() {
           $scope.page = 1;
           $scope.cursor = null;
           $scope.tubes = [];
           $scope.loadAll();
           $scope.busy  = false;
       };
       $scope.loadPage = function(page) {
           $scope.page = page;
           if ($scope.searchQuery != null) {
        	   $scope.search();
           } else {
        	   if ($scope.cursor != null) {
        		   listData($scope.cursor, AppConstant.MAX_NEXT_PAGE_SIZE);
               }
           }
       };
       
       $scope.showUpdate = function (id) {
           Tube.get(id).then(function(result) {
               $scope.tube = result;
               $('#saveTubeModal').modal('show');
           });
       };
       
       function initData(cursor, count) {
    	   $scope.startSpin();
    	   Tube.search($scope.querySearch, cursor, count).then(function(data) {
    		   $scope.stopSpin();
    		   if (data != null) {
    			   if (data.items != null) {
	    			   for (var i = 0; i < data.items.length; i++) {
	                     $scope.tubes.push(data.items[i]);
	    			   }
	    			   $scope.cursor = data.nextPageToken;
    			   }
    		   }
    	   });
    	   
    	   //Load music
    	   listMusic($scope.cursorMusic, 8);
    	   //Load top plays
    	   listTopPlays($scope.cursorTopPlay, 5);
       };
       
       function listData(cursor, count) {
    	   $scope.startSpin();
    	   $scope.busy  = true;
    	   Tube.search($scope.querySearch, cursor, count).then(function(data) {
    		   $scope.stopSpin();
    		   if (data != null) {
    			   if (data.items != null) {
	    			   for (var i = 0; i < data.items.length; i++) {
	                     $scope.tubes.push(data.items[i]);
	    			   }
	    			   $scope.cursor = data.nextPageToken;
    			   }
    		   }
    		   $scope.busy  = false;
    	   });
       };
       
       function listMusic(cursor, count) {
    	   $scope.startSpin();
    	   $scope.busy  = true;
    	   Tube.getMusic(cursor, count).then(function(data) {
    		   $scope.stopSpin();
    		   if (data != null) {
    			   if (data.items != null) {
	    			   for (var i = 0; i < data.items.length; i++) {
	                     $scope.musics.push(data.items[i]);
	    			   }
	    			   $scope.cursorMusic = data.nextPageToken;
    			   }
    		   }
    		   $scope.busy  = false;
    	   });
       };
       
       function listTopPlays(cursor, count) {
    	   $scope.startSpin();
    	   $scope.busy  = true;
    	   Tube.getTopPlays(cursor, count).then(function(data) {
    		   $scope.stopSpin();
    		   if (data != null) {
    			   if (data.items != null) {
	    			   for (var i = 0; i < data.items.length; i++) {
	                     $scope.topPlays.push(data.items[i]);
	    			   }
	    			   $scope.cursorTopPlay = data.nextPageToken;
    			   }
    		   }
    		   $scope.busy  = false;
    	   });
       };

       $scope.save = function () {
           if ($scope.tube.id != null) {
        	   var account = localStorageService.get('account');
        	   $scope.tube.userId = account.id;
               Tube.update($scope.tube).then(function (data){
            	   if (data.error != null) {
            		   showError(data.code);
            	   } else {
            		   $scope.refresh();
            	   }
               });
           } else {
        	   var account = localStorageService.get('account');
        	   $scope.tube.userId = account.id;
        	   Tube.insert($scope.tube).then(function (data){
        		   if (data.error != null) {
            		   showError(data.code);
            	   } else {
            		   $scope.refresh();
            	   }
               });
           }
       };

       $scope.delete = function (id) {
    	   Tube.get(id).then(function (data){
    		   $scope.tube = data;
    		   $('#deleteTubeConfirmation').modal('show');
    	   });
       };

       $scope.confirmDelete = function (id) {
           Tube.delete(id).then(function (data){
        	   $scope.reset();
               $('#deleteTubeConfirmation').modal('hide');
               $scope.clear();
    	   });
       };

       $scope.search = function () {
    	   $scope.invalidQuerySearch = null;
    	   if ($scope.cursor == null) {
     		   $scope.tubes = [];
     	   }
    	   if ($scope.searchQuery != null && $scope.searchQuery != '') {
    		   if ($scope.searchQuery.indexOf('id:') != -1) {
    			   var query = $scope.searchQuery.split(':', 2);
    			   try {
    				   var id = parseInt(query[1]);
    				   if (!isNaN(id)) {
    					   $scope.startSpin();
    					   Tube.get(id).then(function(data){
    						   startTimer();
    						   $scope.tubes = [];
    						   if (data != null) {
    							   $scope.tubes.push(data.result);
    						   }
    					   });
    				   } else {
    					   $scope.invalidQuerySearch = 'ERROR';
    				   }
    				} catch (e) {
    					$scope.invalidQuerySearch = 'ERROR';
    				}
    			   
    			   
    		   } else {
    			   $scope.startSpin();
    			   TubeSearch.searchTube($scope.searchQuery, $scope.cursor).then(function(data) {
    				   $scope.stopSpin();
    	    		   if ($scope.cursor == null) {
    	    			   $scope.tubes = [];
    	    		   }
    	    		   if (data != null) {
    	    			   for (var i = 0; i < data.items.length; i++) {
    	                       $scope.tubes.push(data.items[i]);
    	      			   }
    	    			   $scope.cursor = data.nextPageToken;
    	    		   }
    	       		}, 
    	       		function(response) {
    	               if(response.status === 404) {
    	                   $scope.loadAll();
    	               }
    	       		});
    		   }
    	   } else {
    		   listData($scope.cursor, AppConstant.MAX_PAGE_SIZE);
    	   }
       };

       $scope.refresh = function () {
           $scope.reset();
           $('#saveTubeModal').modal('hide');
           $scope.clear();
       };

       $scope.clear = function () {
    	   $scope.invalidName = null;
           $scope.tube = {name: null, description: null, url: null, id: null, 
        		   status:null, like:null, dislike:null, rating:null, dateAdded:null, dateModified:null};
           $scope.editForm.$setPristine();
           //$scope.editForm.$setUntouched();
       };
       
       $scope.change = function() {
    	   $scope.cursor = null;
       };
       
       $scope.startSpin = function() {
    	   if (!$scope.spinneractive) {
    		   usSpinnerService.spin('spinner-1');
    		   //$scope.startcounter++;
    	   }
       };

	   $scope.stopSpin = function() {
		   if ($scope.spinneractive) {
			   usSpinnerService.stop('spinner-1');
		   }
	   };

	   $rootScope.$on('us-spinner:spin', function(event, key) {
		   $scope.spinneractive = true;
	   });

	   $rootScope.$on('us-spinner:stop', function(event, key) {
		   $scope.spinneractive = false;
	   });
	   
	   function startTimer() {
           //var timer = $timeout(function () {
        	   $scope.stopSpin();
           //}, 6000);
       };
	   
	   function showError(errorCode) {
		   if (errorCode == 409) {
			   $scope.invalidName = 'ERROR';
		   }
       };
       
       $scope.loadAll();
   });