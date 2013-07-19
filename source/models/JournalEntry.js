enyo.kind({
	name: "PrayerList.JournalEntry",
	kind: "enyo.Model",
	attributes: {
		id: "",
		content: "",
		createdDate: "",
		prayerId: ""
		// prayer: {
		// 	relation: enyo.toOne({
		// 		isOwner: true
		// 	})
		// }
	},

	journalDate: function() {
		return new Date(Date.parse(this.createdDate));
	},

	month: function() {
		return this.journalDate().toString().slice(4,7);
	},

	date: function() {
		return this.journalDate().getDate();
	}
});