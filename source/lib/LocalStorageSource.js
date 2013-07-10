

/*** 
 Simple implementation of LocalStorage for enyo.Store
 TODO:
	- commit: 	save
	- fetch: 	get a record
	- destroy: 	destroy specified record
	- options: onSuccess and onError callbacks
**********/
(function() {

// Generate four random hex digits.
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

enyo.kind({
	name: "PrayerList.localSource",
	kind: "enyo.Source",

	// Options: {keyprefix, success, error}
	// Keyprefix will be used instead of model's kindName as a prefix for record key
	commit: function (model,options) { 
		var key, keyprefix;
		if (!model.id) {
			model.id = guid();
		}
		if (options && options.keyprefix) {
			key = options.keyprefix + ":" + model.id;
		} else {
			key = model.get("kindName") + ":" + model.id;
		}
		localStorage.setItem(key, model.toJSON());
		// if (options && options.success) {
		// 	if (enyo.isFunction(options.success)) {
		// 		options.success(model);
		// 	}
		// }
	},
	
	fetch: function (model,options) { 
		var result, key, keyprefix;

		if (enyo.isFunction(model.model)) {
			// model is a collection
			var result = [];
			if (options && options.keyprefix) {
				key = options.keyprefix + ":" + model.id;
			} else {
				var m = new model.model()
				keyprefix = m.get("kindName");
			}
			// For a collection we iterate through all the items in localStorage
			for (var key in localStorage) {
				if (key.substring(0, key.indexOf(":")) === keyprefix) {
					result.push(JSON.parse(localStorage.getItem(key))) 
				}
			}
		} else {
			if (options && options.keyprefix) {
				key = options.keyprefix + ":" + model.id;
			} else {
				key = model.get("kindName") + ":" + model.id;
			}
			result = localStorage.getItem(key); 
		}

		if(typeof result === "object" && result !== null) {
			// This is hopefully the results for Collection fetch
			if (($fn = this["didFetch"])) {
				if (enyo.isFunction($fn)) {
					if (!$fn.call(this, options, result)) {
						return;
					}
				}
			}
			if (options && options.success) {
				if (enyo.isFunction(options.success)) {
					options.success(result);
				}
			}
		} else if(typeof result === "string"){
			if (options && options.success) {
				if (enyo.isFunction(options.success)) {
					options.success(JSON.parse(result));
				}
			}
			return JSON.parse(result);
		} else if(typeof result === "undefined" || result === null){
			if (options && options.error) {
				if (enyo.isFunction(options.error)) {
					options.error({message:"ERROR: [localStorage]: getItem returned a falsey value. Should be a string."});
				}
			}
		}
	},
	
	destroy: function (model,options) { 
		var key, keyprefix;

		if (options && options.keyprefix) {
			key = options.keyprefix + ":" + model.id;
		} else {
			key = model.get("kindName") + ":" + model.id;
		}
		localStorage.removeItem(key);
		if (options && options.success) {
			if (enyo.isFunction(options.success)) {
				options.success(model);
			}
		}
	},
});

})();

/************	NOTES:
	======
	Get items with specified key-prefix:

	for (var k in localStorage) { if (k.substring(0,k.indexOf(":")) === "one.UserModel") console.log(localStorage.getItem(k)) }

*******/