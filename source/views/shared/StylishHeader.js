
enyo.kind({
	name: "StylishHeader",
	style: "text-align: center",
	classes: "script-text",
	published: {
		title: "",
		watermark: ""
	},
	components: [
		{ name: "watermark", classes: "stylish-text watermark" },
		//{ name: "headertext", classes: "stylish-text dark-red" },
		{ tag: "span", name: "firstLetter", classes: "swashy-script dark-red" },
		{ tag: "span", name: "theRest", classes: "dark-red" }
	],
	rendered: function() {
		this.inherited(arguments);
		//this.$.headertext.setContent(this.title);
		if (this.watermark) {
			this.$.watermark.setContent(this.title);
		};
		this.$.firstLetter.setContent(this.title[0]);
		this.$.theRest.setContent(this.title.slice(1));
	}
});

enyo.kind({
	name: "StylishText",
	published: {
		title: ""
	},
	components: [
		{ tag: "span", name: "firstLetter", classes: "swashy-script" },
		{ tag: "span", name: "theRest" },	
	],
	rendered: function() {
		this.inherited(arguments);
		this.$.firstLetter.setContent(this.title[0]);
		this.$.theRest.setContent(this.title.slice(1));
	}
});