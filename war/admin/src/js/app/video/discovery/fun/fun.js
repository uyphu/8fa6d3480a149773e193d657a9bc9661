app.config(
		function($stateProvider) {
			$stateProvider.state('video.fun', {
				parent : 'video',
				url : '/fun',
				templateUrl : 'js/app/video/discovery/fun/fun.html',
				controller : 'FunController',
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
