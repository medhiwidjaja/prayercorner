enyo.kind({ 
	name: "PrayerList.PrayerView",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	draggable: false,
	bindings: [
		{from: ".model.title", to: ".$.prayerItem.content"},
		//{from: ".model", to: ".$.journals.model"}
	],
	components: [
		{ name: "PVTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", components: [
				{ kind: "onyx.Grabber"},
				{ content: "Prayer", classes: "watermark" }
			]
		}, 
		{ name: "LivingRoom", 
			kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "FittableRows", classes: "living-room", components: [
					{ name: "prayerItem", classes: "dropcap-text" },
					{ tag: "br" },
					{ kind: "StylishText", title: "Journal", classes: "watermark dark-red" },
					{ content: "Journal", fit: true, classes: "upperfloor-header" },

					{ name: "journals", kind: "PrayerList.JournalItemList" },
					// {	name: "journals",
					// 	kind: "enyo.DataRepeater",
					// 	controller: "pl.journalEntriesCollection",
					// 	components: [
					// 		{ bindFrom: ".content", classes: "journal-entry middle" },
					// 		{ content: "title" },
					// 		{ tag: "hr"}
					// 		// { style: "margin: 4px 0", layoutKind: "FittableColumnsLayout", components: [
					// 		// 	{ //name: "journalDate", 
					// 		// 		kind: "CalDate", 
					// 		// 		bindFrom: ".journalDate", bindTo: "calDate",
					// 		// 		additionalStyles: "color: #7d0000;" },
					// 		// 	{ //name: "journalEntry", 
					// 		// 		fit: true, classes: "journal-entry middle",
					// 		// 		bindFrom: ".content"
					// 		// 	}
					// 		// ]}
					// 	]
					// },
					{ kind: "AddJournalButton" },
					{ kind: "swash-small", classes: "swash-dark" },
					
					{ kind: "StylishText", title: "Biblical Promises", classes: "watermark dark-red" },
					{ content: "Biblical Promises", classes: "upperfloor-header" },
					
					{ name: "verses", kind: "PrayerList.BibleVerseList" },
					{ kind: "swash-big", classes: "swash-dark" },
					{ style: "margin-top:20px" }
				]}
			]
		},
		{ name: "PVBottomToolbar", kind: "onyx.Toolbar", classes: "bottom-toolbar", components: [
				{ content: "＋" },
				{ content: "Done", classes: "done-button", ontap: "close" }
			]
		}
	],

	// TODO: create function(): setup journals controller

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


