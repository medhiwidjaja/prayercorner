
enyo.kind({
	name: "JournalItemList",
	// mixins: ["enyo.AutoBindingSupport"],
	// bindSource: "model",
	components: [
		{ kind: "enyo.Repeater", onSetupItem: "setupItem", components: [
			{ name: "item", style: "margin: 4px 0", layoutKind: "FittableColumnsLayout", components: [
				{ name: "journalDate", 
					kind: "CalDate", 
					//bindFrom: ".",
					additionalStyles: "color: #7d0000;" },
				{ name: "journalEntry", fit: true, classes: "journal-entry middle" }
			]}
		]},
	],
	create: function() {
		this.inherited(arguments);
		this.$.repeater.setCount(this.list.length);
	},
	setupItem: function(inSender, inEvent) {
		var journalItem = this.list[inEvent.index];
		var item = inEvent.item;
		item.$.journalDate.setMonth(journalItem.month);
		item.$.journalDate.setDate(journalItem.date);
		item.$.journalEntry.setContent(journalItem.entry);
		return true;
	},
	list: [
		{
			entry: "Dad got a new job.",
		 	month: "Feb", date: "22"
		},
		{
			entry: "Got acceptance letters from Bob and Fiona’s schools.",
			month: "May", date: "3" 
		}
	]
});