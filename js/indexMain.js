define([
    'underscore',
    'backbone'
],function(_, backbone){
    var model = _.extend({}, backbone.Events);
    var view = _.extend({}, backbone.Events);
    var view1 = _.extend({}, backbone.Events);

    view.listenTo(model, 'custom_event', function(){
        console.log('view');
    });

    view1.listenTo(model, 'custom_event', function(){
        console.log('view1');
    });


    model.trigger('custom_event');
});

//总结
//view视图，view1视图，监听model模型上custom_event事件
//
//
//Backbone.Events就是事件实现的核心，它可以让对象拥有事件能力

//listenTo: function(obj, name, callback)
//使当前对象侦听obj对象的一个叫name的事件，当事件被触发后，回调callback


//trigger: function(name)
//当前对象触发name事件