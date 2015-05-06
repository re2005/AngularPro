var app = angular.module('angularPro', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'firebase'
]);


app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'views/home.html', reloadOnSearch: false});
  $routeProvider.when('/scroll',        {templateUrl: 'views/scroll.html', reloadOnSearch: false}); 
  $routeProvider.when('/toggle',        {templateUrl: 'views/toggle.html', reloadOnSearch: false}); 
  $routeProvider.when('/tabs',          {templateUrl: 'views/tabs.html', reloadOnSearch: false}); 
  $routeProvider.when('/accordion',     {templateUrl: 'views/accordion.html', reloadOnSearch: false}); 
  $routeProvider.when('/overlay',       {templateUrl: 'views/overlay.html', reloadOnSearch: false}); 
  $routeProvider.when('/forms',         {templateUrl: 'views/forms.html', reloadOnSearch: false});
  $routeProvider.when('/dropdown',      {templateUrl: 'views/dropdown.html', reloadOnSearch: false});
  $routeProvider.when('/drag',          {templateUrl: 'views/drag.html', reloadOnSearch: false});
  $routeProvider.when('/carousel',      {templateUrl: 'views/carousel.html', reloadOnSearch: false});
});


//
// Another `$drag` usage example: this is how you could create 
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function(){
  return {
    restrict: 'C',
    scope: {},
    controller: function($scope) {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function(){
        var newId = this.itemCount++;
        this.activeItem = this.itemCount == 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem == this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();
      
      var zIndex = function(){
        var res = 0;
        if (id == carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(n, o){
        elem[0].style['z-index']=zIndex();
      });
      

      $drag.bind(elem, {
        constraint: { minY: 0, maxY: 0 },
        adaptTransform: function(t, dx, dy, x, y, x0, y0) {
          var maxAngle = 15;
          var velocity = 0.02;
          var r = t.getRotation();
          var newRot = r + Math.round(dx * velocity);
          newRot = Math.min(newRot, maxAngle);
          newRot = Math.max(newRot, -maxAngle);
          t.rotate(-r);
          t.rotate(newRot);
        },
        move: function(c){
          if(c.left >= c.width / 4 || c.left <= -(c.width / 4)) {
            elem.addClass('dismiss');  
          } else {
            elem.removeClass('dismiss');  
          }          
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(c, undo, reset) {
          elem.removeClass('dismiss');
          if(c.left >= c.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          } else if (c.left <= -(c.width / 4)) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          reset();
        }
      });
    }
  };
});

