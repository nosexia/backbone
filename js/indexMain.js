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
            this.listenTo(options.model, 'change', this.render);            //用options.model替换this.model
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

/*var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
};*/

//实例化时，会调用初始化方法，
//this.initialize.apply(this, auguments);
//实例化的实参传给initialize方法的形参





