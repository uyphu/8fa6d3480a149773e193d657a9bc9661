app.config(
		function($stateProvider) {
			$stateProvider.state('video.playlist', {
				parent : 'video',
				url : '/playlist',
				templateUrl : 'js/app/video/discovery/playlist/playlist.html',
				controller : 'PlaylistController',
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
