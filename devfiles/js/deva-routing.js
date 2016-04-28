deva.config(['$routeProvider','$provide',function($routeProvider,$provide){
    
    $routeProvider
        .when('/home', {templateUrl:'html/home.html'})
        .when('/quis-suis-je',  {templateUrl:'html/quisuisje.html'})
        .when('/cours',  {controller:'coursesCRUDCtrl',templateUrl:'html/cours.html'})
        .when('/messoins',  {templateUrl:'html/nosoins.html'})
        .when('/contact',  {controller:'contactCtrl',templateUrl:'html/contact.html'})
        .when('/gestion/cours', {controller:'coursesCRUDCtrl',templateUrl:'html/gestion/cours.html'})
        .when('/gestion/login', {controller:'loginCtrl', templateUrl:'html/gestion/login.html'})
        .otherwise({redirectTo: '/home'});
    
    $provide.decorator('taOptions', ['$delegate', function(taOptions) { // $delegate is the taOptions we are decorating
                    

    taOptions.toolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
      ['insertLink']
  ];
        
        return taOptions;
        
    }]);

}]);