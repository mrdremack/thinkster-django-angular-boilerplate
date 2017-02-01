(function(){
	'use strict';

	angular
		.module('thinkster.posts.directives')
		.directive('posts', posts)


	function posts(){

		var directive = {
			controller: 'PostsController',
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				posts: '='
			},	
			templateUrl: 'static/template/posts/posts.html'

		}
		return directive;

	}


})();