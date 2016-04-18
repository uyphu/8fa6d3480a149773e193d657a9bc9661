'use strict';

app.factory('Playlist', function ($q, DateUtils, GApi) {
	   return {
   			
   			loadAll: function (cursor, count){
    			var p=$q.defer();
    			var requestData = {};
    			requestData.cursor = cursor;
    			requestData.count = count;
    			GApi.execute(AppConstant.PLAYLIST_ENDPOINT, 'listPlaylist', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			search: function (querySearch, cursor, count){
    			var p=$q.defer();
    			var requestData = {};
    			requestData.querySearch = querySearch;
    			requestData.cursor = cursor;
    			requestData.count = count;
    			GApi.execute(AppConstant.PLAYLIST_ENDPOINT, 'searchPlaylist', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			getMusic: function (cursor, count){
    			var p=$q.defer();
    			var requestData = {};
    			requestData.cursor = cursor;
    			requestData.count = count;
    			GApi.execute(AppConstant.PLAYLIST_ENDPOINT, 'getMusic', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			getTopPlays: function (cursor, count){
    			var p=$q.defer();
    			var requestData = {};
    			requestData.cursor = cursor;
    			requestData.count = count;
    			GApi.execute(AppConstant.TOP_PLAYLIST_ENDPOINT, 'getTopPlays', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			getTopMusics: function (cursor, count){
    			var p=$q.defer();
    			var requestData = {};
    			requestData.cursor = cursor;
    			requestData.count = count;
    			GApi.execute(AppConstant.TOP_PLAYLIST_ENDPOINT, 'getTopMusics', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			getTopMovies: function (cursor, count){
    			var p=$q.defer();
    			var requestData = {};
    			requestData.cursor = cursor;
    			requestData.count = count;
    			GApi.execute(AppConstant.TOP_PLAYLIST_ENDPOINT, 'getTopMovies', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			insert: function (playlist) {
   				var p=$q.defer();
   				GApi.execute(AppConstant.PLAYLIST_ENDPOINT, 'insertPlaylist', playlist).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			update: function (playlist) {
   				var p=$q.defer();
   				GApi.execute(AppConstant.PLAYLIST_ENDPOINT, 'updatePlaylist', playlist).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			},
   			
   			delete: function (id) {
   				var p=$q.defer();
   				var requestData = {};
   				requestData.id = id;
    			GApi.execute(AppConstant.PLAYLIST_ENDPOINT, 'removePlaylist', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			}, 
   			
   			get: function (id) {
   				var p=$q.defer();
   				var requestData = {};
   				requestData.id = id;
    			GApi.execute(AppConstant.PLAYLIST_ENDPOINT, 'getPlaylist', requestData).then (function(resp){
   				 	p.resolve(resp);
    			},function(error){
					console.log(ErrorCode.ERROR_CALL_ENDPOINT_SERVICE + error);
					p.reject(error);
				});
    			return p.promise;
   			}
	   };
   });