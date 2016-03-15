'use strict';

app
   .controller('VideoDetailController', function ($scope, $stateParams, Tube, Youtube) {
	   $scope.tube = {};
      $scope.content = "<b>this is bold content</b>";
      $scope.limit = 200;
      $scope.lessText = "Read less";
      $scope.moreText = "Read more";
      $scope.dotsClass = "toggle-dots-grey";
      $scope.linkClass = "toggle-link-yellow";
      $scope.load = function (id) {
    	  Youtube.getDetail(id).then(function(result) {
            $scope.tube = result;
            document.getElementById('video-player').innerHTML = $scope.tube.embedHtml;
          });
      };
      $scope.load($stateParams.id);
   });