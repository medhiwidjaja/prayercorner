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

	destroyRelated: function() {

	}
});
