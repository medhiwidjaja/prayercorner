enyo.kind({
	name: "PrayerList.PrayerQuickInput",
	kind: "Control",
	classes: "pl-input-container", 
	events: {
		onCancel: "",
		onSave: ""
	},
	components: [
		{ kind: "onyx.InputDecorator", 
			classes: "pl-input-decorator", 
			components: [
				{ name: "quickInput", kind: "enyo.TextArea", allowHtml: false,
					onchange: "saveInput",
					defaultFocus: true,
					style: "width:272px",
					placeholder: "Enter prayer item"
				}
			]
		},
		{ //layoutKind: "FittableColumnsLayout", 
			style: "margin: 4px 0px; width:100%",
			components: [
				{ kind: "enyo.Button", content: "Cancel", style: "float: left; width:68px", classes: "text-button", ontap: "cancelInput" },
				//{ fit: true },
				{ kind: "enyo.Button", content: "Save", style: "float: right; width:68px", classes: "text-button", ontap: "saveInput" }
			]
		}
	],

	cancelInput: function() {
		this.log(this.$.quickInput.value);
		this.$.quickInput.setValue("");
		this.doCancel();
	},

	saveInput: function() {
		this.log(this.$.quickInput.value);
		var input = this.$.quickInput.value;
		this.$.quickInput.setValue("");
		this.doSave({title:input});
	}

});
