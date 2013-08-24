enyo.kind({
	name: "PrayerList.PrayerPanels",
	kind: "PrayerList.TwoPlyPanel",
	draggable:false, 
	classes: "plist-landing",
	events: {
		onTogglePanel: "",
		onFocusEditPanel: ""
	},
	components: [
		{ name: "prayerView", 
			kind: "PrayerList.PrayerView",
			onOpenVersePanel:   "openVersePanel",
			onOpenJournalPanel: "openJournalPanel",
			onOpenEditPanel:    "openEditPanel",
			onGrabberTap: 		"toggleView"
		}
	],
	handlers: {
		//onClose: 			"closeTopPanel",
		// onSaveVerse:    "saveVerseItem",
		// onSaveJournal:  "saveJournalItem"
	},

	openVersePanel: function(inSender, inEvent) {
		this.log();
		var model;
		if (inEvent.verseItem) {
			model = inEvent.verseItem;
		} else {
			model = new PrayerList.BibleVerse({text:"",passage:"",version:""});
		}
		this.pushView(
			{ kind: "PrayerList.VerseInput",
				prayerId: inEvent.prayerId,
				model: model
			},
			{ owner: this }
		);
		this.doFocusEditPanel();
	},

	openJournalPanel: function(inSender, inEvent) {
		this.log();
		var model;
		if (inEvent.journalItem) {
			model = inEvent.journalItem;
		} else {
			model = new PrayerList.JournalEntry({content:"", entryDate:new Date(), answer: false});
		}
		this.pushView(
			{ kind: "PrayerList.JournalInput",
				prayerId: inEvent.prayerId,
				model: model
			},
			{ owner: this }
		);
		this.doFocusEditPanel();
	},

	openEditPanel: function(inSender, inEvent) {
		this.log();
		var model = inEvent.prayerItem;
		this.pushView(
			{ kind: "PrayerList.EditPrayer",
				model: model
			},
			{ owner: this }
		)
	},

	// saveVerseItem: function(inSender, inEvent) {
	// 	this.log();
	// 	pl.bibleVersesCollection.add(inEvent.model);
	// 	inEvent.model.commit();
	// },

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