## 分析Backbone的观察者模式主流程实现
#### 得清楚Backbone是直接定义在this全局下面的，在amd模式下需要配置
```scripts
var require = {
    shim : {
        Backbone : {
            exports : 'Backbone'
        }
    }
}

类似于

define(['module', 'exports', 'backbone'], function(){
    module.exports.Backbone = window.Backbone;
})

```


### 不多说，以下是入口文件 Follow me
```scripts
define([
    'jquery',
    'underscore',
    'Backbone'
],function($, _, Backbone){
    var MyView = Backbone.View.extend({
        initialize: function(){
            // 主要是在模型上面绑定'_callbacks'属性
            this.model.on('change', this.render, this.model);
        },
        render: function(){
            console.log(this.toJSON());
        }
    });

    var obj = {name: 'nose'};

    var MyModel = Backbone.Model.extend({
        fetch: function(){
            // 给模型设置数据,最后会调用this.trigger('change', this, obj);
            this.set(obj);
        }
    });

    var myModel = new MyModel();
    var myView = new MyView({
        model: myModel
    });
    // 调用实例的fetch方法
    myModel.fetch();

});

// 模型上面绑定_callbacks属性
this._callbacks = {
    change : {
        tail :{},
        next : {
            next : this.tail,
            context : this.model    // 模型
            backback : backback     //  回调函数
            
        }
    }
}

```

#### 此处说明，把Events所有的方法都扩展都Model原型上面（包括trigger方法）
```scripts
_.extend({
    Model.prototype, Events, {
        changed : null...
    }
})

```

### 分析this.trigger调用, 源码如下
```scripts
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      // 在监听的时候，会出现this._backbacks = {'change' : tail: tail, next: node}
      ## 这里的calls引用this._callbacks
      if (!(calls = this._callbacks)) return this;
      all = calls.all;
      // events = ['change']
      events = events.split(eventSplitter);
      // rest = [this, {name: 'nose'}];
      rest = slice.call(arguments, 1);

      // For each event, walk through the linked list of callbacks twice,
      // first to trigger the event, then to trigger any `"all"` callbacks.
      while (event = events.shift()) {
        if (node = calls[event]) {
        // node.tail是一个空对象
          tail = node.tail;
          while ((node = node.next) !== tail) {
            // node.backback为模型改变后的回调函数this.render
            node.callback.apply(node.context || this, rest);
          }
        }
        if (node = all) {
          tail = node.tail;
          args = [event].concat(rest);
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, args);
          }
        }
      }

      return this;
    }
```





