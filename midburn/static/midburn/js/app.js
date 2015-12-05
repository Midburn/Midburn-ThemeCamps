var app = angular.module('MidburnCampsApp', [
    'ngAnimate',
    'ui.router',
    'restangular',
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
        items: [
            {
                name: 'item1',
                url: 'item1'
            },
            {
                name: 'item2',
                url: 'item2'
            },
            {
                name: 'item3',
                url: 'item3'
            }
        ]
    },
    {
        name: 'plan',
        icon: 'flag',
        url: ''
    },
    {
        name: 'safety',
        icon: 'safety-cone',
        url: ''
    },
    {
        name: 'friends',
        icon: 'torsos-all',
        url: ''
    },
    {
        name: 'arrival',
        icon: 'foot',
        url: ''
    },
    {
        name: 'admin',
        icon: 'crown',
        url: ''
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
        controller: function() {
            var ctrl = this;

            ctrl.selectedIndex = 0;
        }
    }
});

app.controller('IndexCtrl', function (SIDEBAR_ITEMS) {
    var ctrl = this;

    ctrl.sidebarItems = SIDEBAR_ITEMS;
    ctrl.selectedItem = 0;
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