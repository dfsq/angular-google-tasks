(function () {
	'use strict';

	function createStructure(content) {

		var overlay = angular.element('<div class="cssmodal-overlay"></div>'),
			popup   = angular.element('<div class="cssmodal-popup"><div class="cssmodal-content"></div></div>'),
			cont    = popup[0].querySelector('.cssmodal-content');

		cont.appendChild(angular.element(content)[0]);

		overlay.append(popup);
		document.body.appendChild(overlay[0]);
	}

	function cssModal($document, $q) {

		var popup = {};

		popup.open = function() {
			var deferred = $q.defer();

			createStructure('<div>TEST content</div>');

			return deferred.promise;
		};

		return popup;
	}

	cssModal.$inject = ['$document', '$q'];

	angular.module('uiUtils').factory('cssModal', cssModal);
})();