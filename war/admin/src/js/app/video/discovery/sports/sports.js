app.config(
		function($stateProvider) {
			$stateProvider.state('video.sports', {
				parent : 'video',
				url : '/sports',
				templateUrl : 'js/app/video/discovery/sports/sports.html',
				controller : 'SportsController',
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
