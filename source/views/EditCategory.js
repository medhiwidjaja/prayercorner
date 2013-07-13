enyo.kind({
	name: "PrayerList.EditCategory",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
	draggable: false,
	published: {

	},
	events: {
		onDoneEditing: ""
	},
	controller: "pl.editCategoryController",
	bindings: [
		{from: ".model.title", to: "$.tbtitle.content"},
	],
	components: [
		{ name: "ECTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ name: "toolbarHeader", kind: "StylishHeader", title: "Edit Category:", watermark: false },
				{ name: "tbtitle" }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "GroupEditFields", classes: "living-room" },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "ECBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ content: "Done", classes: "done-button", ontap: "done" },
				{ content: "Cancel", classes: "done-button", ontap: "cancel" },
				{ fit: true },
				{ content: "Delete", classes: "done-button", ontap: "delete" }
			]
		}
	],

	// create: function() {
	// 	this.inherited(arguments);
	// 	this.$.groupEditFields.set("controller", pl.editCategoryController)
	// }
})


enyo.kind({
	name: "GroupEditFields",
	controller: "pl.editCategoryController",
	bindings: [
		{ from: ".controller.model.title", to: ".$.groupName.value", oneWay: false, transform: "prettify" }
	],
	components: [
		{kind: "onyx.Groupbox", classes: "pl-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Category", classes: "pl-groupbox-header"},
			{kind: "onyx.InputDecorator", classes: "pl-input-decorator", components: [
				{name: "groupName", kind: "onyx.Input", classes: "pl-input",
					placeholder: "Name"
				}
			]},
		]},
	],

	prettify: function(value) {
		return value === null ? "" : value
	}
	
	// create: function() {
	// 	this.inherited(arguments);
	// 	var binding = new enyo.Binding({
	// 		from: ".title", 	source: this.controller,
	// 		to:   ".value", 	target: this.$.groupName,
	// 		oneWay: false
	// 	});
	// 	var m = 1;
	// },
})