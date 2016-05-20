(function() {
    'use strict';
    var app;
    app = angular.module('app', ['ui.router']);
    app.run(function($rootScope) {
        $rootScope.msg = { 'user': 'n0m4dz', 'text' : 'Thanks for using my gulp workflow', 'version' : '0.0.2'};
    });

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'partials/home.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'partials/about.html'
            })
            .state('error', {
                url: '/error',
                templateUrl: 'partials/error.html'
            });
    });

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);
    });
}).call(this);