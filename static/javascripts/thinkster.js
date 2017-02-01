(function () {
	'use strict';

angular
  .module('thinkster', [
  	'thinkster.routes',
  	'thinkster.config',
  	'thinkster.authentication',
  	'thinkster.layout',
  	'thinkster.posts',
  	'thinkster.utils',
  	'thinkster.profiles',
	]);

angular
  .module('thinkster.routes', ['ngRoute']);

angular
  .module('thinkster.config', []);

angular 
	.module('thinkster')
	.run(run);

	//run blocks run before anything else is excecuted, used to set initail app setting

run.$inject = ['$http']

function run($http){
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';

	//Header expected by Django
		$http.defaults.xsrfCookieName = 'csrftoken';

	}

})();
