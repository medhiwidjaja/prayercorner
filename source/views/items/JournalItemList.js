
enyo.kind({
	name: "PrayerList.JournalItemList",
	kind: "enyo.DataRepeater", 
	controller: "pl.journalEntriesCollection",		
	components: [
		{ style: "margin: 4px 0", layoutKind: "FittableColumnsLayout", components: [
			{ 
				kind: "PrayerList.CalDate", 
				bindFrom: ".createdDate", bindTo: "calendarDate",
				additionalStyles: "color: #fdfff7;background-color: rgba(125,0,0,0.5);" 
			},
			{
				kind: "enyo.Image", src:"assets/star_24x24.png", attributes: { width:"24px", height: "24px"},
				bindFrom: ".answer", bindTo: "showing", style: "height:24px; width:24px;margin-left:10px; vertical-align:middle"
			},
			{  
				fit: true, classes: "journal-entry middle",
				bindFrom: ".content"
			}
		]}
	]
});