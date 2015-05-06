
app.directive('mysiteApp', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'views/directive_mySite.html' 
  }; 
});
