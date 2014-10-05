(function() {
	'use strict';

	function sModal($q, $controller, $compile, $document) {

		var getTemplate = function(content) {
			var str =
//				'<div class="csspopup-overlay">' +
//					'<div class="csspopup-popup">' +
//						'<div class="csspopup-close" ng-click="$modalInstance.dismiss()">&times;</div>' +
//						'<div class="csspopup-content">' + content + '</div>' +
//					'</div>' +
//				'</div>';
				'<div class="modal fade">' +
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
							deferred.resolve();
						},
						dismiss: function() {
							cleanUp();
							deferred.reject();
						}
					};

				function cleanUp() {
					compiled.remove();
					scope.$destroy();
				}

				scope.$modalInstance = $modalInstance;

				$controller(config.controller, {
					$scope: scope,
					$modalInstance: $modalInstance
				});

				if (config.templateUrl) {
					tpl = getTemplate('<div ng-include="\'' + config.templateUrl + '\'"></div>');
				}
				else if (config.template) {
					tpl = getTemplate(config.template);
				}

				compiled = $compile(tpl)(scope);
				$document.find('body').append(compiled);

				return deferred.promise;
			}
		};
	}

	sModal.$inject = ['$q', '$controller', '$compile', '$document'];

	angular.module('components.services.sModal', []).factory('sModal', sModal);

})();