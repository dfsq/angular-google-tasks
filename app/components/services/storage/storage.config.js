/**
 * Storage module should handle related set of tasks.
 *
 * 1. Cache storage. Cache results of HTTP queries and results of data transformation (tree of tasks).
 *
 * 2. Local storage. Store task lisks information and information about child tasks:
 * number of tasks in list and pinned tasks.
 */
angular.module('components.services.storage', [
	'storage.cache',
	'storage.local'
]);