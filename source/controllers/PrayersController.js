
enyo.kind({
	name: "PrayerList.PrayersController",
	kind: "enyo.Collection",
	model: "PrayerList.Prayer",

	filterCategory: function(cat) {
		this.fetchAndReplace();
		this.data(this.filter(function(v,a) {return v.category===cat.id}))
	}
});