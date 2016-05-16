define([
    'jquery',
    'underscore',
    'Backbone'
],function($, _, Backbone){
    var MyView = Backbone.View.extend({
        initialize: function(){
            this.model.on('change', this.render, this.model);
        },
        render: function(){
            console.log(this.toJSON());
        }
    });

    var obj = {name: 'nose'};

    var MyModel = Backbone.Model.extend({
        fetch: function(){
            this.set(obj);
        }
    });

    var myModel = new MyModel();
    var myView = new MyView({
        model: myModel
    });

    myModel.fetch();

});



//模拟监听者模式








