var app = angular.module('MidburnCampsApp', [
     'ui.router',
     'restangular'
 ])

app.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/");
    $stateProvider

        .state('index', {

        url: "/",
        templateUrl: "/polls/questions",
        controller: "QuestionFormCtrl"
    })

    .state('new', {

        url: "/questions",
        templateUrl: "/polls/questions-form",
        controller: "QuestionFormCtrl"
    })
})


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
        }

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

        }

}])

app.factory('CbgenRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('/api/v1');
    });
})

populate_scope_values = function ($scope) {
    return {
        question_text: $scope.inputText,
        pub_date: "2015-11-17T22:30:28"
    };
}

create_resource = function ($scope, CbgenRestangular) {
    var post_data = populate_scope_values($scope)
    return CbgenRestangular.all('question/').post(post_data)
}