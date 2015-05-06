app.factory('loadImages', ['$http', function($http) { 
  return $http.get('http://jsonip.com/') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);


app.factory('mySite', ['$http', function($http) { 
  var url = "http://www.notfound.com.br/?feed=json&jsonp=";
  //var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=city&format=json";
  //var url = "http://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json?feed=json&jsonp=data"
  //var url = "http://www.eso.org/public/images/feed/";
  return $http.get(url) 
            .success(function(data) { 
              return data;
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);
