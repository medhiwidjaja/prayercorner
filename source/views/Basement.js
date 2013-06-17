enyo.kind({
	name: "Foreplot.Basement",
	kind: "FittableRows",
	components: [{
		kind: "onyx.Toolbar", 
		components: [
			{kind: "Foreplot.UserControl"},
			{fit: true},
			{name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false}
				// {kind: "Image", src: "assets/search-input-search.png", style: "width: 20px; height: 20px;"}
		]
	},{
		kind:"Panels", 
		name:"Foreplot.BasementPanels", 
		arrangerKind: "enyo.CarouselArranger",
		fit: true,
		classes:"onyx foreplot-panels", 
		components: [{
			kind: "FittableRows", 
			components: [{
				content: "New & Updated",
				classes: "foreplot-header-row"
			},{
				kind: "FittableRows",
				fit: true,
				components: [{
					name: "newArticles",
					kind: "Foreplot.Articles", 
					onStartSearching: "showSpinner", onStopSearching: "hideSpinner"
				}]
			}]
		},{
			kind: "FittableRows", 
			components: [{
				content: "My articles",
				classes: "foreplot-header-row"
			},{
				kind: "FittableRows",
				fit: true,
				components: [{
					name: "myArticles",
					kind: "Foreplot.Articles", 
					onStartSearching: "showSpinner", onStopSearching: "hideSpinner"
				}]
			}]
		},{ 
			kind: "FittableRows", 
			components: [{
				classes: "onyx-toolbar-inline", components: [{
					kind: "onyx.InputDecorator", 
					components: [
						{name: "searchInput", kind: "onyx.Input", placeholder: "Search" , onchange: "search"},
						{kind: "Image", src: "assets/search-input-search.png", style: "width: 20px; height: 20px;"}						
					]
				}]
			},{
				kind: "FittableRows",
				fit: true,
				components: [{
					content: "Search Results",
					classes: "foreplot-header-row"
				},{
					name: "searchResults",
					kind: "Foreplot.Articles", 
					onStartSearching: "showSpinner", onStopSearching: "hideSpinner"
				}]
			}]
		}]
	},{
		kind: "onyx.Toolbar", components: [
			{kind: "onyx.IconButton", src: "assets/Onyx-Icons-Examples-DarkBkgrnd-Square.png", ontap: "fetchMyArticles"},
			{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png", ontap: "fetchNew"},
			{kind: "onyx.IconButton", src: "assets/search-input-search.png", ontap: "search"},
			{fit: true},
			{name: "fetchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false}
		]
	}],
	rendered: function() {
		this.inherited(arguments);
		this.$.newArticles.fetch("new");
		this.$.myArticles.fetch("myArticles");
	},
	search: function() {
		this.searchText = this.$.searchInput.getValue();
		this.$.searchResults.search(this.searchText);
	},
	fetchNew: function() {
		this.$.newArticles.fetch("new");
	},
	fetchMyArticles: function() {
		this.$.myArticles.fetch("myArticles");
	},
	showSpinner: function(inSender, inEvent) {
		var type = inEvent.searchType;
		if (type === "search")
			this.$.searchSpinner.show()
		else if (type === "fetch")
			this.$.fetchSpinner.show();
		return true;
	},
	hideSpinner: function(inSender, inEvent) {
		this.$.searchSpinner.hide();
		this.$.fetchSpinner.hide();
		return true;
	}
});
