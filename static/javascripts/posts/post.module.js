(function(){
	'use-strict';

	angular
		.module('thinkster.post',[
			'thinkster.posts.controllers',
			'thinkster.posts.directives',
			'thinkster.post.services',
			]);

	angular
		.module('thinkster.post.controllers', []);

	angular
		.module('thinkster.post.directives',['ngDialog']);

	angular
		.module('thinkster.posts.services',[]);






})();
