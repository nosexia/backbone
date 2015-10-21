define([
    'underscore',
    'backbone'
],function(_, backbone){
    var SampleView = function(){

    };

    var SampleModel = function(){

    };
    var events = backbone.Events;

    _.extend(SampleView.prototype, events);
    _.extend(SampleModel.prototype, events);
    var sampleView = new SampleView();
    var sampleModel =new SampleModel();

    sampleView.listenTo(sampleModel, 'custom_event', function(){
        console.log('sampleView');
    });

    sampleModel.trigger('custom_event');
});

//自定义SampleView类，events事件方法扩展SampleView.prototype
//自定义SampleModel类， events事件方法扩展SampleModel.prototype
