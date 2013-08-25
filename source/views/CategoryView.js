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
		onGrabberTap: "",
		onClosePanel: ""
	},
	bindSource: "controller",
	controller: "pl.selectedCategoryController",
	components: [
		{ name: "GFTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", components: [
				{ kind: "onyx.Grabber", ontap: "topToolbarGrabberTap" },
				{ bindFrom: ".title", classes: "stylish-text" },
				{ bindFrom: ".title", classes: "watermark" }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ name: "prayersList", kind: "PrayerList.PrayerItems", classes: "prayer-list-container" },
				{ name: "quickInputRow", showing: false,
					components: [
						{name: "quickInputControl", kind: "PrayerList.PrayerQuickInput", onCancel: "cancelPrayerItem", onSave: "savePrayerItem" }
					]
				},
				// {
				// 	kind: "CalliopeInput"
				// },
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
				{ kind: "enyo.Button", content: "＋Prayer", classes: "text-button", ontap: "addPrayerItem" },
				//{ kind: "onyx.Button", content: "＋", style: "font-size: 16px", ontap: "addPrayerItem" },
				{ fit: true },
				{ name: "catgEditButton", kind: "enyo.Button", content: "✍", classes: "ding-button", showing: true, ontap: "editCategory" }
			]
		}
	],

	editCategory: function(inSender, inEvent) {
		this.doEditCategory(inSender, inEvent);
		this.log();
	},

	addPrayerItem: function() {
		this.$.quickInputRow.setShowing(true);
		this.doAddPrayerItem();
		this.log();
	},

	topToolbarGrabberTap: function() {
		this.doGrabberTap();
		this.log();
	},

	cancelPrayerItem: function() {
		this.$.quickInputRow.setShowing(false);
		this.log();
	},

	savePrayerItem: function(inSender, inEvent) {
		this.controller.addItem(inEvent.title);
		this.$.quickInputRow.setShowing(false);
		this.log();
	}
});

enyo.kind({
	name: "PrayerList.PrayerItems",
	kind: "enyo.DataRepeater",
	controller: "pl.prayersCollection",
	events: {
		onViewPrayerItem: ""
	},
	components: [{ 
		onSelected: "viewPrayerItem", 
		bindFrom: ".id",
		bindTo: "modelId",
		components: [
			{ bindFrom: ".title", classes: "prayer-list-item" },
			{ kind: "swash", type: "s", shade: "dark" }
		]
	}],

	viewPrayerItem: function(inSender, inEvent) {
		pl.prayersCollection.select(inSender.modelId);
		pl.journalEntriesCollection.filterPrayer(inSender.modelId);
		pl.bibleVersesCollection.filterPrayer(inSender.modelId);
		this.doViewPrayerItem(this.controller.findById(inSender.modelId));
		this.log();
	}

});



