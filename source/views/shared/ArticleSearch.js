// A simple component to do article search.
enyo.kind({
	name: "Foreplot.ArticleSearch",
	kind: "Component",
	published: {
		searchText: ""
	},
	events: {
		onResults: ""
	},
	searchUrl: "http://localhost:3000/articles.json",
	fetch: function(url, params) {
		var req;
		if (window.location.protocol === "ms-appx:") {
			params.nojsoncallback = 1;
			// Use ajax for platforms with no jsonp support (Windows 8)
			req = new enyo.Ajax({url: url, handleAs: "text"})
				.response(this, "processAjaxResponse")
				.go(params);
		} else {
			req = new enyo.JsonpRequest({url: url, callbackName: "callback"});
			req.go(params);
			req.response(this, "processResponse");
		}
		return req;
	},
	search: function(inSearchText, inPage) {
		this.searchText = inSearchText || this.searchText;
		var params = {
			q: this.searchText
		};
		return this.fetch(this.searchUrl, params);
	},
	processAjaxResponse: function(inSender, inResponse) {
		inResponse = JSON.parse(inResponse);
		this.processResponse(inSender, inResponse);
	},
	processResponse: function(inSender, inResponse) {
		this.doResults(inResponse);
	}
});