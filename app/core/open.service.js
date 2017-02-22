(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('openService', openService);

	openService.$inject = ['$window'];

	function openService($window) {
		return {
			openRandom: openRandom,
			openArticles: openArticles
		}

		function openRandom() {
			$window.open('/random', '_blank');
		}

		function openArticles(link) {
			$window.open(link, '_blank');
		}
	}
})();