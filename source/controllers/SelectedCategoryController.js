enyo.kind({
	name: "PrayerList.SelectedCategoryController",
	kind: "enyo.ModelController",
	//title: "Today's Prayers ---",
	defaults: {
		title: "Today's Prayers --",
		model: ""
	},
	originalModelAttributes: "",

	onModelChanged: function() {
		this.log();
		this.originalModelAttributes = JSON.parse(this.model.toJSON());
	},

	title: enyo.computed(function() {
		if (! this.model) {
			return this.defaults.title 
		} else {
			return this.model.title
		}
	}),

	save: function() {
		this.model.commit();
	}
})