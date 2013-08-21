enyo.kind({
	name: "PrayerList.BibleVersesController",
	kind: "enyo.Collection",
	model: "PrayerList.BibleVerse",

	filterPrayer: function(id) {
		this.fetchAndReplace();
		this.data(this.filter(function(v,a) {return v.prayerId === id}))
	},

	findById: function(id) {
        return this.filter(function(v,a) {return v.id === id})
    },

	addItem: function(item) {
		var prayerId = pl.prayersCollection.selected.id;		
		var verse = new PrayerList.BibleVerse({
			text: item.text, 
			passage: item.passage, 
			prayerId: prayerId, 
			version: item.version, 
			isPersisted: true
		});
		verse.commit();
		this.add(verse);
		this.log()
	},

	removeItem: function(item) {
		this.remove(item);
		item.destroy();
		this.log();
	}
})