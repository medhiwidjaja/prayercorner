
enyo.kind({
	name: "PrayerList.BibleVerseList",
	kind: "enyo.DataRepeater",
	controller: "pl.bibleVersesCollection",
	components: [
		{ bindFrom: ".text", classes: "verse-item" },
		{ bindFrom: ".verse", classes: "verse-address" }
	],
});
