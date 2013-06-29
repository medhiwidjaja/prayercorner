enyo.kind({ 
	name: "GroundFloor",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide",
	draggable: false,
	published: {
		title: ""
	},
	events: {
		onEditGroup: "",
		onAddPrayerItem: ""
	},
	components: [
		{ name: "GFTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ name: "header", kind: "StylishHeader", watermark: true }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "PrayerItems", classes: "living-room" },
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
		var binding = new enyo.Binding({
			from: ".selectedTitle", source: pl.groupsCollection,
			to  : "title", 			target: this.$.header
		});
	},

	editGroup: function() {
		this.doEditGroup();
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
			controller: "pl.itemsCollection", 
			components: [
				{ ontap: "viewPrayerItem", components: [
					{ bindFrom: ".title", classes: "prayer-list-item" },
					{ kind: "swash-small", classes: "swash-dark" }
				]}
		]},
	],

	render: function() {
		this.inherited(arguments);
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