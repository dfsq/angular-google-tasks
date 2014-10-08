(function() {
	'use strict';

	function sModal($q, $controller, $compile, $document) {

		var getTemplate = function(content) {
			var str =
				'<div class="modal fade simple-modal">' +
					'<div class="modal-dialog">' +
						'<div class="modal-content">' + content + '</div>' +
					'</div>' +
				'</div>';
			return str;
		};

		return {
			open: function(config) {

				var deferred = $q.defer(),
					scope = config.scope.$new(),
					tpl, compiled,

					$modalInstance = {
						close: function() {
							cleanUp();
							deferred.resolve.apply(null, arguments);
						},
						dismiss: function() {
							cleanUp();
							deferred.reject();
						}
					};

				function cleanUp() {
					compiled.removeClass('in');
					setTimeout(function() {
						compiled.remove();
					}, 50);
					scope.$destroy();
				}

				scope.$modalInstance = $modalInstance;

				// Init controller if provided
				if (config.controller) {
					$controller(config.controller, {
						$scope: scope,
						$modalInstance: $modalInstance
					});
				}

				// Template url or string
				if (config.templateUrl) {
					tpl = getTemplate('<div ng-include="\'' + config.templateUrl + '\'"></div>');
				}
				else if (config.template) {
					tpl = getTemplate(config.template);
				}

				// Compile and append to DOM
				compiled = $compile(tpl)(scope);

				// Add CSS class if provided
				if (config.windowClass) {
					compiled.addClass(config.windowClass);
				}

				$document.find('body').append(compiled);
				setTimeout(function() {
					compiled.addClass('in');
				}, 50);

				return deferred.promise;
			}
		};
	}

	sModal.$inject = ['$q', '$controller', '$compile', '$document'];

	angular.module('components.services.sModal', []).factory('sModal', sModal);

})();