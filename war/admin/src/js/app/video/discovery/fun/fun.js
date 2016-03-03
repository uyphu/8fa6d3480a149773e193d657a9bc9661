app.config(
		function($stateProvider) {
			$stateProvider.state('video.home', {
				parent : 'video',
				url : '/home',
				templateUrl : 'js/app/video/discovery/home/home.html',
				//controller : 'HomeController',
				resolve : {
					mainTranslatePartialLoader : [ '$translate',
							'$translatePartialLoader',
							function($translate, $translatePartialLoader) {
//								$translatePartialLoader.addPart('home');
//								$translatePartialLoader.addPart('global');
								return $translate.refresh();
							} ]
				}
			});
		});
