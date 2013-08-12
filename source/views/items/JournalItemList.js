
enyo.kind({
	name: "PrayerList.JournalItemList",
	kind: "enyo.DataRepeater", 
	controller: "pl.journalEntriesCollection",		
	components: [
		{ style: "margin: 4px 0", layoutKind: "FittableColumnsLayout", components: [
			{ 
				kind: "PrayerList.CalDate", 
				bindFrom: ".createdDate", bindTo: "calendarDate",
				additionalStyles: "color: #fdfff7;background-color: #7d0000;" },
			{  
				fit: true, classes: "journal-entry middle",
				bindFrom: ".content"
			}
		]}
	]
});