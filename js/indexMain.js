define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, backbone){


    var AppRouter = Backbone.Router.extend({
        routes:{
            '*other': 'defaultOper'
        },
        defaultOper: function(value){
            console.log(decodeURIComponent(value));
        }
    });

    // 
    var router = new AppRouter();
    //监听,启动路由变化
    Backbone.history.start();
});






