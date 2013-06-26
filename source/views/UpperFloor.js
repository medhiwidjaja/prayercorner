enyo.kind({ 
	name: "UpperFloor",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	draggable: false,
	components: [
		{ name: "UFTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber"},
				{ kind: "StylishHeader", title: "Personal" }
			]
		}, 
		{ name: "LivingRoom", 
			kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "FittableRows", classes: "living-room", components: [
					{ kind: "PrayerItem" },
					{ tag: "br" },
					{ kind: "StylishText", title: "Journal", classes: "watermark dark-red" },
					{ content: "Journal", fit: true, classes: "upperfloor-header" },

					{ kind: "JournalItemList" },
					{ kind: "AddJournalButton" },
					{ kind: "swash-small", classes: "swash-dark" },
					
					{ kind: "StylishText", title: "Biblical Promises", classes: "watermark dark-red" },
					{ content: "Biblical Promises", classes: "upperfloor-header" },
					
					{ kind: "BibleVerseList" },
					{ kind: "swash-big", classes: "swash-dark" },
					{ style: "margin-top:20px" }
				]}
			]
		},
		{ name: "UFBottomToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ content: "＋" },
				{ content: "Done", classes: "done-button", ontap: "close" }
			]
		}
	],

	close: function() {
		this.destroy();
	}
});



enyo.kind({
	name: "AddJournalButton",
	classes: "dark-red",
	components: [
		{ tag: "span", content: "＋", style: "font-size: 24px; padding: 0px 5px; border-radius: 4px; border: 1px solid #FFEFCB" }
	]
});


