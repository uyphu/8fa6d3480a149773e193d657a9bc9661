'use strict';

//app
//    .factory('Password', function ($resource) {
//        return $resource('api/account/change_password', {}, {
//        });
//    });
app
	.factory('Password', function ($q, $resource) {
		return {
    		save: function (account){
    			var p=$q.defer();
    			gapi.client.userendpoint.changePassword(account).execute(function(resp) {
                    if (resp != null) {
                    	p.resolve(resp);
    				} else {
    					p.resolve(null);
    				}
    			});
    			return p.promise;
    		}
    	}
	});

app
    .factory('PasswordResetInit', function ($resource) {
        return $resource('api/account/reset_password/init', {}, {
        })
    });

app
    .factory('PasswordResetFinish', function ($resource) {
        return $resource('api/account/reset_password/finish', {}, {
        })
    });
