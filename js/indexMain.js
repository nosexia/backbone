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


//myModel.set(person) => this.trigger('change', this, options);




