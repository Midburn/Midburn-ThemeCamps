var app = angular.module('MidburnCampsApp', [
    'ngAnimate',
    'ui.router',
    'restangular'
]);

app.constant('CONFIG', {
    templateDir: '/static/midburn/html/',
    defaultState: 'home.siteContent'
});

app.config(function ($stateProvider, $urlRouterProvider, CONFIG) {
    $urlRouterProvider.otherwise(CONFIG.defaultState);
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'homeCtrl as ctrl',
            template: '<ui-view/>'
        })
        .state('home.siteContent', {
            url: "/site-content",
            templateUrl: CONFIG.templateDir + 'home-site-content.html'
        })
        .state('home.camp', {
            url: "/camp",
            templateUrl: CONFIG.templateDir + 'home-camp.html'
        })
        .state('home.contacts', {
            url: "/home/contacts",
            templateUrl: CONFIG.templateDir + 'home-contacts.html',
            controller: 'homeCtrl as ctrl'
        })
        .state('program', {
            url: '/program',
            template: '<ui-view/>',
            controller: "programCtrl as ctrl"
        })
        .state('program.campDescription', {
            url: "/description",
            templateUrl: CONFIG.templateDir + 'program-description.html'
        })
        .state('program.activities', {
            url: "/activities",
            templateUrl: CONFIG.templateDir + 'program-activities.html'
        })
        .state('safety', {
            url: "/safety",
            templateUrl: CONFIG.templateDir + 'safety.html',
            controller: "safetyCtrl as ctrl"
        })
        .state('members', {
            url: '/members',
            template: '<ui-view/>',
            controller: "membersCtrl as ctrl"
        })
        .state('members.registered', {
            url: "/registered",
            templateUrl: CONFIG.templateDir + 'members-registered.html'
        })
        .state('members.waiting', {
            url: "/waiting",
            templateUrl: CONFIG.templateDir + 'members-waiting.html'
        })
        .state('members.withTicket', {
            url: "/with-ticket",
            templateUrl: CONFIG.templateDir + 'members-with-ticket.html'
        })
        .state('members.withoutTicket', {
            url: "/without-ticket",
            templateUrl: CONFIG.templateDir + 'members-without-ticket.html'
        })
        .state('arrival', {
            url: '/arrival',
            template: '<ui-view/>',
            controller: "arrivalCtrl as ctrl"
        })
        .state('arrival.location', {
            url: "/location",
            templateUrl: CONFIG.templateDir + 'arrival-location.html'
        })
        .state('arrival.checklist', {
            url: "/checklist",
            templateUrl: CONFIG.templateDir + 'arrival-checklist.html'
        })
        .state('admin', {
            url: "/admin",
            templateUrl: CONFIG.templateDir + 'admin.html',
            controller: "adminCtrl as ctrl"
        })
});

//
// Sidebar
//
app.constant('SIDEBAR_ITEMS', [
    {
        name: 'home',
        icon: 'home',
        state: 'home',
        items: [
            {
                name: 'Site Content',
                childState: 'home.siteContent'
            },
            {
                name: 'The camp',
                childState: 'home.camp'
            },
            {
                name: 'Contacts',
                childState: 'home.contacts'
            }
        ]
    },
    {
        name: 'Program',
        icon: 'flag',
        state: 'program',
        items: [
            {
                name: 'Camp Description',
                childState: 'program.campDescription'
            },
            {
                name: 'Activities',
                childState: 'program.activities'
            }
        ]
    },
    {
        name: 'Safety',
        icon: 'safety-cone',
        state: 'safety',
        items: [
            {
                name: 'Safety',
                childState: 'safety'
            }
        ]
    },
    {
        name: 'Members',
        icon: 'torsos-all',
        state: 'members',
        items: [
            {
                name: 'Registered',
                childState: 'members.registered'
            },
            {
                name: 'Waiting Approval',
                childState: 'members.waiting'
            },
            {
                name: 'With Ticket',
                childState: 'members.withTicket'
            },
            {
                name: 'Without Ticket',
                childState: 'members.withoutTicket'
            }
        ]
    },
    {
        name: 'Arrival',
        icon: 'foot',
        state: 'arrival',
        items: [
            {
                name: 'Location',
                childState: 'arrival.location'
            },
            {
                name: 'Checklist',
                childState: 'arrival.checklist'
            }
        ]
    },
    {
        name: 'admin',
        icon: 'crown',
        state: 'admin',
        items: [
            {
                name: 'Administration',
                childState: 'admin'
            }
        ]
    }
]);

app.constant('HELPER_ITEMS', [
    {
        state: 'home.siteContent',
        title: 'Camp Description',
        content: 'The way you describe your camp can help people better understand what you’re all about. Be sure to keep it fun, but informative. Need help filling out the form? Ask us!'
    }
])

app.directive('helper', function () {
    return {
        restrict: "E",
        scope: {
            helperItems: '='
        },
        templateUrl: '/static/midburn/html/help-panel.html',
        controllerAs: 'helpCtrl',
        controller: function (HELPER_ITEMS, $scope, $state) {
            var helpCtrl = this;

            // Show helper context by current state
            helpCtrl.currentState = $state;

            helpCtrl.helperItems = HELPER_ITEMS;

        }
    }
});

app.directive('sidebar', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            sidebarItems: '=',
            selectedItem: '='
        },
        templateUrl: '/static/midburn/html/sidebar.html',
        controllerAs: 'ctrl',
        controller: function ($scope, $state) {
            var ctrl = this;

            // selecting items
            ctrl.selectMainItem = function (itemIndex) {
                ctrl.selectedIndex = itemIndex;
            };
            ctrl.selectChildItem = function (state) {
                $scope.selectedItem = state;
                $state.go(state);
            };

            // init the sidebar
            $scope.sidebarItems.some(function (item, i) {
                if ($scope.selectedItem.indexOf(item.state) > -1) {
                    ctrl.selectMainItem(i);
                    return true;
                }
            });
        }
    }
});

app.controller('appCtrl', function (SIDEBAR_ITEMS, $state, CONFIG, $rootScope) {
    var ctrl = this;

    ctrl.sidebarItems = SIDEBAR_ITEMS;
    $rootScope.currentState = CONFIG.defaultState;
    $state.transitionTo(CONFIG.defaultState);
});

// state controllers
app.controller('homeCtrl', function ($state, $rootScope) {
    var ctrl = this;

    $rootScope.currentState = $state.current.name;
});
app.controller('programCtrl', function () {
    var ctrl = this;

});
app.controller('safetyCtrl', function () {
    var ctrl = this;

});
app.controller('membersCtrl', function () {
    var ctrl = this;

});
app.controller('arrivalCtrl', function () {
    var ctrl = this;

});
app.controller('adminCtrl', function () {
    var ctrl = this;

});

//
// SiteContentController & Modules
app.controller('SiteContentController', ['$scope', function ($scope) {
    $scope.submitForm = function (isValid) {

        // Check if camp name is unique (Ajax);


        //
        if (isValid) {
            alert('our form is valid');
        }
    }
}]);

// Regex modules
//
app.directive('validateEmail', function () {
    var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,6})$/;
    return {
        link: function (scope, elm) {
            elm.on("keyup", function () {
                var isMatchRegex = EMAIL_REGEXP.test(elm.val());
                if (isMatchRegex && elm.hasClass('warning') || elm.val() == '') {
                    elm.removeClass('warning');
                } else if (isMatchRegex == false && !elm.hasClass('warning')) {
                    elm.addClass('warning');
                }
            });
        }
    }
});

app.directive('validatePhone', function () {
    var PHONE_REGEX = /^[0-9]{10}/;
    return {
        link: function (scope, elm) {
            elm.on("keyup", function () {
                var isMatchRegex = PHONE_REGEX.test(elm.val());
                if (isMatchRegex && elm.hasClass('warning') || elm.val() == '') {
                    elm.removeClass('warning');
                } else if (isMatchRegex == false && !elm.hasClass('warning')) {
                    elm.addClass('warning');
                }
            });
        }
    }
});

//
// CampDetailsController
app.controller('CampDetailsController', ['$scope', function ($scope) {

    $scope.init = function () {

        $scope.childStatus = true;
        if ($scope.childStatus)
            $scope.model = "Yes";
        else $scope.model = "No";

        $scope.artStatus = true;
        if ($scope.artStatus)
            $scope.model = "Yes";
        else $scope.model = "No";
    }

    $scope.changeStatus = function () {

        $scope.childStatus = !$scope.childStatus;
        if ($scope.childStatus)
            $scope.model = "Yes";
        else $scope.model = "No";

        $scope.artStatus = !$scope.artStatus;
        if ($scope.artStatus)
            $scope.model = "Yes";
        else $scope.model = "No";
    }

}]);

//
// CampStylesController
app.controller('CampStylesController', ['$scope', function ($scope) {
    $scope.selection = {
        ids: {}
    };
    var styles_en = [{"Title": "Food", "Id": "cs01"},
        {"Title": "Bar", "Id": "cs02"},
        {"Title": "Sound", "Id": "cs03"},
        {"Title": "Workshop", "Id": "cs04"},
        {"Title": "PerformanceArt", "Id": "cs05"}];
    $scope.campStyles = styles_en;
}]);

//
// CampActivityHrsController
app.controller('CampActivityHrsController', ['$scope', function ($scope) {
    $scope.selection = {
        ids: {}
    };
    var timing_en = [{"Title": "Morning", "Id": "ch01"},
        {"Title": "Afternoon", "Id": "ch02"},
        {"Title": "Evening", "Id": "ch03"},
        {"Title": "Night", "Id": "ch04"}];
    $scope.campActivityHrs = timing_en;
}]);


//
// CampContactsController
app.controller('CampContactsController', ['$scope', function ($scope) {

}]);