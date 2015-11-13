 //监听路由变化
Backbone.history.start();


// Start the hash change handling, returning `true` if the current URL matches
// an existing route, and `false` otherwise.
start: function(options) {
  if (History.started) throw new Error("Backbone.history has already been started");
  History.started = true;

  // Figure out the initial configuration. Do we need an iframe?
  // Is pushState desired ... is it available?
  // this.options = {root: '/'}
  this.options          = _.extend({}, {root: '/'}, this.options, options);
  // this._wantHashChange = true;
  this._wantsHashChange = this.options.hashChange !== false;
  // false
  this._wantsPushState  = !!this.options.pushState;
  // false
  this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);

  //获取不带#hash值
  var fragment          = this.getFragment();
  //underfined
  var docMode           = document.documentMode;
  // false
  var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

  if (oldIE) {
    this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
    this.navigate(fragment);
  }

  // Depending on whether we're using pushState or hashes, and whether
  // 'onhashchange' is supported, determine how we check the URL state.
  if (this._hasPushState) {
    $(window).bind('popstate', this.checkUrl);
  } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
    // 监听hashchange事件， this.checkUrl函数
    $(window).bind('hashchange', this.checkUrl);
  } else if (this._wantsHashChange) {
    this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
  }

  // Determine if we need to change the base url, for a pushState link
  // opened by a non-pushState browser.
  // 记录当前的url片段
  this.fragment = fragment;
  var loc = window.location;
  // 判断loc.pathname是否为'/'
  var atRoot  = loc.pathname == this.options.root;

  // If we've started off with a route from a `pushState`-enabled browser,
  // but we're currently in a browser that doesn't support it...
  if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
    this.fragment = this.getFragment(null, true);
    window.location.replace(this.options.root + '#' + this.fragment);
    // Return immediately as browser will do redirect to new url
    return true;

  // Or if we've started out with a hash-based route, but we're currently
  // in a browser where it could be `pushState`-based instead...
  } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
    this.fragment = this.getHash().replace(routeStripper, '');
    window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
  }
  // 如果设置silent属性， this.loadUrl不会被加载
  // 初始化调用callback,在loadUrl
  if (!this.options.silent) {
    return this.loadUrl();              //return true
  }
},




loadUrl: function(fragmentOverride) {
  // fragment = '';
  var fragment = this.fragment = this.getFragment(fragmentOverride);

  //this.handlers = {route: route, callback: callback}
  var matched = _.any(this.handlers, function(handler) {
    // handler.route = /^(.*?)$/, 匹配除了'\n'之外的任意字符串
    if (handler.route.test(fragment)) {
      //执行回调函数，fragment做为回调函数的参数  
      handler.callback(fragment);
      return true;
    }
  });
  return matched;
},


getFragment: function(fragment, forcePushState) {
  if (fragment == null) {
    if (this._hasPushState || forcePushState) {
      fragment = window.location.pathname;
      var search = window.location.search;
      if (search) fragment += search;
    } else {
      //hash值  ''
      fragment = this.getHash();
    }
  }
  if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
  return fragment.replace(routeStripper, '');
},



    getHash: function(windowOverride) {
      var loc = windowOverride ? windowOverride.location : window.location;
      var match = loc.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },


    // Cached regex for cleaning leading hashes and slashes .
    var routeStripper = /^[#\/]/;

    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.getHash(this.iframe));
      if (current == this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

