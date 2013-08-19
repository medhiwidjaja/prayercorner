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

// var p1 = new PrayerList.Prayer({
// 	title: "A little prayer", 
// 	journalEntries: [
// 		{title:"Journal 1"},
// 		{title:"Entry no.2"}
// 	],
// 	verses: [
// 		{text:"Rock & fortress",verse:"Psalms 31:3"},
// 		{text:"Guidance",verse:"Isa 42"}
// 	] 
// });