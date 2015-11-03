define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, backbone){
    $('input').click(function(){
        //路由中有中文情况，encodeURIComponent转义
        window.location.hash = encodeURIComponent( '/name/夏振华' );
    });

    var AppRouter = Backbone.Router.extend({
        routes:{
            '*other': 'defaultOper'
        },
        defaultOper: function(value){
            console.log(decodeURIComponent(value));
        }
    });

    var router = new AppRouter();

    //backbone.history.start();
});

//路由器第一步
//自定义路由器类
//实例化自定义路由器
//启用路由功能backbone.history.start()



