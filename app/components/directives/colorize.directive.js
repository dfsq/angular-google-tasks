(function () {
	'use strict';

	/**
	 * Function to determine a hsl color of the arbitrary string, based on average UTF character code values.
	 * @type {Function}
	 * @return {String}
	 */
	var str2hsl = (function() {

		var charRanges = [
			[0x0020, 0x07F], // basic latin
			[0x0400, 0x04ff] // cyrillic
		];

		function getRange(code) {
			var range;
			for (var i = 0; i < charRanges.length; i++) {
				range = charRanges[i];
				if (range[0] <= code && code <= range[1]) {
					return range;
				}
			}
			return null;
		}

		function getAverage(arr) {
			return Math.round(arr.reduce(function(prev, curr) {
				return prev + curr;
			}, 0) / arr.length);
		}

		return function str2hsl(str) {

			var i, range, avgs = [], average, code, hue;

			for (i = 0; i < str.length; i++) {
				code = str.charCodeAt(i);
				range = getRange(code);
				if (range) {
					avgs.push(Math.round((code - range[0]) * 100 / (range[1] - range[0])));
				}
			}

			average = getAverage(avgs);
			hue = Math.round(average * 360 / 100);

			return 'hsla(' + hue + ', 20%, 40%, .5)';
		};

	})();

	function colorize($timeout) {
		return {
			link: function(scope, element, attrs) {
				$timeout(function() {
					/** @property colorize */
					var textElement = element[0].querySelector(attrs.colorize),
						text = angular.element(textElement).text();

					element.css('background-color', str2hsl(text));
				});
			}
		};
	}

	colorize.$inject = ['$timeout'];

	angular.module('components.directives').directive('colorize', colorize);

})();