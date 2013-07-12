enyo.kind({
	name: "PrayerList.SelectedCategoryController",
	kind: "enyo.ModelController",

	save: function() {
		this.model.commit();
	}
})