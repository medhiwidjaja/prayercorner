
enyo.kind({
	name: "PrayerList.ScheduledItemEdit",
	//controller: "pl.editCategoryController",
	bindings: [
		{ from: ".controller.model.title", to: ".$.groupName.value", oneWay: false, transform: "checkNull" },
		{ from: ".controller.model.daily", to: ".$.scheduleDailyCheckbox.checked", oneWay: false },
		{ from: ".controller.model.weekly", to: ".$.scheduleWeeklyCheckbox.checked", oneWay: false },
		{ from: ".controller.model.weekDays", to: ".dayMap" }  // This doesn't work
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
			{ name: "dayMap" },
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
					{ kind: "Repeater", count: 7, onSetupItem: "setupLabel", components: [
						{ name: "labels", tag: "td", components: [
							{ name: "weekdayLabel" }
						]}
					]}
				]},
				{ tag: "tr", components: [
					{ name: "weekdayRepeater", kind: "Repeater", count: 7, onSetupItem: "setupCheckbox", components: [
						{ tag: "td", components: [
							{ name: "weekdayCheckbox", kind:"onyx.Checkbox", onchange:"weekdayCheckboxChanged" }
						]}
					]}
				]}
			]}
		]}
	],
	
	weekDays: ["S", "M", "T", "W", "T", "F", "S"],
	//daysFlags: [ 1<<0, 1<<1, 1<<2, 1<<3, 1<<4, 1<<5, 1<<6],

	setupLabel: function(inSender, inEvent) {
		inEvent.item.$.weekdayLabel.setContent(this.weekDays[inEvent.index]);
		return true;
	},

	setupCheckbox: function(inSender, inEvent) {
		// FIXME: hardcoded with pl.editCategoryController. Should be replaced with bindings when it works.
		this.dayMap = pl.editCategoryController.model.weekDays;
		var control = inEvent.item.$.weekdayCheckbox;
		control.checked = !!(this.dayMap & 1<<inEvent.index);
		// Disable control if it's scheduled for everyday
		var flag = pl.editCategoryController.model.daily;
		control.set("disabled", flag);
		return true;
	},
	
	dailyCheckboxChanged: function(inSender, inEvent) {
		var value = inSender.getValue();
		if (value) {
			// Disable weekdayCheckboxes
			enyo.forEach(this.$.weekdayRepeater.children, function(x) { x.$.weekdayCheckbox.set("disabled",true) })
		}
		// Two-way bindings don't seem to work for this. Set the values here:
		this.controller.model.set("daily", value);
		this.controller.model.set("weekly", !value);
		this.log(inSender.name + ": " + inSender.getValue());
	},

	weeklyCheckboxChanged: function(inSender, inEvent) {
		var value = inSender.getValue();
		if (value) {
			// Enable weekdayCheckboxes
			enyo.forEach(this.$.weekdayRepeater.children, function(x) { x.$.weekdayCheckbox.set("disabled",false) })
		// } else {
		// 	// Disable weekdayCheckboxes
		// 	enyo.forEach(this.$.weekdayRepeater.children, function(x) { x.$.weekdayCheckbox.set("disabled",true) })
		}
		// Two-way bindings don't seem to work for this. Set the values here:
		this.controller.model.set("daily", !value);
		this.controller.model.set("weekly", value);
		this.log(inSender.name + ": " + inSender.getValue());
	},

	weekdayCheckboxChanged: function(inSender, inEvent) {
		var originator = inEvent.originator;
		var num = inEvent.index;
		var weekDays = this.dayMap || 0;
		this.controller.model.set("weekDays", weekDays ^ 1<<num);
		this.log(originator.name + " (" + this.weekDays[num] + ") : " + originator.checked);
	},

	checkNull: function(x) {
		return x ? x : ""
	}
})