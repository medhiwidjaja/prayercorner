enyo.kind({ 
	name: "PrayerList.PrayerView",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	draggable: false,
	bindings: [
		{from: ".model.title", to: ".$.prayerItem.content"},
		//{from: ".model", to: ".$.journals.model"}
	],
    events: {
    	onDoneEditing: "",
    	onGrabberTap: ""
    },
	components: [
		{ name: "PVTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", components: [
				{ kind: "onyx.Grabber", ontap: "topToolbarGrabberTap" },
				{ content: "Prayer", classes: "watermark" }
			]
		}, 
		{ name: "LivingRoom", 
			kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "FittableRows", classes: "prayer-item-container", components: [
					{ name: "prayerItem", classes: "dropcap-text" },
					{ tag: "br" },
					
					{ kind: "StylishText", title: "Journal", classes: "watermark dark-red" },
					{ content: "Journal", fit: true, classes: "upperfloor-header" },
					{ name: "journals", kind: "PrayerList.JournalItemList" },
					{ kind: "AddJournalButton" },
					{ kind: "swash", type: "s", shade: "dark" },
					
					{ kind: "StylishText", title: "Biblical Promises", classes: "watermark dark-red" },
					{ content: "Biblical Promises", classes: "upperfloor-header" },
					
					{ name: "verses", kind: "PrayerList.BibleVerseList" },
					{ kind: "swash", type: "w", shade: "dark" },
					{ style: "margin-top:20px" }
				]}
			]
		},
		{ name: "PVBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ content: "＋" },
				{ content: "Done", classes: "done-button", ontap: "close" },
				{ fit: true }
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
		this.doDoneEditing();
		this.log();
	},

	topToolbarGrabberTap: function() {
		this.doGrabberTap();
		this.log();
	}
});



enyo.kind({
	name: "AddJournalButton",
	classes: "dark-red",
	components: [
		{ tag: "span", content: "＋", style: "font-size: 20px; padding: 0px 5px; border-radius: 4px; border: 1px solid #FFEFCB" }
	]
});


