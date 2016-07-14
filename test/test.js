define = require('node-requirejs-define');

var EventBus = require('../scripts/eventBus');

var test = require('unit.js');

var eventBus = new EventBus();

var firstSubscriberExpectedEvent = "firstData";
var secondSubscriberExpectedEvent = "secondData";

var firstEventDelivered = {
	"delivered":false,
	"subscriberCounter":0
};

var secondEventDelivered = {
	"delivered":false,
	"subscriberCounter":0
};

var thirdEventDelivered = {
	"delivered":false,
	"subscriberCounter":0
};
		
var firstSubscriber = function(currentEvent) {
	
	firstEventDelivered.delivered = (currentEvent == firstSubscriberExpectedEvent);
		
	firstEventDelivered.subscriberCounter++;
}

var secondSubscriber = function(currentEvent) {
	
	secondEventDelivered.delivered = (currentEvent == secondSubscriberExpectedEvent);
	
	secondEventDelivered.subscriberCounter++;
}

eventBus.subscribe("first", firstSubscriber);
eventBus.subscribe("first", firstSubscriber);
eventBus.subscribe("second", secondSubscriber);

eventBus.post("second", "secondData");
eventBus.post("first", "firstData");
eventBus.post("third", "fakeData");

//

describe('Testing event bus functionality', function(){
	
	it('Event bus successfully created', function(){
		setTimeout((function(){
			test
			.object(eventBus)
				.isNotEmpty()
				.hasProperty("subscribe")
				.hasProperty("post");			
		})(), 2000);
    });
	
	it('First event subscription', function(){
		
		setTimeout((function(){
			test
				.bool(firstEventDelivered.delivered)
					.isTrue()
				.number(firstEventDelivered.subscriberCounter)
					.is(2);
		})(), 2000);
	  
	});
	
	it('Second event subscription', function(){
		setTimeout((function(){
			test
				.bool(secondEventDelivered.delivered)
					.isTrue()
				.number(secondEventDelivered.subscriberCounter)
					.is(1);		
		})(), 2000);
	});
	
	it('Fake event subscription', function(){
		setTimeout((function(){
			test
				.bool(thirdEventDelivered.delivered)
					.isFalse()
				.number(thirdEventDelivered.subscriberCounter)
					.is(0);		
		})(), 2000);
	});
});