'use strict';

/**
 * @ngdoc function
 * @name loginAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the loginAppApp
 */
angular.module('loginAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
