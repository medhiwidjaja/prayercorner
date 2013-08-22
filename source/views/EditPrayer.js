enyo.kind({
	name: "PrayerList.EditPrayer",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	events: {
		onClose: "",
		onSaveEdits: ""
	},
	bindings: [
		{from: ".model.title", to: ".$.title.value", oneWay: true},
		// {from: ".model.content", to: ".$.journalInput.value", oneWay: true},
		// {from: ".model.answer", to: ".$.answerCheckbox.checked", oneWay: true},
	],
	components: [
		{ name: "EPTopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", 
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
				{ kind: "onyx.InputDecorator", 
					classes: "pl-input-decorator", 
					style: "width: 95%",
					components: [
						{ name: "title", kind: "enyo.TextArea", 
							defaultFocus: true, style: "font-size: 18px;", 
							placeholder: "Prayer request"
						}
					]
				}
			]
		},
		// { tag: "br" },
		// { fit: true },
		// { name: "VIBottomToolbar", 
		// 	kind: "onyx.Toolbar", 
		// 	classes: "bottom-toolbar", 
		// 	layoutKind: "FittableColumnsLayout",
		// 	components: [
		// 		{ fit: true },
		// 		{ kind: "enyo.Button", content: "Delete", classes: "text-button negative", ontap: "deleteJournal" }
		// 	]
		// }
	],

	cancelInput: function() {
		this.log(this.$.title.value);
		this.doClose();
	},

	saveInput: function() {
		var title = this.$.title.value;

		this.model.set("title", title);
		this.model.commit();

		this.doClose();
		this.log({title:title});
	}
});