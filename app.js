'use strict';
angular.module('my-app', ['ui.router']);

/**
 * Dependency injection.
 */
angular
    .module('my-app')
    .directive('accordion', accordionDirective)
    .directive('filterTable', filterTableDirective);