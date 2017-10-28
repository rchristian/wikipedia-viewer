(function() {
	'use strict';

	angular
		.module('app', [
			//Angular modules
			'ngAnimate',
			//Custome modules
			'app.core',
			'app.filter',
			'app.wikiSearch'
		]);
})();