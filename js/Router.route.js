  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    //实例化Router时，如果有routes参数, 覆盖extend中routes参数
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };



    // 解析当前实例定义的路由(this.routes)规则, 并调用route方法将每一个规则绑定到对应的方法
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        //把route, this.routes[route]放入routes中
        //这里 this.routes = {'*other', 'defaultOper'};
        routes.unshift([route, this.routes[route]]);
        //routes = [ ['*other', 'defaultOpen']]     //routes二维数组
      }

      // 
      for (var i = 0, l = routes.length; i < l; i++) {
        //routes[i][0], 匹配规则
        //routes[i][1]  规则对应的函数名
        //this[routes[i][1]]  函数名对应的函数
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },


    // 将一个路由规则绑定给一个监听事件, 当URL片段匹配该规则时, 会自动调用触发该事件
    route: function(route, name, callback) {
        Backbone.history || (Backbone.history = new History);
        //route为正则 /^(.*?)$/
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);
        if (!callback) callback = this[name];
        // route为'*other'
        // 
        Backbone.history.route(route, _.bind(function(fragment) {
            var args = this._extractParameters(route, fragment);
            //初始化，执行了当前fragment时，路由情况
            callback && callback.apply(this, args);

            this.trigger.apply(this, ['route:' + name].concat(args));
            Backbone.history.trigger('route', this, name, args);
        }, this));

        return this;
    },


//Backbone.history.route
//指向
route: function(route, callback) {
  // this.handlers默认为[]  
  this.handlers.unshift({route: route, callback: callback});
},



