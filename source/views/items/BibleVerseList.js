
enyo.kind({
	name: "PrayerList.BibleVerseList",
	kind: "enyo.DataRepeater",
	controller: "pl.bibleVersesCollection",
	components: [
		{ bindFrom: ".text", classes: "verse-item" },
		{ bindFrom: ".verse", classes: "verse-address" }
	],
});

// enyo.kind({
// 	name: "PrayerList.BibleVerseList",
// 	components: [
// 		{ kind: "Repeater", onSetupItem: "setupItem", components: [
// 			{ name: "item", components: [
// 				{ name: "verseText", classes: "verse-item" },
// 				{ name: "verseAddress", classes: "verse-address" }
// 			]}
// 		]},
// 	],
// 	create: function() {
// 		this.inherited(arguments);
// 		this.$.repeater.setCount(this.list.length);
// 	},
// 	setupItem: function(inSender, inEvent) {
// 		var prayer = this.list[inEvent.index];
// 		var item = inEvent.item;
// 		item.$.verseText.setContent(prayer.text);
// 		item.$.verseAddress.setContent(prayer.verse);
// 		return true;
// 	},
// 	list: [
// 		{
// 			text: "For you are my rock and my fortress; and for your name's sake you lead me and guide me;",
// 		 	verse: "Psalms 31:3"
// 		},
// 		{
// 			text: "And I will lead the blind in a way that they do not know, in paths that they have not known I will guide them. I will turn the darkness before them into light, the rough places into level ground. These are the things I do, and I do not forsake them.",
// 			verse: "Isaiah 42:16" 
// 		}
// 	]
// });