/**
 * This provides a simple accordion feature. Each Accordion has a Title and body. On click of the Accordion title, it expands to show it's body content.
 * Expand all and collapse all feature is also available. This feature can be invoked by adding a function in the controller which does a scope broadcast to this directive.
 */
function accordionDirective ($compile) {
    return {
        restrict: 'AEC',
        controller: function($scope, $element) {
            $scope.toggle = function(i) {
                var items = $element[0].querySelectorAll('.accordion-item');
                angular.element(items[i]).toggleClass('open');
            };

            $scope.$on('expand-all', function () {
                var items = $element[0].querySelectorAll('.accordion-item');
                for (var i in items) {
                    angular.element(items[i]).addClass('open');
                }
                $compile(angular.element(el).contents())(scope);
            });

            $scope.$on('collapse-all', function () {
                var items = $element[0].querySelectorAll('.accordion-item');
                for (var i in items) {
                    angular.element(items[i]).removeClass('open');
                }
                $compile(angular.element(el).contents())(scope);
            });
        },
        link: function(scope, el, attrs) {
            var itemSelector = attrs.itemSelector || '.accordion-item',
                titleSelector = attrs.titleSelector || '.accordion-item__title',
                contentSelector = attrs.contentSelector || '.accordion-item__content',
                items = el[0].querySelectorAll(itemSelector);
            for (var i in items) {
                if (angular.isObject(items[i])) {
                    var title = items[i].querySelectorAll(titleSelector)[0];
                    var content = items[i].querySelectorAll(contentSelector)[0];
                    angular.element(title).attr('ng-click', 'toggle(' + i + ')');
                }
            }
            $compile(angular.element(el).contents())(scope);
        }
    }
}
