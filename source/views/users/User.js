enyo.kind({
	name: "Foreplot.User",
	kind: "Component",
	published: {
		name: null,
		email: null,
		avatar: null,
		location: null,
		bio: null,
		id: null
	},
	events: {
		onResults: ""
	},
	url: "http://localhost:3000/current_user.json",
	create: function() {
		this.inherited(arguments);
		this.fetch(this.url);
	},
	fetch: function(url, params) {
		var req;
		if (window.location.protocol === "ms-appx:") {
			params.nojsoncallback = 1;
			// Use ajax for platforms with no jsonp support (Windows 8)
			req = new enyo.Ajax({url: url, handleAs: "text"})
				.response(this, "processAjaxResponse")
				.go(params);
		} else {
			req = new enyo.JsonpRequest({url: url, callbackName: "cb"})
				.response(this, "processResponse")
				.go(params);	
		};
		// req = new enyo.Ajax({url: url, handleAs: "text"})
		// 		.response(this, "processAjaxResponse")
		// 		.go(params);
		// return req;
	},
	processAjaxResponse: function(inSender, inResponse) {
		inResponse = JSON.parse(inResponse);
		this.processResponse(inSender, inResponse);
	},
	processResponse: function(inSender, inResponse) {
		var response = inResponse[0];
		this.setName(response.name);
		this.setEmail(response.email);
		this.setAvatar(response.gravatar_url);
		this.setId(response.id);
		this.setLocation(response.location);
		this.setBio(response.bio);

		this.doResults(inResponse);
	}
});