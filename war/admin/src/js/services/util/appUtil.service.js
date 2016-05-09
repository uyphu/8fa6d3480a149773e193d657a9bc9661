/*jshint bitwise: false*/
'use strict';

app
    .service('AppUtil', function () {
        this.getBaseUrl = function () {
        	return "" + window.location.href.match(/^.*\//);
        }
    });
    

