define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, backbone){
    $('input').click(function(){
        window.location.hash = encodeURIComponent( '/name/夏振华' );
    });

    var AppRouter = Backbone.Router.extend({
        routes:{
            '*other': 'defaultOper'
        },
        defaultOper: function(value){
            console.log(value);
            //console.log(decodeURIComponent(value));
        }
    });

    // 
    var router = new AppRouter();
    Backbone.history.start();
});





