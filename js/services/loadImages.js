app.factory('loadImages', ['$http', function($http) { 
  return $http.get('http://jsonip.com/') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);