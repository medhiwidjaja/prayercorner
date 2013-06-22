enyo.kind({
	name: "CalDate",
	style: "min-width: 30px; border: 1px solid; border-radius: 4px; padding: 3px 4px 1px; vertical-align: middle; text-align: center",
	published: {
		month: "",
		date:  "",
		additionalStyles: ""
	},
	components: [
		{ name: "month", classes: "cal-month" },
		{ name: "date", classes: "cal-date" }
	],

	rendered: function() {
		this.inherited(arguments);
		this.$.month.setContent(this.month);
		this.$.date.setContent(this.date);
		this.addStyles(this.additionalStyles);
	}
});