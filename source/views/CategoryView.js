enyo.kind({ 
	name: "PrayerList.CategoryView",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide",
	draggable: false,
	published: {
		title: "",
		groupModel: "", 
		titleBinding: "",
		extraTitle: ""
	},
	events: {
		onEditGroup: "",
		onAddPrayerItem: ""
	},
	bindSource: "controller",
	controller: "pl.selectedCategoryController",
	components: [
		{ name: "GFTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ bindFrom: ".title", classes: "stylish-text" },
				{ bindFrom: ".title", classes: "watermark" },
				//{ name: "header", kind: "StylishHeader", bindFrom: ".title", bindTo: "title", watermark: true }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ name: "prayersList", kind: "PrayerItems", classes: "living-room" },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" },
				{ name: "extra" }
			]
		},
		{ name: "GFBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ content: "＋", ontap: "addPrayerItem" },
				{ fit: true },
				{ content: "✍", ontap: "editGroup" }
			]
		}
	],

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
	kind: "enyo.DataRepeater",
	controller: "pl.prayersCollection",
	events: {
		onViewPrayerItem: ""
	},
	components: [{ 
		ontap: "viewPrayerItem", 
		bindFrom: ".id",
		bindTo: "modelId",
		components: [
			{ bindFrom: ".title", classes: "prayer-list-item" },
			{ kind: "swash-small", classes: "swash-dark" }
		]
	}],

	viewPrayerItem: function(inSender, inEvent) {
		this.doViewPrayerItem(this.controller.findById(inSender.modelId)[0]);
		this.log(this.controller.findById(inSender.modelId)[0]);
	}
	// ,

	// list: [
	// 	{title: "Vacation as a family"},
	// 	{title: "Guidance as we move to new city. Dad’s job, Mom’s coping with new responsibilities, Bob and Fiona’s schools" }
	// ]
});