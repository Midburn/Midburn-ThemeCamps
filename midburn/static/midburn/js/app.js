var app = angular.module('MidburnCampsApp', [
    'ngAnimate',
    'ui.router',
    'restangular'
]);

app.constant('CONFIG', {
    templateDir: '/static/midburn/html/'
});

app.config(function ($stateProvider, $urlRouterProvider, CONFIG) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('step1', {
            url: "/",
            templateUrl: CONFIG.templateDir + 'main.html',
            controller: "IndexCtrl"
        })
        .state('step2', {
            url: "/camp_details",
            templateUrl: CONFIG.templateDir + 'camps-step2.html',
            controller: "IndexCtrl"
        })
        .state('step3', {
            url: "/",
            templateUrl: CONFIG.templateDir + '?.html',
            controller: "IndexCtrl"
        })
});

//
// Sidebar
//
app.constant('SIDEBAR_ITEMS', [
    {
        name: 'home',
        icon: 'home',
        state: 'step1',
        items: [
            {
                name: 'Site Content',
                childState: 'step1'
            },
            {
                name: 'The camp',
                childState: 'step2'
            },
            {
                name: 'Contacts',
                childState: 'step3'
            }
        ]
    },
    {
        name: 'Program',
        icon: 'flag',
        state: 'step1',
        items: [
            {
                name: 'Camp Description',
                childState: 'step1'
            },
            {
                name: 'Activities',
                childState: 'step2'
            }
        ]
    },
    {
        name: 'Safety',
        icon: 'safety-cone',
        state: 'step1',
        items: [
            {
                name: 'Safety',
                childState: 'step1'
            }
        ]
    },
    {
        name: 'Members',
        icon: 'torsos-all',
        state: 'step1',
        items: [
            {
                name: 'Registered',
                childState: 'step1'
            },
            {
                name: 'Waiting Approval',
                childState: 'step2'
            },
            {
                name: 'With Ticket',
                childState: 'step3'
            },
            {
                name: 'Without Ticket',
                childState: 'step3'
            }
        ]
    },
    {
        name: 'Arrival',
        icon: 'foot',
        state: 'step1',
        items: [
            {
                name: 'Location',
                childState: 'step1'
            },
            {
                name: 'Checklist',
                childState: 'step2'
            }
        ]
    },
    {
        name: 'admin',
        icon: 'crown',
        state: 'step1',
        items: [
            {
                name: 'Administration',
                childState: 'step1'
            }
        ]
    }
]);
app.directive('sidebar', function() {
    return {
        restrict: "E",
        replace: true,
        scope: {
            sidebarItems: '=',
            selectedItem: '='
        },
        templateUrl: '/static/midburn/html/sidebar.html',
        controllerAs: 'ctrl',
        controller: function($scope) {
            var ctrl = this;

            // selecting items
            ctrl.selectChildItem = function(itemIndex) {
                ctrl.selectedChildIndex = itemIndex;
            };
            ctrl.selectMainItem = function(itemIndex, childIndex) {
                childIndex = childIndex || 0;
                ctrl.selectedIndex = itemIndex;
                ctrl.selectChildItem(childIndex);
            };

            // init the sidebar
            $scope.sidebarItems.some(function(item, i){
                if (item.state === $scope.selectedItem) {
                    ctrl.selectMainItem(i);
                    return true;
                }
            });
        }
    }
});

app.controller('IndexCtrl', function (SIDEBAR_ITEMS) {
    var ctrl = this;

    ctrl.sidebarItems = SIDEBAR_ITEMS;
    ctrl.selectedItem = 'step1';
});

//
// CampStylesController
//
app.controller('CampStylesController', ['$scope', function ($scope) {
    $scope.selection = {
        ids: { }
    };

    $scope.campStyles = [ { "Title": "Food", "Id": "cs01" } , {"Title": "Bar-Drinks", "Id": "cs02" } ];
}]);