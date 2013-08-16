enyo.kind({
	name: "PrayerList.VerseInput",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	events: {
		onCancel: "",
		onSave: ""
	},
	components: [
		{ name: "VITopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Back", classes: "text-button", ontap: "cancelInput" },
				{ fit: true },
				{ kind: "enyo.Button", content: "Save", classes: "text-button", ontap: "saveInput" }
			]
		},
		{ classes: "prayer-item-container", components: [
			{ kind: "onyx.InputDecorator", 
				classes: "pl-input-decorator", 
				components: [
					{ name: "verseText", kind: "onyx.TextArea", allowHtml: true,
						defaultFocus: true, style: "width:265px; height:200px;font-size: 18px;", classes: "verse-item",
						placeholder: "Verse text"
					}
				]
			},
			{ kind: "onyx.InputDecorator", 
				//classes: "pl-input-decorator", 
				components: [
					{ name: "verseAddress", kind: "enyo.Input", 
						style: "width:265px; font-size: 18px;font-family: 'Alegreya SC';font-size: 0.9em;text-align: right;", 
						placeholder: "Enter Verse"
					}
				]
			}
		]},
		{ fit: true },
		// { name: "PVBottomToolbar", 
		// 	kind: "onyx.Toolbar", 
		// 	classes: "bottom-toolbar", 
		// 	layoutKind: "FittableColumnsLayout",
		// 	components: [
		// 		{ fit: true },
		// 		{ kind: "enyo.Button", content: "Get verse", classes: "text-button", ontap: "getVerse" }
		// 	]
		// }
	],

	cancelInput: function() {
		this.log(this.$.verseText.value);
		this.$.verseText.setValue("");
		this.$.verseAddress.setValue("");
		this.doCancel();
	},

	saveInput: function() {
		var text = this.$.verseText.value;
		var verse = this.$.verseAddress.value;
		this.$.verseText.setValue("");
		this.$.verseAddress.setValue("");
		this.doSave({text:text, verse:verse});
		this.log({text:text, verse:verse});
	},

	// This doesn't work
	getVerse: function() {
		var passage = this.$.verseAddress.value;
		var xmlHttp = null;
		var theUrl = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage="+passage+"&include-verse-numbers=false&include-footnotes=false&include-passage-references=false&include-headings=false&include-short-copyright=false&include-word-ids=false&include-audio-link=false"
	    xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false );
	    xmlHttp.send( null );
	    this.$.verseText.setValue(xmlHttp.responseText);
	},

	processResponse: function(inSender, inResponse) {
		// do something with it
		this.$.verseText.setValue(inResponse);
	}
});

// ESV API:
//  http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=John+3:16&include-verse-numbers=false&include-footnotes=false&include-passage-references=false&include-headings=false&include-short-copyright=false&include-word-ids=false&include-audio-link=false

