enyo.kind({
	name: 					"Foreplot.ArticleRow",
	classes:				"message",

	published: {
		item:				null,
		user:				null
	},
	events: {
		onTapHashTag:		"",
		onTapUser:			"",
		onTapLink:			""
	},
	handlers: {
		ontap:				"handleTap",
		onclick:			"preventClick"
	},
	components: [{
		name:				"thumbnail",
		classes:			"thumbnail"
	},{
		name:				"title",
		classes:			"title"
	},{
		name:				"username",
		classes:			"username"
	},{
		tag:				"br"
	},{
		name:				"description",
		classes:			"description",
		allowHtml:			true
	},{
		name:				"rt",
		components: [{
			name:			"rtAvatar",
			classes:		"avatar"
		},{
			classes:		"details",
			components: [{
				name:		"relativeTime",
				classes:	"time relative"
			},{
				name:		"absoluteTime",
				classes:	"time absolute"
			}]
		}]
	}],

	create: function(){
		this.inherited(arguments);

		if (this.user) {
			this.service = this.user.service;
		}

		if (this.item) {
			this.setupMessage(this.item);
		}
	},

	userChanged: function(){
		this.service = this.user.service;
	},

	itemChanged: function(){
		if (this.item) {
			this.setupMessage(this.item);
		}
	}

});