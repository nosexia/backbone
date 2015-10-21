define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, backbone){
    var person = {
        name: 'nose',
        age: 23
    };
    var MyModel = backbone.Model;

    var MyView = backbone.View.extend({
        initialize: function(options){
            this.listenTo(this.model, 'change', this.render);            //用options.model替换this.model
        },
        render: function(){
            console.log('渲染所有');
        }
    });

    var myModel = new MyModel();
    var myView = new MyView({
        model: myModel
    });

    myModel.set(person);

});

// _.extend(View.prototype, Events, {})
// View.prototype扩展了Events对象，
// Backbone.View实例，可以调用listenTo方法,

// _.extend(Model.prototype, Events, {
// Backbone.Model实例，调用Events对象方法

//_.extend(Collection.prototype, Events, {
//Backbone.Model实例，调用Events对象方法



