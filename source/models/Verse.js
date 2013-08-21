enyo.kind({
	name: "PrayerList.BibleVerse",
	kind: "enyo.Model",
	attributes: {
		id: "",
		text: "",
		version: "",
		passage: "",
		createdDate: "",
		prayerId: ""
		// prayer: {
		// 	relation: enyo.toOne({
		// 		isOwner: true
		// 	})
		// }
	}
});
