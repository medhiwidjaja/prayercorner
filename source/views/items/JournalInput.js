enyo.kind({
	name: "PrayerList.JournalInput",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	events: {
		onCancel: "",
		onSave: ""
	},
	components: [
		{ name: "VITopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Back", classes: "text-button", ontap: "cancelInput" },
				{ fit: true },
				{ kind: "enyo.Button", content: "Save", classes: "text-button", ontap: "saveInput" }
			]
		},
		{ kind: "FittableColumns",
			components: [
				{ name: "journalDate", kind: "PrayerList.CalDate", 
					calendarDate: (new Date()).toUTCString().match(/\d{1,2}\s\w{3}\s\d{4}/)[0],
					additionalStyles: "color: #fdfff7;background-color: rgba(125,0,0,0.5);" 
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
				{ kind:"onyx.Checkbox", onchange:"checkboxChanged" },
				{ content: "Mark as answer", classes: "enyo-inline checkbox-label" }
			]
		},
		{ tag: "br" },
		{ fit: true },
	],

	cancelInput: function() {
		this.log(this.$.journalInput.value);
		this.$.journalInput.setValue("");
		this.doCancel();
	},

	saveInput: function() {
		var input = this.$.journalInput.value;
		var date = this.$.journalDate.calendarDate;
		this.$.journalInput.setValue("");
		this.doSave({title:input, createdDate:date, answer:this.answer});
		this.log({title:input, date:date, answer:this.answer});
	},

	checkboxChanged: function() {
		this.answer = !this.answer;
		this.log()
	}
});
