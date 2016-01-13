var app = angular.module('MidburnCampsApp', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'restangular',
    'ngTable'
]);

app.constant('CONFIG', {
    templateDir: '/static/html/',
    defaultState: 'home.siteContent',
    userData: midburn.userData || {}
});

app.config(function ($stateProvider, $urlRouterProvider, CONFIG, $resourceProvider, $httpProvider) {
    var campId = CONFIG.userData && CONFIG.userData.camps && CONFIG.userData.camps[0];

    $resourceProvider.defaults.stripTrailingSlashes = false;

    // set which authentication method to use with django requests
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $urlRouterProvider.otherwise(CONFIG.defaultState);
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'homeCtrl as ctrl',
            template: '<ui-view/>',
            data: {
                campId: campId
            }
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
]);

app.directive('helper', function () {
    return {
        restrict: "E",
        scope: {
            helperItems: '='
        },
        templateUrl: '/static/html/help-panel.html',
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
        templateUrl: '/static/html/sidebar.html',
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

//
// Resources
//
app.factory('API', ['$resource', function($resource) {
    var User = $resource('/v1/users/:id', { id: '@id' });

    var Camp = $resource('/v1/camps/:id', { id: '@id' }, {
        query: {
            interceptor: {
                response: function (resp) {
                    return angular.fromJson(resp.data);
                }
            },
            isArray: true
        },
        get: {
            interceptor: {
                response: function (resp) {
                    return angular.fromJson(resp.data);
                }
            }
        },
        create: {method: 'post'},
        update: {method: 'put'}
    });

    var CampLocation = $resource('/v1/camps_locations/:id', { id: '@id' });
    var CampMember = $resource('/v1/camps_members/:id', { id: '@id' });
    var CampSafety = $resource('/v1/camps_safety/:id', { id: '@id' });
    var Workshop = $resource('/v1/workshops/:id', { id: '@id' });

    return {
        user: User,
        camp: Camp,
        campLocation: CampLocation,
        campMember: CampMember,
        campSafety: CampSafety,
        workshop: Workshop
    };
}]);
app.controller('appCtrl', function (SIDEBAR_ITEMS, $state, CONFIG, $rootScope) {
    var ctrl = this;

    ctrl.sidebarItems = SIDEBAR_ITEMS;
    $rootScope.currentState = CONFIG.defaultState;
    $state.transitionTo(CONFIG.defaultState);
});

// state controllers
app.controller('homeCtrl', function ($state, $stateParams, $rootScope, API) {
    var ctrl = this,
        campId = $state.current.data.campId;

    // todo see if this is needed
    $rootScope.currentState = $state.current.name;

    // set the defaults if camp has not been created yet
    ctrl.formData = {};
    ctrl.formStatus = '';
    ctrl.formData.camp_status = ctrl.formData.camp_status || 1;
    ctrl.formData.is_published = ctrl.formData.is_published || false;
    ctrl.campStatuses = [
        {
            id: -1,
            title: 'Deleted'
        },
        {
            id: 1,
            title: 'Open'
        },
        {
            id: 2,
            title: 'Closed'
        },
        {
            id: 3,
            title: 'Inactive'
        }
    ];
    ctrl.submitText = campId ? 'Update' : 'Create';

    // get initial camp data, if camp has already been created
    if (campId) {
        API.camp.get({id: campId}, function(data) {
            ctrl.formData = data;
        });
    }

    ctrl.submit = function () {
        ctrl.formStatus = 'loading';
        function success() {
            ctrl.formStatus = 'success';
        }
        function error() {
            ctrl.formStatus = 'error';
        }
        if (campId) {
            API.camp.update(ctrl.formData, success, error);
        } else {
            API.camp.create(ctrl.formData, success, error);
        }
    };
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

        $scope.isPublic = false;
        if ($scope.isPublic)
            $scope.model = "Yes";
        else $scope.model = "No";

        $scope.childStatus = false;
        if ($scope.childStatus)
            $scope.model = "Yes";
        else $scope.model = "No";

        $scope.artStatus = false;
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

//
// Members Controller
app.controller('MembersController', function (ngTableParams) {

    // Typically you will use this option to load server-side data
    //var tp = new NgTableParams({}, {
    //    getData: function (params) {
    //        /* code to fetch data that matches the params values EG: */
    //        return executeQuery(params).then(function (data) {
    //            params.total(data.inlineCount);
    //            return data.results;
    //        });
    //    }
    //});

    //var data = [{name: 'christian', age: 21}, {name: 'anthony', age: 88}];
    //self.tableParams = new ngTableParams({}, {dataset: data});
    //$scope.membersData = data;

    this.tableParams = new ngTableParams({}, {
        getData: function (params) {
            // Ajax request to api
            return [{name: 'christian', age: 21},{name: 'christian', age: 21},{name: 'christian', age: 21}, {name: 'anthony', age: 88}];
        }
    });

    //this.tableParams = new ngTableParams(
    //    {page: 1, count: 10},
    //    {
    //        total: 0,
    //        getData: function ($defer, params) {
    //            var filter = params.filter();
    //            var sorting = params.sorting();
    //            var count = params.count();
    //            var page = params.page();
    //            myService.query(page, count, filter, sorting).success(function (result) {
    //                vm.tableParams.total(result.total);
    //                $defer.resolve(result.data);
    //            });
    //        }
    //    }
    //);

});