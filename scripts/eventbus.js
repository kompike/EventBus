var EventBus = function(){

	var _subscribers = {};
	
	var _post = function(eventType, someEvent) {
			
		var eventTypeSubscribers = _subscribers[eventType];
		
		if (typeof (eventTypeSubscribers) === 'undefined' || eventTypeSubscribers.length === 0) {
			
			console.log("Subscribers not found!");
			
		} else {
			
			for (var i = 0; i < eventTypeSubscribers.length; i++) {
				
				var callback = function(callbackIndex) {
					
					setTimeout(function() {
					
						var currentCallback = eventTypeSubscribers[callbackIndex];
						
						currentCallback(someEvent);
						
					}, 0);
					
				}
				
				callback(i);				
			}
		}	
	};
	
	var _subcribe = function(eventType, callback) {
		
		if (typeof (_subscribers[eventType]) === 'undefined') {
			
			_subscribers[eventType] = [];
			
		}
		
		if (typeof (callback) === 'function') {
			
			_subscribers[eventType].push(callback);
			
		} else {
			
			console.log("Callback must be function");
			
		}		
	};
	
	return {
		"post": _post, 
		"subscribe": _subcribe
	};
}

define(function() {
	return EventBus;
});