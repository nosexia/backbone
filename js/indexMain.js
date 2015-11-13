define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, backbone){


    var AppRouter = Backbone.Router.extend({
        routes:{
            ':cate/:code': 'hsOper',
            ':cate/:code': 'hkOper'
        },
        hsOper: function(cate, code){
            console.log(cate + "||" + code);
        },

        hkOper: function(cate, code){
            console.log(cate + '||' + code);
        }
    });

    // 
    var router = new AppRouter();
    //监听,启动路由变化
    Backbone.history.start();
});






