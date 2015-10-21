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
            //第三个参数this为this.render中的this
            //this.model.on('change', this.render, this);
            this.listenTo(this.model, 'change', this.render);
        },
        render: function(){
            console.log(this.model.toJSON());
        }        
    });

    var myModel = new MyModel();
    var myView = new MyView({
        model: myModel
    });
    myModel.set(person);

});



//this.model.on('change', this.render, this)  ==>this.listenTo(this.model, 'change', this.render);





