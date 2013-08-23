enyo.kind({
	name: "PrayerList.JournalEntry",
	kind: "enyo.Model",
	attributes: {
		id: "",
		content: "",
		entryDate: "",
		prayerId: "",
		answer: false
		// prayer: {
		// 	relation: enyo.toOne({
		// 		isOwner: true
		// 	})
		// }
	},

	journalDate: function() {
		return new Date(Date.parse(this.entryDate));
	},

	month: function() {
		return this.journalDate().toString().slice(4,7);
	},

	date: function() {
		return this.journalDate().getDate();
	}
});