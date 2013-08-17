enyo.kind({ 
	name: "PrayerList.PrayerView",
	kind: "enyo.FittableRows",
	mixins: ["enyo.AutoBindingSupport"],
	classes: "plist-upperfloor wide",
	draggable: false,
	// published: {
	// 	model: ""
	// },
	bindings: [
		{from: ".model.title", to: ".$.prayerItem.content"},
		//{from: }
		//{from: ".model", to: ".$.journals.model"}
	],
    events: {
    	onDoneEditing: "",
    	onGrabberTap: "",
    	onAddJournalItem: "",
    	onAddVerseItem: ""
    },
	components: [
		{ name: "PVTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", components: [
				{ kind: "onyx.Grabber", ontap: "topToolbarGrabberTap" },
				{ name: "testBinding", content: this.test2 },
				{ content: "Prayer", classes: "watermark" }
			]
		}, 
		{ name: "LivingRoom", 
			kind: "enyo.Scroller",
			mixins: ["enyo.AutoBindingSupport"], 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "FittableRows", classes: "prayer-item-container", components: [
					//{ name: "prayerItem", classes: "dropcap-text", bindFrom: ".model.title", bindTo: "content" },
					{ name: "prayerItem", classes: "dropcap-text" },
					{ tag: "br" },
					{ kind: "StylishText", title: "Journal", style:"left:50px", classes: "watermark dark-red" },
					{ content: "Journal", fit: true, classes: "upperfloor-header" },
					{ name: "journals", kind: "PrayerList.JournalItemList" },
					// { name: "journalInputRow", showing: false,
					// 	components: [
					// 		{name: "journalInputControl", kind: "PrayerList.JournalInput", 
					// 			onCancel: "cancelJournalItem", onSave: "saveJournalItem" 
					// 		}
					// 	]
					// },
					// { tag: "div" },
					{ name: "addJournalButton", kind: "enyo.Button", content: "＋", classes: "ding-button",
						style: "background: #FDFFF7",
						ontap: "showJournalInputArea" 
					},
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
				{ kind: "enyo.Button", content: "＋Journal", classes: "text-button", ontap: "showJournalInputArea" },
				{ kind: "enyo.Button", content: "＋Verse", classes: "text-button", ontap: "addVerse" },
				{ fit: true },
				{ kind: "enyo.Button", content: "Done", classes: "text-button", ontap: "close" }
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
	},

	// showJournalInputArea: function() {
	// 	this.$.journalInputRow.setShowing(true);
	// 	this.$.addJournalButton.setShowing(false);
	// 	// A hack to force the FittableColumns to calculate the width of the journalInputControl
	// 	this.render();	
	// 	//this.doAddJournalItem();
	// 	this.log();
	// },

	// cancelJournalItem: function() {
	// 	this.$.journalInputRow.setShowing(false);
	// 	this.$.addJournalButton.setShowing(true);
	// 	this.log();
	// },

	// saveJournalItem: function(inSender, inEvent) {
	// 	this.$.journals.controller.addItem(inEvent);
	// 	// this.$.journalInputRow.setShowing(false);
	// 	// this.$.addJournalButton.setShowing(true);
	// 	this.log();
	// },

	addJournal: function() {
		this.doAddJournalItem({prayer: this.model});
        this.log();
	},

	addVerse: function() {
		this.log();
    },	
});



enyo.kind({
	name: "AddJournalButton",
	classes: "dark-red",
	components: [
		{ tag: "span", content: "＋", style: "font-size: 20px; padding: 0px 1px; border-radius: 4px; border: 1px solid #FFEFCB" }
	]
});

// enyo.kind({
// 	name: "PrayerList.JournalInput",
// 	kind: "Control",
// 	//classes: "pl-input-container", 
// 	events: {
// 		onCancel: "",
// 		onSave: ""
// 	},
// 	answer: false,
// 	components: [
// 		{ kind: "FittableColumns",
// 			components: [
// 				{ name: "journalDate", kind: "PrayerList.CalDate", 
// 					calendarDate: (new Date()).toUTCString().match(/\d{1,2}\s\w{3}\s\d{4}/)[0],
// 					additionalStyles: "color: #fdfff7;background-color: rgba(125,0,0,0.5);" 
// 				},
// 				{ kind: "onyx.InputDecorator", 
// 					classes: "pl-input-decorator", 
// 					fit: true,
// 					components: [
// 						{ name: "journalInput", kind: "enyo.TextArea", allowHtml: false,
// 							defaultFocus: true,
// 							//style: "100%",
// 							placeholder: "Enter journal item"
// 						}
// 					]
// 				}
// 			]
// 		},
// 		{ style:"margin-left: 35px", components: [
// 				{ kind:"onyx.Checkbox", onchange:"checkboxChanged" },
// 				{ content: "Mark as answer", classes: "enyo-inline checkbox-label" }
// 			]
// 		},
// 		{ tag: "br" },
// 		{ //layoutKind: "FittableColumnsLayout", 
// 			style: "margin: 4px 0px; width:100%; height:35px;",
// 			components: [
// 				{ kind: "enyo.Button", content: "Cancel", style: "float: left; width:68px", classes: "text-button", ontap: "cancelInput" },
// 				{ kind: "enyo.Button", content: "Save", style: "float: right; width:68px", classes: "text-button", ontap: "saveInput" }
// 			]
// 		}
// 	],

// 	cancelInput: function() {
// 		this.log(this.$.journalInput.value);
// 		this.$.journalInput.setValue("");
// 		this.doCancel();
// 	},

// 	saveInput: function() {
// 		var input = this.$.journalInput.value;
// 		var date = this.$.journalDate.calendarDate;
// 		this.$.journalInput.setValue("");
// 		this.doSave({title:input, createdDate:date, answer:this.answer});
// 		this.log({title:input, date:date, answer:this.answer});
// 	},

// 	checkboxChanged: function() {
// 		this.answer = !this.answer;
// 		this.log()
// 	}

// });

