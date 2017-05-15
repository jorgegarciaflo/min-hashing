/**
 * Created by moh on 05/04/17.
 */
'use strict';

/**
 * @ngdoc function
 * @name projSemApp.controller:bubbleCtrl
 * @description
 * # bubbleCtrl
 * Controller of the projSemApp
 */
angular.module('projSemApp')
  .controller('bubbleCtrl', function($scope,$rootScope,bubbleFactory){
    $scope.bubbles= bubbleFactory.getBubbles().then(function (bubbles) {
        $scope.bubbles=bubbles.data;
      },function (msg) {
        alert(msg);
      }
    );


    $rootScope.handleClick = function(lang) {
      $rootScope.$broadcast('majLang', { message: lang});
    };

/*    $scope.maj=Fact.setLang("Eng");

    console.log($scope.maj);*/
  });

/*
angular.module('projSemApp').factory('Fact', function(){
  var factory={
    lang:false,
    getLang: function () {
      return factory.lang;
    },
    setLang: function (lang) {
      factory.lang=lang;
    },
  }
  return factory;
});*/
