// TODO: use JournalListController for DataRepeater

enyo.kind({
	name: "PrayerList.JournalItemList",
	kind: "enyo.DataRepeater", 
	//kind: "enyo.Repeater", onSetupItem: "setupItem",
	controller: "pl.journalEntriesCollection",		
	components: [
		{ style: "margin: 4px 0", layoutKind: "FittableColumnsLayout", components: [
			{ //name: "journalDate", 
				kind: "PrayerList.CalDate", 
				bindFrom: ".createdDate", bindTo: "calendarDate",
				additionalStyles: "color: #7d0000;" },
			{ //name: "journalEntry", 
				fit: true, classes: "journal-entry middle",
				bindFrom: ".content"
			}
		]}
		// { name: "journalDate", kind: "CalDate"},
		// { name: "journalEntry", classes: "journal-entry middle"}
	],

	// create: function() {
	// 	this.inherited(arguments);
	// 	this.setCount(this.controller.length);
	// },
	// setupItem: function(inSender, inEvent) {
	// 	var journalItem = this.controller.data()[inEvent.index];
	// 	var item = inEvent.item;
	// 	item.$.journalDate.set("calDate", journalItem.journalDate());
	// 	//item.$.journalDate.setDate(journalItem.date);
	// 	item.$.journalEntry.setContent(journalItem.entry);
	// 	return true;
	// },
	// list: [
	// 	{
	// 		entry: "Dad got a new job.",
	// 	 	month: "Feb", date: "22"
	// 	},
	// 	{
	// 		entry: "Got acceptance letters from Bob and Fiona’s schools.",
	// 		month: "May", date: "3" 
	// 	}
	// ]
});