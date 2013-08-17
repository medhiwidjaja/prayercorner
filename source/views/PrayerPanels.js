enyo.kind({
	name: "PrayerList.PrayerPanels",
	kind: "PrayerList.TwoPlyPanel",
	draggable:false, 
	classes:"panels enyo-fit plist-groundfloor",
	events: {
		onGrabberTap: "",
		onClosePanel: ""
	},
	mixins: ["enyo.AutoBindingSupport"],
	test: "This is from PrayerPanels",
	components: [
		{ name: "prayerView", 
			kind: "PrayerList.PrayerView",
			onOpenVersePanel:   "openVersePanel",
			onSaveVerseItem:    "saveVerseItem",
			onopenJournalPanel: "openJournalItem",
			onSaveJournalItem:  "saveJournalItem",
			onCloseTopPanel:    "closeTopPanel", 
			test2: "",
			bindFrom: ".test",
			bindTo: "test2"
		}
	],

	create: function() {
		this.inherited(arguments);
		this.$.prayerView.model = this.model;
		pl.prayersCollection.select(this.model.id);
		pl.journalEntriesCollection.filterPrayer(this.model);
		pl.bibleVersesCollection.filterPrayer(this.model);
	},

	openVersePanel: function(inSender, inEvent) {
        this.log();
        this.pushView(
            { kind: "PrayerList.VerseInput",
                prayerId: inEvent.prayer.id,
            },
            { owner: this }
        )
	},

	closeTopPanel: function() {
		this.popView();
	}
})