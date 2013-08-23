enyo.kind({
	name: "PrayerList.Prayer",
	kind: "enyo.Model",
	attributes: {
		id: "",
		title: "",
		answered: "",
		category: "",
		createdDate: "",
		answeredDate: "",
		rowNo: "",
		isPersisted: false
		// journalEntries: {
		// 	relation: enyo.toMany({
		// 		inverseKey: "prayer",
		// 		model: "PrayerList.JournalEntry",
		// 		inCommit: true
		// 	})
		// },
		// verses: {
		// 	relation: enyo.toMany({
		// 		inverseKey: "prayer",
		// 		model: "PrayerList.BibleVerse",
		// 		inCommit: true
		// 	})
		// }
	},
	
	destroyItem: function(){
		this.destroyRelated();
		this.log(this.title);
		this.destroy();
	},

	destroyRelated: function() {
		pl.bibleVersesCollection.filterPrayer(this.id);
		var verses = enyo.clone(pl.bibleVersesCollection.data());
		pl.bibleVersesCollection.removeAll();
		enyo.forEach(verses, function(item) {
			item.destroy();
			this.log(item.passage);
		});
		pl.journalEntriesCollection.filterPrayer(this.id);
		journals = enyo.clone(pl.journalEntriesCollection.data());
		pl.journalEntriesCollection.removeAll();
		enyo.forEach(journals, function(item) {
			item.destroy();
			this.log(item.content);
		})
	}
});
