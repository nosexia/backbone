//分析不同的route字符转化后，对应正则
//':hk/000001'  对应正则    /^([^\/]+)/000001$/  
//':hk/:000001' 对应正则    /^(([^\/]+)/([^\/]+))$/;
//
//':hk/:000001'.exec(fragment).slice(1);



if (!_.isRegExp(route)) route = this._routeToRegExp(route);


  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

// Convert a route string into a regular expression, suitable for matching
// against the current location hash.
_routeToRegExp: function(route) {
  route = route.replace(escapeRegExp, '\\$&')
               .replace(namedParam, '([^\/]+)')
               .replace(splatParam, '(.*?)');
  return new RegExp('^' + route + '$');
},


//一个数组中包含两个参数

// Given a route, and a URL fragment that it matches, return the array of
// extracted parameters.

// route为 /^([^\/]+)\/([^\/]+)$/
// fragment ":hs/:000001"
_extractParameters: function(route, fragment) {
  debugger;
  return route.exec(fragment).slice(1);             //[':hk', ':000001']
}