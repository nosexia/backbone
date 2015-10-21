define([
    'underscore',
    'backbone'
],function(_, backbone){
    var person = {
        name: 'nose'
    };
    var MyModel = backbone.Model.extend({
        //验证通过需要返回false
        validate: function(attr, options){
            if(attr.name == 'nose'){
                return false;
            }else{
                return '参数不对';
            }
        }
    });

    var MyView = backbone.View.extend({
        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'invalid', this.invalid);         
        },
        render: function(){
            console.log(this.model.toJSON());
        },
        invalid: function(){
            console.log(arguments[1]);              //参数不对
        }        
    });

    var myModel = new MyModel();
    var myView = new MyView({
        model: myModel
    });
    myModel.set({'name': 'nose1'}, {validate:true});

});

//接到模型数据后，
//必须对模型数据进行验证，
//1.myModel.set({'name': 'nose1'}, {validate:true});, 需要加入第三个参数{validate: true}
//在Model中加入validate属性，对数据进行验证，通过了触发'trigger'事件， 否则触发 'invalid', 让触发的事件更加清楚
//






