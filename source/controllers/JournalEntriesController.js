enyo.kind({
	name: "PrayerList.JournalEntriesController",
	kind: "enyo.Collection",
	model: "PrayerList.JournalEntry",

	filterPrayer: function(id) {
		this.fetchAndReplace();
		this.data(this.filter(function(v,a) {return v.prayerId === id}))
	},

	findById: function(id) {
        return this.filter(function(v,a) {return v.id === id})
    },

	addItem: function(item) {
		var prayerId = pl.prayersCollection.selected.id;
		var journalItem = new PrayerList.JournalEntry({
			content: item.content, 
			prayerId: prayerId, 
			entryDate: item.entryDate, 
			//answer: (item.answer ? true : false), 
			answer: item.answer,
			isPersisted: true
		});
		journalItem.commit();
		this.add(journalItem);
		this.log()
	},

	removeItem: function(item) {
		this.remove(item);
		item.destroy();
		this.log();
	}
});