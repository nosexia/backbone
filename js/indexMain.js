define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, backbone){


    var AppRouter = Backbone.Router.extend({
        routes:{
            'hs*other': 'hsOper',
            'hk*other': 'hkOper'
        },
        hsOper: function(value){
            console.log(value);
        },

        hkOper: function(value){
            console.log(value);
        }
    });

    // 
    var router = new AppRouter();
    //监听,启动路由变化
    Backbone.history.start();
});






