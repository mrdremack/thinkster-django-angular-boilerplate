(function(){
	'use-strict';

	angular
		.module('thinkster.controllers')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$location', '$routeParams', 'Post', 'Profile', 'Snackbar'];

	function ProfileController($location, $routeParams, Post, Profile, Snackbar){

		var vm = this;
		vm.profile = undefined;
		vm.posts = [];

		activate();

		function activate(){
			var username = $routeParams.username.substr(1);

			Profile.get(username).then(profileSuccessFn, profileErrorFn);
			Posts.get(username).then(postSuccessFn, postErrorFn);
			
			function profileSuccessFn(data, status, header, config){
				vm.profile = data.data;
			}

			function profileErrorFn(data, status, headers, config){
				$location.url('/');
				Snackbar.error('that user does not exist.');

			}

			function postsSuccessFn(data, status, header, config){
				vm.posts = data.data;

			}

			function postsErrorFn(data, status, headers, config){
				Snackbar.error(data.data.error);
			}
		}




	}


})();