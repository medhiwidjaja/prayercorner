enyo.kind({
	name: "PrayerList.BibleVersesController",
	kind: "enyo.Collection",
	model: "PrayerList.BibleVerse",

	filterPrayer: function(p) {
		this.fetchAndReplace();
		this.data(this.filter(function(v,a) {return v.prayerId === p.id}))
	},

	findById: function(id) {
        return this.filter(function(v,a) {return v.id === id})
    }
})