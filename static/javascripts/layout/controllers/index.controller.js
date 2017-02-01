(function(){
	'use strict';

	angular
		.module('thinkster.layout.controllers')
		.controller('IndexController', IndexController);


	IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar']

	function IndexController($scope, Authentication, Post, Snackbar){

		var vm = this;

		vm.posts = []

		vm.isAuthenticated = Authententication.isAuthenticated();

		activate();

		function activate(){
			// calling from post.module
			Post.all().then(postSuccessFn, postErrorFn);

			$scope.$on('post.created', function(event, post){
				vm.posts.unshift(post)
			});

			$scope.$on('post.created.error', function(){
				vm.posts.shift();
			});

			function postSuccessFn(data, status, headers, config){
				vm.posts = data.data
			}

			function postErrorFn(datat, status, headers, config){
				Snackbar.error(data.error)
			}
		}


	}

})();