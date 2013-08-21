enyo.kind({
	name: "PrayerList.EditCategory",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
	//draggable: false,
	published: {

	},

	controller: "pl.editCategoryController",
	// bindings: [
	// 	{from: ".model.title", to: "$.tbtitle.content"},
	// ],
	components: [
		{ name: "ECTopToolbar", 
			kind: "onyx.Toolbar", 
			classes: "top-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Cancel", classes: "text-button", ontap: "cancel" },
				{ name: "toolbarHeader", kind: "StylishHeader", title: "Edit Category", fit: true, watermark: false },
				{ kind: "enyo.Button", content: "Done", classes: "text-button", ontap: "done" }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ tag: "br" },
				{ kind: "GroupEditFields", classes: "living-room" },
				{ tag: "br" },
				{ kind: "swash", type: "w", shade: "dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "ECBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ fit: true },
				{ kind: "enyo.Button", content: "Delete", classes: "text-button negative", ontap: "showConfirm" }
				// { kind: "onyx.MenuDecorator", 
				// 	//style: "display:inline-block;float:right",
				// 	components: [
				// 		{ kind: "enyo.Button", content: "Delete", classes: "text-button negative" },
				// 		{ kind: "onyx.ContextualPopup",
				// 			style: "width: 250px",
				// 			title: "Confirm",
				// 			floating: true,
				// 			actionButtons: [
				// 				{ kind: "enyo.Button", content: "Delete", classes: "text-button negative" },
				// 				{ kind: "enyo.Button", content: "Cancel", classes: "text-button" }
				// 			]
				// 		}
				// 	]
				// }
			]
		}
	]
})



enyo.kind({
	name: "GroupEditFields",
	controller: "pl.editCategoryController",
	bindings: [
		{ from: ".controller.model.title", to: ".$.groupName.value", oneWay: false, transform: "prettify" },
		{ from: ".controller.model.daily", to: ".$.groupEditFields.$.scheduleDailyCheckbox.checked", oneWay: false },
		{ from: ".controller.model.weekly", to: ".$.groupEditFields.$.scheduleWeeklyCheckbox.checked", oneWay: false },
	],
	classes: "pl-input-container",
	
	components: [
		{kind: "onyx.InputDecorator", classes: "pl-input-decorator", style: "width: 95%", 
			components: [
				{name: "groupName", kind: "onyx.TextArea", classes: "pl-input",
					placeholder: "Name"
				}
			]
		},
		{ kind: "swash", type: "s", shade: "dark" },	 
		{ classes: "schedule-section", components: [
			{ content: "Schedule:",  },
			{ kind: "Group", 
				components: [
					{ components: [
							{ name: "scheduleDailyCheckbox", kind:"onyx.Checkbox", onchange:"dailyCheckboxChanged" },
							{ content: "Every day", classes: "enyo-inline checkbox-label" }
						]
					},
					{ tag: "br" },
					{ components: [
							{ name: "scheduleWeeklyCheckbox", kind:"onyx.Checkbox", onchange:"weeklyCheckboxChanged" },
							{ content: "Every week on:", classes: "enyo-inline checkbox-label" },
						]
					}
				]
			},
			{ tag: "table", components: [
				{ tag: "tr", components: [
					{ kind: "Repeater", count: 7, onSetupItem: "setupItem", components: [
						{ name: "labels", tag: "td", components: [
							{ name: "weekdayLabel" }
						]}
					]}
				]},
				{ tag: "tr", components: [
					{ kind: "Repeater", count: 7, components: [
						{ tag: "td", components: [
							{ kind:"onyx.Checkbox", onchange:"weekdayCheckboxChanged" }
						]}
					]}
				]}
			]}
		]}
	],
	
	weekDays: ["S", "M", "T", "W", "T", "F", "S"],

	setupItem: function(inSender, inEvent) {
		inEvent.item.$.weekdayLabel.setContent(this.weekDays[inEvent.index]);
		return true;
	},
	
	dailyCheckboxChanged: function(inSender, inEvent) {
		var value = inSender.getValue();
		this.controller.model.set("daily", value);
		this.controller.model.set("weekly", !value);
		this.log(inSender.name + ": " + inSender.getValue());
	},

	weeklyCheckboxChanged: function(inSender, inEvent) {
		var value = inSender.getValue();
		this.controller.model.set("daily", !value);
		this.controller.model.set("weekly", value);
		this.log(inSender.name + ": " + inSender.getValue());
	},

	weekdayCheckboxChanged: function(inSender, inEvent) {
		var originator = inEvent.originator;
		var num = inEvent.index;
		this.log(originator.name + " (" + this.weekDays[num] + ") : " + originator.checked);
	}
})

