enyo.kind({
	name: "PrayerList.JournalInput",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	events: {
		onClose: "",
		onSaveJournal: ""
	},
	bindings: [
		{from: ".model.entryDate", to: ".$.journalDate.calendarDate", oneWay: true},
		{from: ".model.content", to: ".$.journalInput.value", oneWay: true},
		{from: ".model.answer", to: ".$.answerCheckbox.checked", oneWay: true},
	],
	components: [
		{ name: "VITopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Back", classes: "text-button", ontap: "cancelInput" },
				{ fit: true },
				{ kind: "enyo.Button", content: "Save", classes: "text-button", ontap: "saveInput" }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			//fit: true,
			classes: "prayer-item-container decent-padding", 
			components: [
				{ tag: "br" },
				{ kind: "FittableColumns",
					style: "width: 100%",
					components: [
						{ name: "journalDate", kind: "PrayerList.CalDate", 
							calendarDate: (new Date()).toUTCString().match(/\d{1,2}\s\w{3}\s\d{4}/)[0],
							additionalStyles: "margin-right:5px; color: #fdfff7;background-color: rgba(125,0,0,0.5);" 
						},
						{ kind: "onyx.InputDecorator", 
							classes: "pl-input-decorator", 
							fit: true,
							components: [
								{ name: "journalInput", kind: "enyo.TextArea", allowHtml: false,
									defaultFocus: true,
									//style: "100%",
									placeholder: "Enter journal item"
								}
							]
						}
					]
				},
				{ style:"margin-left: 35px", components: [
						{ name: "answerCheckbox", kind:"onyx.Checkbox", onchange:"checkboxChanged" },
						{ content: "Mark as answer", classes: "enyo-inline checkbox-label" }
					]
				},
			]
		},
		{ tag: "br" },
		{ fit: true },
		{ name: "VIBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ fit: true },
				{ kind: "enyo.Button", content: "Delete", classes: "text-button negative", ontap: "deleteJournal" }
			]
		}
	],

	// create: function() {
	// 	this.inherited(arguments);
	// 	if (this.journalItem) {
	// 		this.$.journalDate.set("calendarDate", this.journalItem.entryDate);
	// 		this.$.JournalInput.set("value", this.journalItem.content);
	// 	}
	// },

	cancelInput: function() {
		this.log(this.$.journalInput.value);
		this.$.journalInput.setValue("");
		this.doClose();
	},

	saveInput: function() {
		var input = this.$.journalInput.value;
		var date = this.$.journalDate.calendarDate;
		var answer = this.$.answerCheckbox.checked;
		if (this.model.isPersisted) {
			this.model.set("content", input);
			this.model.set("entryDate", date);
			this.model.set("answer", answer);
			this.model.commit();
		} else {
			pl.journalEntriesCollection.addItem({content: input, entryDate: date, answer: answer});
		}
		// var journal = new PrayerList.JournalEntry({content: input, entryDate: date, prayerId: this.prayerId});
		// journal.commit();
		// pl.journalEntriesCollection.add(journal);
		this.$.journalInput.setValue("");
		this.doClose();
		this.log({title:input, date:date, answer:answer});
	},

	checkboxChanged: function() {
		this.answer = !this.answer;
		this.log()
	},

	deleteJournal: function() {
		pl.journalEntriesCollection.removeItem(this.model);
		this.doClose();
		this.log();
	},
});
