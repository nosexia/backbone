var require = {
    baseUrl:'js',
    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone'
    },
    shim:{
        'backbone': ['jquery', 'underscore']
    }
};