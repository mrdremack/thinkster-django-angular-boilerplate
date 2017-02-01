(function($, _){
	'use-strict';

	angular
		.module('thinkster.utils.services')
		.factory('Snackbar', Snackbar)

	function Snackbar(){
		var Snackbar = {
			error : error,
			show : error
		};

		return Snackbar;

		// configuring snack bar to wait three seconds before showing an error message.
		function _snackbar(content, options){
			options = _.extend({timeout:3000}, options)
			options.content = content
			$.snackbar(options);
		}

		// take the content and add error to the beginning of the message
		function error(content, options){
			_snackbar('Error: ' + content, options);
		}

		function show(content, options){
			_snackbar(content, options)
		}
	}

})($, _)