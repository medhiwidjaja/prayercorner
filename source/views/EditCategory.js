enyo.kind({ 
	name: "PrayerList.EditCategory",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
	draggable: false,
	published: {
		category: "",
		//groupModel: "",
		isAddingNew: ""
	},
	events: {
		onDoneEditing: ""
	},
	controller: "pl.selectedCategoryController",
	// mixins: ["enyo.AutoBindingSupport"],
	// bindSource: "controller",
	components: [
		{ name: "ECTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ name: "toolbarHeader", kind: "StylishHeader", watermark: false }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				//{ kind: "GroupEditFields", model: this.groupModel, classes: "living-room" },
				{ kind: "GroupEditFields", classes: "living-room" },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "ECBottomToolbar", 
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
		this.setModel(pl.categoriesCollection.selectedCategory);
		if (this.isAddingNew) {
			this.$.toolbarHeader.setTitle("Add a Category");
			this.setModel(pl.categoriesCollection.build({}));
			
		} else {
			this.$.toolbarHeader.setTitle("Edit Category");
			// this.$.groupEditFields.setModel(pl.categoriesCollection.selectedCategory);
			// var titleBinding = new enyo.Binding({
			// 	from: ".$.groupName.value", source: this,
			// 	to: ".groupModel.value", target: this
			// });
			// var modelBinding = new enyo.Binding({
			// 	from: ".selectedCategory", 	source: pl.categoriesCollection,
			// 	to  : ".groupModel", 		target: this
			// });
		}
		
	},

	done: function() {
		// if(this.isAddingNew) {
		// 	this.setModel(pl.categoriesCollection.build({title: this.$.groupEditFields.$.groupName.value}));
		// 	pl.categoriesCollection.createNew(this.model);
		// } else {
		// 	pl.categoriesCollection.save(this.model);
		// }
		// TODO: animate closing of the panel
		//pl.categoriesCollection.save(this.model);
		pl.selectedCategoryController.save();
		this.doDoneEditing();
		this.log();
	},

	delete: function() {
		pl.categoriesCollection.delete(this.model);
		// TODO: animate closing of the panel
		this.doDoneEditing();
		this.log();
	}
});


enyo.kind({
	name: "GroupEditFields",
	// published: {
	// 	model: ""
	// },
	// events: {

	// },
	controller: "pl.selectedCategoryController",
	mixins: ["enyo.AutoBindingSupport"],
	bindSource: "controller",
	// bindings: [
	// 	{ from: ".title", to: ".$.groupName.value", oneWay: false }
	// ],
	components: [
		{kind: "onyx.Groupbox", classes: "pl-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Category", classes: "pl-groupbox-header"},
			{kind: "onyx.InputDecorator", classes: "pl-input-decorator", components: [
				{name: "groupName", kind: "onyx.Input", classes: "pl-input",
					placeholder: "Name",
					//bindFrom: ".title", bindTo: "value"
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
		// var modelBinding = new enyo.Binding({
		// 	from: ".selectedCategory", 	source: pl.categoriesCollection,
		// 	to  : ".model", 			target: this,
		// 	oneWay: false
		// });
		var binding = new enyo.Binding({
			from: ".title", 	source: this.controller,
			to:   ".value", 	target: this.$.groupName,
			oneWay: false
		});
		var m = 1;
	},
})