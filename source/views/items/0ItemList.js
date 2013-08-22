enyo.kind({
	name: "PrayerList.Items", 
	events: {
		onStartSearching: "",
		onStopSearching: ""
	},
	components: [{
		kind: "enyo.List",
		classes: "plist enyo-fit",
		touch: true, 
		onSetupItem: "setupItem", 
		components: [{
			name: "item", 
			classes: "plist-item enyo-border-box", 
			ontap: "itemTap", 
			components: [
				{name: "thumbnail", kind: "Image", classes: "plist-item-thumbnail"},
				{name: "title", classes: "plist-item-title"},
				{name: "description", classes: "plist-item-description"}
			]
		}]
	}],
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.results[i];
		this.$.item.addRemoveClass("onyx-selected", inSender.isSelected(inEvent.index));
		if (item.img) {
			this.$.thumbnail.setSrc(item.img)
		} else {
			this.$.thumbnail.setSrc(null)
		};
		this.$.title.setContent(item.title || item.label || "Untitled");
		
		var text = app.stripHTML(item.description);
		this.$.description.setContent(text || "No description");
	},
	search: function(searchText) {
		this.page = 0;
		this.results = [];
		this.doStartSearching({searchType: "search"});
		this.$.articleSearch.search(searchText);
	},
	searchResults: function(inSender, inResults) {
		this.doStopSearching();
		this.results = this.results.concat(inResults);
		this.$.list.setCount(this.results.length);
		if (this.page === 0) {
			this.$.list.reset();
		} else {
			this.$.list.refresh();
		};
	},
	myArticlesUrl: "http://localhost:3000/my_articles.json",
	newAndUpdatedUrl: "http://localhost:3000/new_and_updated.json",
	fetch: function(type) {
		this.page = 0;
		this.results = [];
		this.doStartSearching({searchType: "fetch"});
		if (type === "new") {
			this.$.articleSearch.fetch(this.newAndUpdatedUrl);
		} else if (type === "myArticles") {
			this.$.articleSearch.fetch(this.myArticlesUrl)
		};
	}
});