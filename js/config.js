var require = {
    baseUrl:'js',
    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'Backbone': 'lib/Backbone',
    },
    // shim:{
    //     'backbone': ['jquery', 'underscore']
    // },
    shim : {
        Backbone : {
            exports : 'Backbone'
        }
    }
};