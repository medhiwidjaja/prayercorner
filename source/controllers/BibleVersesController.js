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
    },

	addItem: function(item) {
		var prayerId = pl.prayersCollection.selected.id;		
		var verse = new PrayerList.BibleVerse({text: item.text, verse: item.verse, prayerId: prayerId})
		verse.commit();
		this.add(verse);
		this.log()
	}
})