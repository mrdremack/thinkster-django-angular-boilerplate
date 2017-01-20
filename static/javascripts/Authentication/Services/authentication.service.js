(function(){
	'use strict';

angular 
	.module('thinkster.authentication.services')
	.factory('Authentication', Authentication);

Authentication.$inject = ['$cookies', '$http'];

function Authentication($cookies, $http) {
	var Authentication = {
		register: register,
		login : login,
		getAuthenticatedAccount: getAuthenticatedAccount,
		setAuthenticateAccount: setAuthenticateAccount,
		unauthenticate: unauthenticate,
		isAuthenticated: isAuthenticated,
		logout:logout,
	};
	return Authentication;
	function register(email, password,username) {
		return $http.post('/api/v1/accounts/',{
			username: username,
			password: password,
			email: email
		});
	}

	//taking data from the form and sending it the an endpoint
	function login(email, password){
		return $http.post('/api/v1/auth/login/', {
			email:email,
			password:password
		}).then(loginSuccessFn, LoginErrorFn);

		function loginSuccessFn(data, status, headers, config){
			Authentication.setAuthenticatedAccount(data.data);
			window.location('/')
		}
		function loginErrorFn(data, status, headers, config){
			console.erro('Epic Fail');
		}
	}
	function getAuthenticatedAccount(){
		if (!$cookies.authenticatedAccount){
			return;
		}
		
		return JSON.parse($cookies.authenticatedAccount);
	}

	function isAuthenticated(){
		return !!$cookies.authenticatedAccount;

	}

	function setAuthenticateAccount(account){
		$cookies.authenticateAccount = JSON.stringify(account);
	}

	function unauthenticate(){
		delete $cookies.authenticatedAccount;
	}

	function logout(){
		return $http.post('/api/v1/logout/').then(
			logoutSuccessFn, logoutErrorFn
			);

		function logoutSuccessFn(data, status, headers, config){
			Authentciation.unauthenticate();
			window.location='/';
		};

		function logoutErrorFn(data, status, headers, config){
			console.error('Epic failure');
		}
	}
};

})();
