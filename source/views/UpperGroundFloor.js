enyo.kind({ 
	name: "UpperGroundFloor",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
	draggable: false,
	published: {
		title: "",
		category: "",
		groupModel: ""
	},
	events: {
		onDoneEditing: ""
	},
	components: [
		{ name: "UGFTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ name: "toolbarHeader", kind: "StylishHeader", watermark: false }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "GroupEditFields", model: this.groupModel, classes: "living-room" },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "UGFBottomToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ content: "Done", classes: "done-button", ontap: "done" }
			]
		}
	],

	create: function() {
		this.inherited(arguments);
		this.$.toolbarHeader.setTitle(this.title);
		var modelBinding = new enyo.Binding({
			from: ".selectedGroup", 	source: pl.groupsCollection,
			to  : ".groupModel", 		target: this
		})
	},

	done: function() {
		pl.groupsCollection.save(this.groupModel);
		// TODO: animate closing of the panel
		this.doDoneEditing();
		this.log();
	}
});


enyo.kind({
	name: "GroupEditFields",
	published: {
		model: ""
	},
	events: {

	},
	components: [
		{kind: "onyx.Groupbox", classes: "pl-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Category", classes: "pl-groupbox-header"},
			{kind: "onyx.InputDecorator", classes: "pl-input-decorator", components: [
				{name: "groupName", kind: "onyx.Input", classes: "pl-input",
					value: this.model ? this.model.title : undefined
				}
			]},
		// 	{kind: "onyx.InputDecorator", classes: "pl-input-decorator", components: [
		// 		{kind: "onyx.Input", classes: "pl-input", value: "Middle"}
		// 	]},
		// 	{kind: "onyx.InputDecorator", classes: "pl-input-decorator", components: [
		// 		{kind: "onyx.Input", classes: "pl-input", value: "Last"}
		// 	]}
		]},
	],
	
	create: function() {
		this.inherited(arguments);
		var modelBinding = new enyo.Binding({
			from: ".selectedGroup", source: pl.groupsCollection,
			to  : ".model", 		target: this
		});
		var binding = new enyo.Binding({
			from: ".selectedGroup.title", source: pl.groupsCollection,
			to:   ".$.groupName.value", target: this,
			oneWay: false
		});
	},
})