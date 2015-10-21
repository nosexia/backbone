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
        initialize: function(){
            this.listenTo(this.model, 'change:name', this.renderName);      //某个属性改变时，需要渲染
            this.listenTo(this.model, 'change:age', this.renderAge);       
        },
        renderName: function(){
            console.log('变化name情况');
        },
        renderAge: function(age,age1,age3){
            console.log('变化age情况');
        } 
    });

    var myModel = new MyModel();
    var myView = new MyView({
        model: myModel
    });
    

    $(document).click(function(){
        myModel.set(person);
    });

    $('.u-name').click(function(e){
        person.name = new Date().getTime();  
        e.stopPropagation();
    });

    $('.u-age').click(function(e){
        person.age = new Date().getTime();
        e.stopPropagation();
    });
});

//监听模型里指定属性值变化





