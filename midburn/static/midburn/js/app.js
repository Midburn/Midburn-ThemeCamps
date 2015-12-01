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
            templateUrl: CONFIG.templateDir + 'plan.html',
            controller: "IndexCtrl"
        })
        .state('step3', {
            url: "/",
            templateUrl: CONFIG.templateDir + 'main.html',
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
                name: '',
                url: ''
            }
        ]
    },
    {
        name: 'plan',
        icon: 'flag',
        url: '/#/camp_details'
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
app.directive('collection', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            collection: '='
        },
        template: "<ul class='sidebar-menu'><member ng-repeat='member in collection' member='member'></member></ul>"
    }
});
app.directive('member', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            member: '='
        },
        template: "<a href='{{ member.url }}'><li class='sidebar-menu-item'><div class='menu-item-icon'><i class='fi fi-{{member.icon}} large'></i></div>{{member.name}}</li></a>"
    }
});

app.controller('IndexCtrl', function ($scope, SIDEBAR_ITEMS) {
    $scope.menuItems = SIDEBAR_ITEMS;
});