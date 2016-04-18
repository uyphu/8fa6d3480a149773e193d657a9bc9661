app.config(
		function($stateProvider) {
			$stateProvider.state('video.loved', {
				parent : 'video',
				url : '/loved',
				templateUrl : 'js/app/video/discovery/loved/loved.html',
				controller : 'LovedController',
				resolve : {
					mainTranslatePartialLoader : [ '$translate',
							//'$translatePartialLoader',
							function($translate, $translatePartialLoader) {
//								$translatePartialLoader.addPart('fun');
//								$translatePartialLoader.addPart('global');
								//return $translate.refresh();
							} ]
				}
			});
		});
