enyo.kind({
	name: "PrayerList.EditCategoryController",
	kind: "enyo.Collection",
	mixins: ["enyo.AutoBindingSupport"],
	bindFrom: ".model",
	bindTo: "model",
	bindSource: "pl.selectedCategoryController",
	events: {
		onDoneEditing: "",
	},
	published: {
		isAddingNew: ""
	},

	showConfirm: function() {
		navigator.notification.confirm(
			'Deleting category will delete all related prayer items!',  // message
			this.onConfirm,				// callback to invoke with index of button pressed
			'Confirm delete',            // title
			'Delete,Cancel'          // buttonLabels
		);
	},

	onConfirm: function(buttonIndex) {
		if (buttonIndex == 1) {
			this.delete();
		} else {
			this.cancel();
		}
	},

	done: function() {
		if (this.model.title !== "") {
			this.model.commit();
			if (this.isAddingNew) pl.categoriesCollection.add(this.model);
		}
		this.doDoneEditing();
		this.log();
	},

	cancel: function() {
		// Revert the model's attributes to saved values:
		this.model.set("title", pl.selectedCategoryController.savedAttributes.title);
		
		this.doDoneEditing();
		this.log();
	},

	delete: function() {
		pl.categoriesCollection.delete(this.model);
		pl.selectedCategoryController.set("model", null);
		// TODO: animate closing of the panel
		this.doDoneEditing();
		this.log();
	}

})