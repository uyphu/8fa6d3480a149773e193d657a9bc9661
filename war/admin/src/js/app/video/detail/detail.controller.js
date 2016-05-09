'use strict';

app
   .controller('VideoDetailController', function ($scope, $stateParams, $location, Tube, Youtube, AppUtil) {
	   $scope.tube = {};
      $scope.content = "<b>this is bold content</b>";
      $scope.limit = 200;
      $scope.lessText = "Read less";
      $scope.moreText = "Read more";
      $scope.dotsClass = "toggle-dots-grey";
      $scope.linkClass = "toggle-link-yellow";
      $scope.load = function (id) {
    	  var rootUrl = AppUtil.getBaseUrl();
    	  if (rootUrl.indexOf("detail") == -1) {
    		  $scope.url = rootUrl + "detail/" + $stateParams.id;
    	  } else {
    		  $scope.url = rootUrl + $stateParams.id;
    	  }
    	  Youtube.getDetail(id).then(function(result) {
            $scope.tube = result;
            document.getElementById('video-player').innerHTML = $scope.tube.embedHtml;
          });
      };
      $scope.load($stateParams.id);
   });