deva.factory('sendEmailFactory', ['$http',function($http){
	var url = 'api/json.api?www-command=users-sendemail';
	return {
		sendEmail: function(person) {
		return $http.post(url, person);
		}
		};
	
}]);

deva.factory('userAuthFactory', ['$http', function($http){
	var url = 'api/json.api?www-command=';
	
	return {
	checkLogin: function(user) {
	return $http.post(url+"users-checklogin", user);
	},
	logout: function() {
	return $http.get(url+"users-logout");
	},
	getUser: function()
	{
		return $http.get(url+"users-get");
	}
	};
	}]);


deva.factory('courseFactory', function ($http) {
	var url = 'api/json.api?www-command=';

    return {
        getCourses: function () {
            return $http.get(url+"courses-all");
        },
        addCourse: function (course) {
            return $http.post(url+"courses-add", course);
        },
        deleteCourse: function (course) {
            return $http.delete(url+"courses-delete&id="+course.id);
        },
        updateCourse: function (course) {
            return $http.put(url+"courses-update&id=" + course.id, course);
        }
    };
});