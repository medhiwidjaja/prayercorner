enyo.kind({ 
	name: "UpperGroundFloor",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
	draggable: false,
	published: {
		category: "",
		groupModel: "",
		isAddingNew: ""
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
		{ name: "UGFBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "groundfloor-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ content: "Done", classes: "done-button", ontap: "done" },
				{ fit: true },
				{ content: "Delete", classes: "done-button", ontap: "delete" }
			]
		}
	],

	create: function() {
		this.inherited(arguments);
		if (this.isAddingNew) {
			this.$.toolbarHeader.setTitle("Add a Category");
			// this.groupModel = pl.groupsCollection.build({});
			// var modelBinding = new enyo.Binding({
			// 	from: ".$.groupName.value", source: this,
			// 	to: ".groupModel.value", target: this
			// });
		} else {
			this.$.toolbarHeader.setTitle("Edit Category");
			var modelBinding = new enyo.Binding({
				from: ".selectedGroup", 	source: pl.groupsCollection,
				to  : ".groupModel", 		target: this
			});
		}
		
	},

	done: function() {
		if(this.isAddingNew) {
			this.groupModel = pl.groupsCollection.build({title: this.$.groupEditFields.$.groupName.value});
			pl.groupsCollection.createNew(this.groupModel);
		} else {
			pl.groupsCollection.save(this.groupModel);
		}
		// TODO: animate closing of the panel
		this.doDoneEditing();
		this.log();
	},

	delete: function() {
		pl.groupsCollection.delete(this.groupModel);
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
					placeholder: "Name"
					//value: this.model ? this.model.title : undefined
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