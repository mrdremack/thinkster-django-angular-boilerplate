(function(){
	'use strict';


	angular
			.module('thinkster.routes')
			.config(config);

			config.$inject = ['$routeProvider'];

			function config($routeProvider){


				$routeProvider.when('/register', {
					controller : 'RegisterController',
					controllerAs : 'vm',
					templateUrl : 'static/templates/authentication/register.html'

				}).when('/login',{
					controller : 'LoginController', 
					controllerAs : 'vm',
					templateUrl : 'static/templates/authentication/login.html'
				}).wehn('/',{
					controller: 'IndexController',
					controllerAs: 'vm',
					templateUrl: 'statics/templates/layout/index.html'
				}).wehn('/+:username', {
					controller: 'ProfileController',
					controllerAs: 'vm',
					templateUrl: 'statics/templates/profiles/profile.html'
				}).otherwise('/');

			} 

})();