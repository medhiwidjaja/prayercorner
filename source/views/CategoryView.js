enyo.kind({ 
	name: "PrayerList.CategoryView",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide",
	draggable: false,
	published: {
		title: "",
		groupModel: "", 
		titleBinding: ""
	},
	events: {
		onEditGroup: "",
		onAddPrayerItem: ""
	},
	mixins: ["enyo.AutoBindingSupport"],
	bindSource: "controller",
	controller: "pl.categoriesCollection",
	components: [
		{ name: "GFTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ name: "header", kind: "StylishHeader", bindFrom: ".selectedTitle", bindTo: "title", watermark: true }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ name: "prayersList", kind: "PrayerItems", classes: "living-room" },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "GFBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "groundfloor-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ content: "＋", ontap: "addPrayerItem" },
				{ fit: true },
				{ content: "✍", ontap: "editGroup" }
			]
		}
	],

	create: function() {
		this.inherited(arguments);
		
		//this.refreshBindings();
		// var titleBinding = new enyo.Binding({
		// 	from: ".selectedTitle", 	source: pl.groupsCollection,
		// 	to  : ".title", 			target: this.$.header
		// });
		//this.titleBinding = titleBinding;
		var modelBinding = new enyo.Binding({
			from: ".selectedGroup", 	source: pl.groupsCollection,
			to  : ".groupModel", 		target: this
		})
	},

	render: function() {
		this.inherited(arguments);
		this.$.prayersList.render();
	},

	editGroup: function(inSender, inEvent) {
		this.doEditGroup(inSender, inEvent);
		this.log();
	},

	addPrayerItem: function() {
		this.doAddPrayerItem();
		this.log();
	}
});

enyo.kind({
	name: "PrayerItems",
	// published: {
	// 	list: ""
	// },
	events: {
		onViewPrayerItem: ""
	},
	components: [
		{ name: "items", 
			kind: "enyo.DataRepeater", 
			controller: "pl.prayersCollection", 
			components: [
				{ ontap: "viewPrayerItem", components: [
					{ bindFrom: ".title", classes: "prayer-list-item" },
					{ kind: "swash-small", classes: "swash-dark" }
				]}
		]},
	],

	create: function() {
		this.inherited(arguments);

	},

	render: function() {
		this.inherited(arguments);
		this.$.items.controller.fetchAndReplace();
		this.$.items.refreshBindings();
		this.$.items.render();
	},

	setupItem: function(inSender, inEvent) {
		var prayer = this.list[inEvent.index];
		var item = inEvent.item;
		item.$.title.setContent(prayer.title);
		return true;
	},

	viewPrayerItem: function(inSender, inEvent) {
		this.doViewPrayerItem(inSender, inEvent);
		this.log();
	}
	// ,

	// list: [
	// 	{title: "Vacation as a family"},
	// 	{title: "Guidance as we move to new city. Dad’s job, Mom’s coping with new responsibilities, Bob and Fiona’s schools" }
	// ]
});