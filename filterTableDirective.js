'use strict';

/**
 * This provides a customized filter which filters certain values from the data table that is already present.
 * Consider having a table with different car models from various vendors and amount range. To filter the car model and range you are looking for, you would click on a filter button which brings up a pop up.
 * The UI would consist of a filter set which is made up of 1 selectbox and 2 input fields(for min and max values) associated with it. A user can select 1 option from the selectbox, enter car amount range he is looking for in the input fields, add more (or remove) such sets and filter.
 * Example: You select Audi and enter min amount as $100,000 and max amount as $400,000, the table filters only Audi cars in the range you have entered.
 * @returns Filtered table
 */
function filterTableDirective() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            params: '=',
            type: '='
        },
        templateUrl: function ($element, $attrs) {
            return $attrs.templateurl;
        },
        link: function (scope, elements, attrs) {
            //Sample data
            var sampleList = [
                {"name": "Porsche", "id": "porsche"},
                {"name": "Ferrari", "id": "ferrari"},
                {"name": "Toyota", "id": "toyota"},
                {"name": "Audi", "id": "audi"}
            ];
            scope.dropdownList = angular.copy(sampleList);
            scope.selectedList = [];
            scope.selectedList.push({
                items: scope.dropdownList
            });
            scope.selectedList[0].selectedItem = scope.dropdownList[0];
            var updatedList = angular.copy(scope.dropdownList);

            //This function adds or removes a Filter set based on the button clicked.
            scope.addOrRemoveBtnAction = function (index, item, itemId, arr) {
                var filterOptions = getFilterOptions();
                if (index == scope.selectedList.length - 1 && index != sampleList.length - 1) {
                    var addObj = {
                        items: filterOptions.unselectedValues
                    };
                    scope.selectedList.push(addObj);
                    addObj.selectedItem = filterOptions.unselectedValues[0];
                    resetFilterDropdown();
                }
                else {
                    scope.selectedList.splice(index, 1);
                    resetFilterDropdown();
                }
            };

            //This function is used to reset the dropdown options on change of the dropdown or when a filter set is removed.
            var resetFilterDropdown = function () {
                scope.unselectedOptions = getFilterOptions().unselectedValues;
                scope.optionsArray = [];
                _.each(scope.selectedList, function (selectedVal) {
                    scope.optionsArray = angular.copy(scope.unselectedOptions);
                    scope.optionsArray.push(selectedVal.selectedItem);
                    selectedVal.items = angular.copy(scope.optionsArray);
                })
            };

            //Function returns selected and unselected values of the dropdown.
            var getFilterOptions = function () {
                var selectedValues = [];
                var unselectedValues = [];
                var selectedIds = [];
                var selectedList = angular.copy(scope.selectedList);
                _.each(selectedList, function (selectedVal) {
                    selectedValues.push(selectedVal.selectedItem);
                });
                selectedIds = _.pluck(selectedValues, 'id');
                _.each(sampleList, function (option) {
                    if (!_.contains(selectedIds, option.id)) {
                        unselectedValues.push(option);
                    }
                });
                unselectedValues = _.sortBy(unselectedValues, 'id');
                return {'selectedValues': selectedValues, 'unselectedValues': unselectedValues};
            };
        }
    }
}