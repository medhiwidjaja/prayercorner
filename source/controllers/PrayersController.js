
enyo.kind({
	name: "PrayerList.PrayersController",
	kind: "enyo.Collection",
	model: "PrayerList.Prayer",

	whereCategoryIs: function(cat) {
		return this.filter(function(v,a) {return v.category===cat.id})
	}
});