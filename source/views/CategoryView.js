enyo.kind({ 
	name: "PrayerList.CategoryView",
	kind: "enyo.FittableRows",
	draggable: false,
	published: {
		title: "",
		groupModel: "", 
		titleBinding: "",
		extraTitle: ""
	},
	events: {
		onEditCategory: "",
		onAddPrayerItem: "",
		onGrabberTap: ""
	},
	bindSource: "controller",
	controller: "pl.selectedCategoryController",
	components: [
		{ name: "GFTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", components: [
				{ kind: "onyx.Grabber", ontap: "topToolbarGrabberTap" },
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
				{ name: "prayersList", kind: "PrayerItems", classes: "prayer-list-container" },
				{ kind: "swash", type: "w", shade: "dark" },
				{ style: "margin-top:20px" },
				{ name: "extra" }
			]
		},
		{ name: "GFBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "＋", classes: "ding-button", ontap: "addPrayerItem" },
				//{ kind: "onyx.Button", content: "＋", style: "font-size: 16px", ontap: "addPrayerItem" },
				{ fit: true },
				{ kind: "enyo.Button", content: "✍", classes: "ding-button", ontap: "editCategory" }
			]
		}
	],

	editCategory: function(inSender, inEvent) {
		this.doEditCategory(inSender, inEvent);
		this.log();
	},

	addPrayerItem: function() {
		this.doAddPrayerItem();
		this.log();
	},

	topToolbarGrabberTap: function() {
		this.doGrabberTap();
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
			{ kind: "swash", type: "s", shade: "dark" }
		]
	}],

	viewPrayerItem: function(inSender, inEvent) {
		this.doViewPrayerItem(this.controller.findById(inSender.modelId));
		this.log(this.controller.findById(inSender.modelId));
	}
	// ,

	// list: [
	// 	{title: "Vacation as a family"},
	// 	{title: "Guidance as we move to new city. Dad’s job, Mom’s coping with new responsibilities, Bob and Fiona’s schools" }
	// ]
});