deva.controller('menuCtrl',['$scope','$location',function($scope,$location){
    
    $scope.isRouteActive = function(route){
        
        var curRoute = $location.path();
        return curRoute.match(route);
    };
    
}]);


//TO DO 
deva.controller('userAuthCtrl', ['$scope','$location','$rootScope','userAuthFactory',function($scope,$location,$rootScope,userAuthFactory){
    
   
    userAuthFactory.getUser().success(function(result){
        
        $scope.userIsLoggedIn = result.success;
   
        console.log(result.success);
        $rootScope.$on('$locationChangeSuccess', function(event){
        
        var url = $location.url();
        console.log($scope.userIsLoggedIn);
        if($scope.userIsLoggedIn)
        {
            console.log($scope.userIsLoggedIn);
            $scope.userIsLoggedIn = true;
        }

    });
    
    });
    
      
}]);

deva.controller("loginCtrl", ['$scope','userAuthFactory','$location','$route',function($scope,userAuthFactory,$location,$route) {
	
		$scope.loginCredentials = [];
		    
	     $scope.submit = function () {
		    	userAuthFactory.checkLogin($scope.user)
                    .success(function(result){
                    if(result.error)
                    {
                        console.log("Hello" + result.error);
                    }
                    else
                    {
                        console.log("Hello" + result.error);
                        $location.path('/gestion/cours');
                        $route.reload();
                    }
		    	     })
                    .error(function(result,status){
                    
                        console.log(result);
                    
                });
		    };
}]);

deva.controller('coursesCRUDCtrl',['$scope','$location','courseFactory','userAuthFactory', function($scope,$location,courseFactory,userAuthFactory){
   
   $scope.editMode = false;
   
   $scope.clearForm = function()
   {
        $scope.newcourse = {};
        $scope.newcourse.title = '';
        $scope.newcourse.date = '';
        $scope.newcourse.description = ''; 
        $scope.editMode = false;
   };
    
    var getCourseData = function(){
        
        return courseFactory.getCourses()
        .success(function(result){
        
        $scope.courses = result;
        $scope.clearForm();

    })
        .error(function(data,status){
       
        console.log(data);
    });
    };
    
    getCourseData();  
    $scope.clearForm();
   
    
    
    $scope.addCourse = function()
    {
        var date = new Date();
        $scope.insertTitle = "Veuillez insérer un titre.";
        $scope.showTitleError = false;
        $scope.insertDescription = "Veuillez insérer une description.";
        $scope.showDescriptionError = false;
        
        $scope.revealTitleError = function()
        {
            $scope.showTitleError = true;
        };
        
        $scope.revealDescriptionError = function()
        {
            $scope.showDescriptionError = true;
        };
        
        if(($scope.newcourse.title !== "") && ($scope.newcourse.description !== ""))
        {
            $scope.newcourse.created = date;
            courseFactory.addCourse($scope.newcourse)
           .success(function(result){

               $scope.courses = result;
               $scope.clearForm();
               date = '';
               $scope.showTitleError = false;
               $scope.showDescriptionError = false;
               getCourseData();
               $scope.dismiss();

           })
           .error(function(data,status){

               console.log(data);
           });
       }
       else if($scope.newcourse.title === "")
       {
           $scope.revealTitleError();
       }
       else if($scope.newcourse.description === "")
       {
           $scope.revealDescriptionError();
       }
       else
       {
           $scope.revealTitleError();
           $scope.revealDescriptionError();
       }
    };
    
    $scope.editCourse = function(course){
      
        $scope.editMode = true;
        $scope.newcourse.title = course.title;
        $scope.newcourse.date = course.date;
        $scope.newcourse.description = course.description;
        $scope.newcourse.id = course.id;
        $scope.newcourse.created = course.created;
        console.log($scope.newcourse);
    };
    
    $scope.updateCourse = function()
    {
              
        courseFactory.updateCourse($scope.newcourse)
        .success(function(result){
            $scope.courses = result;
            $scope.clearForm();
            $scope.dismiss();
            getCourseData();
            $scope.editMode = false;
            
        })
        .error(function(data,status){
            
            console.log(data);
        });
        
    };
    
    $scope.deleteCourse = function(course)
    {
        var deleteC = confirm('Êtes-vous sur de vouloir supprimer ce cours?');   
       
    	if (deleteC) 
        {
        	courseFactory.deleteCourse(course)
                .success(function(result){
                
                $scope.courses = result;
                getCourseData();
                
            }).error(function(data,status){
            
            console.log(data);
        });
        }
        
    };
    
    
    $scope.logout = function()
    {
        userAuthFactory.logout();
        $location.path('gestion/login');
    };
}]);

deva.controller('contactCtrl',['$scope','uiGmapGoogleMapApi', function($scope,uiGmapGoogleMapApi){

    uiGmapGoogleMapApi.then(function(map){
    
      //var boxText = {};
      //boxText.style.cssText = "border: 1px solid black; ";

      var output = '<div id="mapInfo" >'+
      '<div class="col-xs-12">' +
      '<img src="img/logo.png" alt="Logo" class="img-responsive"/>' +
      '<div>' +
      '<p class="address">' +
      '<br>' +
      'Rue Baptiste-Savoye 36<br>' +
      'CH-2610 Saint-Imier<br>' +
      ' Suisse </p><br>' +
      '<p class="address">' +
      '<i class="fa fa-phone"></i>&nbsp;&nbsp;<span>t&eacute;l : 079 543 68 07</span><br>' +
      '<i class="fa fa-envelope"></i><span>&nbsp;<a href="mailto:info@institutdeva.ch" onmouseover="this.href=this.href.replace(/x/g,\'\');">info@institutdeva.ch</a></span> </p> </div> </div></div>';     

      //boxText.innerHTML = output;
    
    
    $scope.show = true;
    $scope.coords = {
        latitude: 47.1504355,
        longitude: 6.9930737
    };

    $scope.windowOptions = {
        boxClass: "infobox",
        boxStyle: {
            border: "1px solid #6A3488",
            borderRadius: "5px",
            background: "#FFF",
            opacity: 1,
            width: "200px",
            textAlign:"center"
        },
        content: output,
        pane: "floatPane",
        enableEventPropagation: false
    };

    $scope.mapOptions = {
        center: {
            latitude: 47.1504355,
            longitude: 6.9930737
        },
        zoom: 17
    };
});
    
}]);

deva.controller("emailCtrl", ['$scope','sendEmailFactory',function ($scope,sendEmailFactory) {
	
	 $scope.messageSuccess = false;
	 $scope.emptyForm = false;
	 $scope.novalidForm = false;
	 $scope.submitted = false;
	 $scope.email = function () {
		 
		 if ($scope.emailForm.$valid) {
			 sendEmailFactory.sendEmail($scope.person)
	    		.success(function(){
	    			$scope.messageSuccess = false;
	    			$scope.person = {};
	    			$scope.messageSuccess = true;
	    			 $scope.emptyForm = false;
	    			 $scope.novalidForm = false;
	    		})
	    		.error(function(){ 
	    			console.log("Email not send");});
		    } else {
		    	$scope.messageSuccess = false;
		      if($scope.person === null)
		      {
		    	  $scope.emptyForm = true;
		    	  $scope.errorMessage = "Aucun champ n'a été rempli!";
		    	  $scope.emailForm.submitted = false;
		      }
		      else
		      {
		    	  $scope.messageSuccess = false;
		    	  $scope.emailForm.submitted = true;
		    	  $scope.emptyForm = true;
		    	  $scope.errorMessage = "Merci de vérifiez que vous avez entré votre nom, votre email et votre message.";
		      }
		    }
	    	
	    };
	
}]);