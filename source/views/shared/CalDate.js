enyo.kind({
	name: "PrayerList.CalDate",
	classes: "calendar",
	published: {
		calendarDate: "",
		additionalStyles: ""
	},
	bindings: [
		{from: "calendarDate", to: "$.month.content", transform: "tfMonth"},
		{from: "calendarDate", to: "$.date.content", transform: "tfDate"},
	],
	components: [
		{ name: "month", classes: "cal-month" },
		{ name: "date", classes: "cal-date" }
	],

	rendered: function() {
		this.inherited(arguments);
		this.addStyles(this.additionalStyles);
	},

	// TODO: use try / catch to test
	
	tfMonth: function(value) {
		if (typeof value === "string") {
			var d = new Date(Date.parse(value));
			return d.toString().slice(4,7);
		} else if (typeof value === "object") {
			return value.toString().slice(4,7);
		}
	},

	tfDate: function(value) {
		if (typeof value === "string") {
			var d = new Date(Date.parse(value));
			return d.getDate();
		} else if (typeof value === "object") {
			return value.getDate();
		}
	}
});