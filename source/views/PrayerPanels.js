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
			onSaveVerseItem:    "saveVerseItem",
			onOpenJournalPanel: "openJournalPanel",
			onSaveJournalItem:  "saveJournalItem",
			onGrabberTap: 		"toggleView"
		}
	],
	onCancel: "closeTopPanel",

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