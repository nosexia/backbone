
// **parse** converts a response into a list of models to be added to the
// collection. The default implementation is just to pass it through.
parse: function(resp, options) {
    return resp;
},

//parse方法扩展到Model.prototype




// Backbone **Models** are the basic data object in the framework --
// frequently representing a row in a table in a database on your server.
// A discrete chunk of data and a bunch of useful, related methods for
// performing computations and transformations on that data.

// Create a new model with the specified attributes. A client id (`cid`)
// is automatically generated and assigned for you.
var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    //创建唯一的cid
    this.cid = _.uniqueId(this.cidPrefix);
    //默认值是attributes
    this.attributes = {};
    //定义this.collection 指向 options.collection
    if (options.collection) this.collection = options.collection;

    //@todo 暂时不清楚
    if (options.parse) attrs = this.parse(attrs, options) || {};

    //@todo
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));


    this.set(attrs, options);
    this.changed = {};

    //初始化执行initialize方法
    this.initialize.apply(this, arguments);
};


