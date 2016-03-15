app.config(
		function($stateProvider) {
			$stateProvider.state('video.detail', {
				parent : 'video',
				url : '/detail/:id',
				templateUrl : 'js/app/video/detail/detail.html',
				controller : 'VideoDetailController',
				resolve : {
					mainTranslatePartialLoader : [ '$translate',
							function($translate) {
//								$translatePartialLoader.addPart('home');
//								$translatePartialLoader.addPart('global');
								//return $translate.refresh();
							} ]
				}
			});
		});
