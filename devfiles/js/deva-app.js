
var deva = angular.module('devaApp',['ngRoute','ngSanitize','ngResource','textAngular','720kb.datepicker','uiGmapgoogle-maps']);


deva.directive('myModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {
           element.modal('hide');
       };
     }
   }; 
});