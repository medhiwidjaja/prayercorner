
enyo.kind({
	name: "PrayerList.PrayersController",
	kind: "enyo.Collection",
	model: "PrayerList.Prayer",
	selected: null,

	filterCategory: function(cat) {
		this.fetchAndReplace();
		this.data(this.filter(function(v,a) {return v.category===cat.id}))
	},

	findById: function(id) {
        var m = this.filter(function(v,a) {return v.id === id});
        return m[0];
    },

    select: function(id) {
    	this.selected = this.findById(id);
    	return this.selected;
    },

	saveSelected: function() {
		this.selected.commit();
	}
});