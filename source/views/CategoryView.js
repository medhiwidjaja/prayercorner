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
				{ kind: "enyo.Button", content: "＋", classes: "ding-button", ontap: "addPrayerItem" },
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
		this.log();
	}

});

enyo.kind({
	name: "PrayerList.PrayerQuickInput",
	kind: "Control",
	classes: "pl-input-container", 
	events: {
		onCancel: "",
		onSave: ""
	},
	components: [
		{ kind: "onyx.InputDecorator", 
			classes: "pl-input-decorator", 
			components: [
				{ name: "quickInput", kind: "enyo.TextArea", allowHtml: false,
					onchange: "saveInput",
					defaultFocus: true,
					style: "width:272px",
					placeholder: "Enter prayer item"
				}
			]
		},
		{ //layoutKind: "FittableColumnsLayout", 
			style: "margin: 4px 0px; width:100%",
			components: [
				{ kind: "enyo.Button", content: "Cancel", style: "float: left; width:68px", classes: "text-button", ontap: "cancelInput" },
				//{ fit: true },
				{ kind: "enyo.Button", content: "Save", style: "float: right; width:68px", classes: "text-button", ontap: "saveInput" }
			]
		}
	],

	cancelInput: function() {
		this.log(this.$.quickInput.value);
		this.$.quickInput.setValue("");
		this.doCancel();
	},

	saveInput: function() {
		this.log(this.$.quickInput.value);
		var input = this.$.quickInput.value;
		this.$.quickInput.setValue("");
		this.doSave({title:input});
	}

});


