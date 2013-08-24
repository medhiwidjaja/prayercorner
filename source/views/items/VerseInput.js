enyo.kind({
	name: "PrayerList.VerseInput",
	kind: "enyo.FittableRows",
	classes: "plist-upperfloor wide",
	events: {
		onClose: "",
		onSaveVerse: ""
	},
	bindings: [
		{from: ".model.text", to: ".$.verseText.value", oneWay: true},
		{from: ".model.passage", to: ".$.verseAddress.value", oneWay: true},
		{from: ".model.version", to: ".$.version.content", oneWay: true},
	],
	components: [
		{ name: "VITopToolbar", kind: "onyx.Toolbar", classes: "top-toolbar", 
			//layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Back", classes: "text-button", ontap: "cancelInput" },
				//{ content: "Add verse", fit: true },
				{ kind: "enyo.Button", content: "Save", classes: "text-button pull-right", ontap: "saveInput" }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			//fit: true,
			classes: "prayer-item-container decent-padding", 
			components: [
				{ tag: "br" },
				{ kind: "onyx.InputDecorator", 
					classes: "pl-input-decorator", 
					style: "width: 95%",
					components: [
						{ name: "verseText", kind: "onyx.RichText", allowHtml: true,
							defaultFocus: true, classes: "verse-item",
							placeholder: "Verse text"
						}
					]
				},
				{ kind: "onyx.InputDecorator", 
					//classes: "pl-input-decorator", 
					style: "margin-top: 10px; width: 92%",
					components: [
						{ name: "verseAddress", kind: "onyx.Input", 
							style: "width:100%;font-size: 18px;font-family: 'Alegreya SC';font-size: 0.9em;text-align: right;", 
							placeholder: "e.g. John 3:16-17"
						}
					]
				},
				{ name: "version", allowHtml: true }
			]
		},
		{ fit: true },
		{ name: "PVBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Get verse", classes: "text-button", ontap: "getVerse" },
				{ fit: true },
				{ kind: "enyo.Button", content: "Delete", classes: "text-button negative", ontap: "deleteVerse" }
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
		var passage = this.$.verseAddress.value;
		var version = this.$.version.content;
		if (this.model.isPersisted) {
			this.model.set("text", text);
			this.model.set("passage", passage);
			this.model.set("version", version);	
			this.model.commit();
		} else {
			// this.model.set("prayerId", this.prayerId);
			// this.model.set("isPersisted", true);
			// var params = JSON.parse(this.model.toJSON());
			// var verse = new PrayerList.BibleVerse(params);
			// verse.commit();
			pl.bibleVersesCollection.addItem({text:text, passage:passage, version: this.$.version.content, prayerId: this.prayerId});
		}
		this.$.verseText.setValue("");
		this.$.verseAddress.setValue("");
		this.doClose();
		this.log({text:text, passage:passage});
	},

	deleteVerse: function() {
		pl.bibleVersesCollection.removeItem(this.model);
		this.doClose();
		this.log();
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
		this.$.version.setContent(copy);
		this.render();
	}
});

// ESV API:
//  http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=John+3:16&include-verse-numbers=false&include-footnotes=false&include-passage-references=false&include-headings=false&include-short-copyright=false&include-word-ids=false&include-audio-link=false

