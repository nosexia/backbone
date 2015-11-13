//分析不同的route字符转化后，对应正则
//'*other' - > /(.*?)/          必须有'*'字符，



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