enyo.kind({
	name: "swash",
	style: "text-align:center",
	components: [{
		kind: "enyo.Image",
		attributes: {
			width: "40px"
		},
		published: {
			type: "s",		// s or w
			shade: "dark"	// dark or light
		},
	}],

	create: function() {
		this.inherited(arguments);
		this.$.image.setSrc("/assets/"+this.shade+"-swash-"+this.type+".png");
	}

});

enyo.kind({
	name: "swash-small",
	content: "",
	classes: "swash swash-small"
});

enyo.kind({
	name: "swash-big",
	content: "",
	classes: "swash swash-big"
});

