enyo.kind({
	name: "PrayerList.VerseInput",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	events: {
		onClose: "",
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
					{ name: "verseText", kind: "onyx.RichText", allowHtml: true,
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
						placeholder: "Enter passage, e.g. John 3:16-17"
					}
				]
			},
			{ name: "copyright", allowHtml: true }
		]},
		{ fit: true },
		{ name: "PVBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ fit: true },
				{ kind: "enyo.Button", content: "Get verse", classes: "text-button", ontap: "getVerse" }
			]
		}
	],

	cancelInput: function() {
		this.log(this.owner);
		this.$.verseText.setValue("");
		this.$.verseAddress.setValue("");
		this.doClose();
	},

	saveInput: function() {
		var text = this.$.verseText.value;
		var verse = this.$.verseAddress.value;
		this.$.verseText.setValue("");
		this.$.verseAddress.setValue("");
		this.doSave({text:text, verse:verse});
		this.log({text:text, verse:verse});
	},

	getVerse: function() {
		var passage = this.$.verseAddress.value;
		var jsonp = new enyo.JsonpRequest({
				url: "http://labs.bible.org/api/?passage="+passage+"&type=json",
				callbackName: "callback"
		});
		jsonp.go();
		jsonp.response(this, "processResponse");
	},

	processResponse: function(inSender, inResponse) {
		var response = enyo.map(inResponse, function(o){return o.text})
					.reduce(function(a, b) {return a.concat(b);})
		var text = response.slice(0,response.search("\<a"))
		var copy = response.slice(response.search("\<a"),response.length)
		this.$.verseText.setValue(text);
		this.$.copyright.setContent(copy);
		this.render();
	}
});

// ESV API:
//  http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=John+3:16&include-verse-numbers=false&include-footnotes=false&include-passage-references=false&include-headings=false&include-short-copyright=false&include-word-ids=false&include-audio-link=false

