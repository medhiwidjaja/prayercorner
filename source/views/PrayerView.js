enyo.kind({ 
	name: "PrayerList.PrayerView",
	kind: "enyo.FittableRows",
	mixins: ["enyo.AutoBindingSupport"],
	classes: "plist-upperfloor wide",
	draggable: false,
	bindSource: "controller",
	controller: "pl.prayersCollection",
    events: {
    	onClosePanel: "",
    	onGrabberTap: "",
    	onOpenJournalPanel: "",
    	onOpenVersePanel: ""
    },
	components: [
		{ name: "PVTopToolbar", 
			kind: "onyx.Toolbar", 
			classes: "top-toolbar", 
			components: [
				{ kind: "onyx.Grabber", ontap: "topToolbarGrabberTap" },
				{ content: "Prayer", classes: "watermark decent-padding" },
				//{ fit: true },
				{ kind: "onyx.IconButton", src: "assets/Onyx-Icons-Examples-LightBkgrnd-Cross.png", classes: "close-button pull-right", ontap: "close" }
			]
		}, 
		{ name: "LivingRoom", 
			kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "FittableRows", classes: "prayer-item-container", components: [
					{ name: "prayerItem", bindFrom: ".selected.title", classes: "dropcap-text decent-padding" },
					{ tag: "br" },
					{ content: "Journal", style:"left:50px", classes: "watermark dark-red" },
					{ content: "Journal", classes: "upperfloor-header decent-padding" },
					{ name: "journals", kind: "PrayerList.JournalItemList" },
					{ kind: "swash", type: "s", shade: "dark" },
					
					{ content: "Biblical Promises", classes: "watermark dark-red" },
					{ content: "Biblical Promises", classes: "upperfloor-header decent-padding" },
					
					{ name: "verses", kind: "PrayerList.BibleVerseList" },
					{ tag: "br" },
					{ kind: "swash", type: "w", shade: "dark" },
					//{ fit: true }, 
					//{ style: "margin-top:20px" }
				]}
			]
		},
		{ name: "PVBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "＋Journal", classes: "text-button", ontap: "addJournal" },
				{ kind: "enyo.Button", content: "＋Verse", classes: "text-button", ontap: "addVerse" },
				{ fit: true },
				{ kind: "enyo.Button", content: "Delete", classes: "text-button negative", ontap: "deleteItem" }
			]
		}
	],

	// TODO: create function(): setup journals controller
	render: function() {
		this.inherited(arguments);
		this.$.journals.render();
		this.$.verses.render();
	},

	close: function() {
		//this.doClosePanel();
		this.bubble("onClosePanel");
		//enyo.Signals.send("onClosePrayerPanels");
		this.log();
	},

	topToolbarGrabberTap: function() {
		this.doGrabberTap();
		this.log();
	},

	addJournal: function() {
		this.doOpenJournalPanel({prayerId: this.controller.selected.id});
        this.log();
	},

	addVerse: function() {
		this.doOpenVersePanel({prayerId: this.controller.selected.id});
		this.log();
    },	

    deleteItem: function() {
    	this.log();
    	this.close();
    }
});



