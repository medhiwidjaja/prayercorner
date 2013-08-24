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
		{from: ".model.entryDate", to: ".$.datePicker.value", transform: "convertDate" }
	],
	components: [
		{ name: "VITopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", 
			//layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Back", classes: "text-button", ontap: "cancelInput" },
				//{ fit: true },
				{ kind: "enyo.Button", content: "Save", classes: "text-button pull-right", ontap: "saveInput" }
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
							calendarDate: new Date(), // (new Date()).toUTCString().match(/\d{1,2}\s\w{3}\s\d{4}/)[0],
							additionalStyles: "margin-right:5px; color: #fdfff7;background-color: rgba(125,0,0,0.5);" ,
							ontap: "showDateFields"
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
				{ style:"margin-top: 20px; text-align:center", components: [
					{ name:"datePicker", 
						kind:"onyx.DatePicker", 
						showing: false, 
						minYear:1900, maxYear:2100,
						onSelect: "setDate"
					}
				]}
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
		this.doClose();
		this.log({title:input, date:date, answer:answer});
	},

	showDateFields: function() {
		this.$.datePicker.set("showing", true)
	},

	formatDate: function(date) {
		return date.toUTCString().match(/\d{1,2}\s\w{3}\s\d{4}/)[0]
	},

	convertDate: function(src) {
		var date = new Date(src);
		if (date == "Invalid Date") {
			date = new Date();
		}
		return date;
	},

	setDate: function(inSender, inEvent) {
		this.$.journalDate.set("calendarDate", inEvent.value); //this.formatDate(inEvent.value));
		this.log(inEvent.value)
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
