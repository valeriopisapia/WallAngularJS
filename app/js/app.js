'use strict';

var myApp = angular.module('myApp',
    [
        'ngRoute',
        'View1Controller'
    ]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/view1', {
                templateUrl: 'view1/view1.html',
                controller:  'View1Controller'
            }).
            when('/view2',{
                templateUrl: 'view2/view2.html',
                controller:  'View2Controller'
            }).
            otherwise({redirectTo: '/view1'});

}]);