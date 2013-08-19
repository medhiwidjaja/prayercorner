enyo.kind({
	name: "PrayerList.PrayerPanels",
	kind: "PrayerList.TwoPlyPanel",
	draggable:false, 
	events: {
		onTogglePanel: ""
	},
	components: [
		{ name: "prayerView", 
			kind: "PrayerList.PrayerView",
			onOpenVersePanel:   "openVersePanel",
			onOpenJournalPanel: "openJournalPanel",
			onGrabberTap: 		"toggleView"
		}
	],
	handlers: {
		onCancel: 		"closeTopPanel",
		onSaveVerse:    "saveVerseItem",
		onSaveJournal:  "saveJournalItem"
	},
	openVersePanel: function(inSender, inEvent) {
		this.log();
		this.pushView(
			{ kind: "PrayerList.VerseInput",
				prayerId: inEvent.prayer.id,
				onClosePanel: "close"
			},
			{ owner: this }
		)
	},

	openJournalPanel: function(inSender, inEvent) {
		this.log();
		this.pushView(
			{ kind: "PrayerList.JournalInput",
				prayerId: inEvent.prayer.id,
			},
			{ owner: this }
		)
	},

	saveVerseItem: function(inSender, inEvent) {
		this.log();
		pl.bibleVersesCollection.add(inEvent.model);
		inEvent.model.commit();
	},

	toggleView: function() {
		this.log();
		this.doTogglePanel();
	},

	close: function() {
		this.log();
		return false;
		//this.doClosePanel();
	}

})