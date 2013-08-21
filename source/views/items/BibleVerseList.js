// TODO : sort the list

enyo.kind({
	name: "PrayerList.BibleVerseList",
	kind: "enyo.DataRepeater",
	controller: "pl.bibleVersesCollection",
	events: {
		onOpenVersePanel: ""
	},
	components: [
		{ classes: "verse-list-item decent-padding", 
			onSelected: "editVerse", 
			style: "padding-top: 4px; padding-bottom: 4px",
			components: [
				{ bindFrom: ".text", classes: "verse-item", allowHtml: true },
				{ bindFrom: ".verse", classes: "verse-address" },  // for backward compatibility
				{ bindFrom: ".passage", classes: "verse-address" },
				{ bindFrom: ".version", classes: "verse-version" , allowHtml: true }
		]}
	],

	editVerse: function(inSender, inEvent) {
		this.log();
		this.doOpenVersePanel({prayerId: inEvent.model.prayerId, verseItem: inEvent.model});
	}
});
