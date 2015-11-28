var app = angular.module('MidburnCampsApp', [
     'ui.router',
     'restangular'
]);

app.constant('CONFIG', {
    templateDir: '/static/midburn/html/'
});

app.config(function ($stateProvider, $urlRouterProvider, CONFIG) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('step1', {
            url: "/",
            templateUrl: CONFIG.templateDir + 'main.html',
            controller: "QuestionFormCtrl"
        })
        .state('step1', {
            url: "/",
            templateUrl: CONFIG.templateDir + 'main.html',
            controller: "QuestionFormCtrl"
        })
        .state('step1', {
            url: "/",
            templateUrl: CONFIG.templateDir + 'main.html',
            controller: "QuestionFormCtrl"
        })
});

//
// Sidemenu 
//

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
        template: "<a href=''><li class='sidebar-menu-item'><div class='menu-item-icon'><i class='fi fi-{{member.icon}} large'></i></div>{{member.name}}</li></a>"
    }
});

app.constant('SIDEBAR_ITEMS', [
    {
        name: 'home',
        icon: 'home',
        url: ''
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

app.controller('IndexCtrl', function ($scope, SIDEBAR_ITEMS) {
    $scope.menuItems = SIDEBAR_ITEMS;
});

// REST Api Implementation

app.controller("QuestionFormCtrl", ['$scope', '$http', 'Restangular', 'CbgenRestangular', '$q',
 function ($scope, $http, Restangular, CbgenRestangular, $q) {

        $scope.getQuestions = function () {

            $scope.questions = [];

            $http({
                method: 'GET',
                url: '/api/v1/question/?format=json'
            }).
            then(function (response) {

                console.log(response.status);
                console.log(response.data['objects']);

                return angular.forEach(response.data['objects'], function (key) {
                    console.log("Key: " + key['question_text']);
                    return $scope.questions.push(key);
                });

            }, function (response) {
                $scope.data = response.data || "Request failed";
                $scope.status = response.status;
            });

            return $scope.questions;
        };

        $scope.setQuestions = function () {

            console.log($scope.inputText);

            var post_update_data = create_resource($scope, CbgenRestangular);

            // Submit new data 
            $q.when(post_update_data.then(
                function (object) {
                    // success!
                    console.log("success");
                },

                function (object) {
                    // error!
                    console.log("error");
                }

            ))

        };

}]);

app.factory('CbgenRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('/api/v1');
    });
});

populate_scope_values = function ($scope) {
    return {
        question_text: $scope.inputText,
        pub_date: getTime()
            // "2015-11-17T22:30:28"
    };
};

create_resource = function ($scope, CbgenRestangular) {
    var post_data = populate_scope_values($scope)
    return CbgenRestangular.all('question/').post(post_data)
};

function getTime() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "T" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}