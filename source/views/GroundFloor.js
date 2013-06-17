enyo.kind({
	name: "Foreplot.GroundFloor",
	kind: "FittableRows",
	classes: "foreplot-groundfloor enyo-unselectable enyo-fit",
	events: {
		onGFGrabberTap: ""
	},
	components: [{
		kind: "onyx.Toolbar", 
		components: [
			{kind: "onyx.Grabber", ontap: "grabberTap"},
			{content: "GroundFloor", fit: true}
		]
	},{
		kind: "enyo.Repeater", 
		fit: true, 
		touch: true, 
		count: 5,
		onSetupItem: "setupItem", 
		components: [{
			name: "item",  
			classes: "foreplot-item enyo-border-box", 
			ontap: "itemTap", 
			components: [
				//{name: "thumbnail", kind: "Image", classes: "foreplot-thumbnail"},
				{name: "icon", tag: "i", classes:"icon"},
				{name: "title", classes: "foreplot-menu-title"},
				{name: "description", classes: ""}
			]
		}]
	},{
		kind: "onyx.Toolbar", 
		components: [
			{kind: "onyx.IconButton", src: "assets/Onyx-Icons-Examples-DarkBkgrnd-Square.png"},
			{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png"},
			{fit: true},
			{name: "fetchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false}
		]
	}],
	renderRow: function() {
		this.inherited(arguments);
	},
	setupItem: function(inSender, inEvent) {
		var menuList = [
			{title: "Article", thumbnail: "icon-file"},
			{title: "Alternatives", thumbnail: "icon-list-ul"},
			{title: "Criteria", thumbnail: "icon-sitemap"},
			{title: "Ratings", thumbnail: "icon-tasks"},
			{title: "Results", thumbnail: "icon-bar-chart"},
		];
		var menu = menuList[inEvent.index];
		var item = inEvent.item;
		item.$.title.setContent(menu.title);
		item.$.icon.addClass('icon '+menu.thumbnail);
		return true;
	},
	grabberTap: function() {
		this.doGFGrabberTap();
	}
});