var myRouter = Backbone.Router.extend({
    routes:{
        '*other': 'defaultOper',
        ':cate/:id': 'assignOper'
    }
});


//路由最后是对所有的路由规则，和当前的hash值做循环匹配
//
//*other对应的路由  /^(.*?)$/            hash值'all', 匹配成功，执行对应callback
//':cate/:id'   ->  /^[^\/]+)/[^\/]+)$/  hash值':hk/:000002'   匹配成功  指向对应callback
//
//
//注意点，路由有先后顺序，匹配及最高的放在最前面，匹配成功return true,循环结束

//    loadUrl: function(fragmentOverride) {
var fragment = this.fragment = this.getFragment(fragmentOverride);
  var matched = _.any(this.handlers, function(handler) {        
    if (handler.route.test(fragment)) {
      handler.callback(fragment);
      return true;
    }
  });
  return matched;
},