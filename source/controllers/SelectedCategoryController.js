enyo.kind({
	name: "PrayerList.SelectedCategoryController",
	kind: "enyo.ModelController",
	//title: "Today's Prayers ---",
	defaults: {
		title: "Today's Prayers --",
		model: ""
	},
	savedAttributes: "",

	title: enyo.computed(function() {
		if (! this.model) {
			return this.defaults.title 
		} else {
			return this.model.title
		}
	}),

	save: function() {
		this.model.commit();
	},

	addItem: function(item) {
		var prayerItem = new PrayerList.Prayer({title: item, category: this.model.id});
		prayerItem.commit();
		pl.prayersCollection.add(prayerItem);
		this.log(pl.prayersCollection.at(pl.prayersCollection.length - 1))
	}
})