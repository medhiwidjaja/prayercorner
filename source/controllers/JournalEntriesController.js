enyo.kind({
	name: "PrayerList.JournalEntriesController",
	kind: "enyo.Collection",
	model: "PrayerList.JournalEntry",

	filterPrayer: function(p) {
		this.fetchAndReplace();
		this.data(this.filter(function(v,a) {return v.prayerId === p.id}))
	},

	findById: function(id) {
        return this.filter(function(v,a) {return v.id === id})
    },

	addItem: function(item) {
		var prayerId = pl.prayersCollection.selected.id;
		// The following regexp will match the date ("20 Mar 2002") part of the UTC String
		
		var journalItem = new PrayerList.JournalEntry({content: item.title, prayerId: prayerId, createdDate: item.createdDate, answer: (item.answer ? true : false)});
		journalItem.commit();
		this.add(journalItem);
		this.log()
	}
});