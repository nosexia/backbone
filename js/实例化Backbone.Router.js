  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

    //this.routes = options.routes  
    
    _bindRoutes: function() {
      if (!this.routes) return;   
      //this上面有routes属性时          
      this.routes = _.result(this, 'routes');
      //route , routes为this.routes中所有的属性名，是一个数组
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {

        this.route(route, this.routes[route]);
      }
    },


    // backbone实例化时，也会执行初始化函数
    this.initialize.apply(this, arguments)


