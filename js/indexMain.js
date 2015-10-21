define([
    'underscore',
    'backbone'
],function(_, backbone){
    var person = {
        name: 'nose'
    };
    var MyModel = backbone.Model;

    var MyView = backbone.View.extend({
        initialize: function(){
            this.model.on('change', this.render, this);
        },
        render: function(){
            console.log(this.model.toJSON());
        }        
    });

    var myModel = new MyModel();
    var myView = new MyView({
        model: myModel
    });
    //myModel.trigger('change', person);
    myModel.set(person);



});

//实现简单版，myModel, myView
//myModel.set(person)       --->myModel.trigger('change', person)
//this.model.on('change', this.render, this) 