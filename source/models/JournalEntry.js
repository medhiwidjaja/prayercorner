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
	}
});