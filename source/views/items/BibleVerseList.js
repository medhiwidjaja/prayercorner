
enyo.kind({
	name: "PrayerList.BibleVerseList",
	kind: "enyo.DataRepeater",
	controller: "pl.bibleVersesCollection",
	components: [
		{ bindFrom: ".text", classes: "verse-item", allowHtml: true },
		{ bindFrom: ".passage", classes: "verse-address" },
		{ bindFrom: ".version", classes: "verse-version" , allowHtml: true }
	],
});
