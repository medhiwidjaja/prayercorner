enyo.kind({
	name: "PrayerList.EditPrayerController",
	kind: "enyo.Collection",
	mixins: ["enyo.AutoBindingSupport"],
	bindFrom: ".selected",
	bindTo: "model",
	bindSource: "pl.prayersCollection",
	events: {
		onDoneEditing: "",
	},
	published: {
		isAddingNew: ""
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