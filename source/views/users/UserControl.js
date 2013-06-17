enyo.kind({
	name: "Foreplot.UserControl",
	kind: "enyo.Control",
	classes: "user-control",
	components: [{
		name: "currentUser",
		kind: "Foreplot.User",
		onResults: "initControl"
	},{
		name: "avatar", kind: "Image", classes: "user-control-avatar"
	},{
		name: "userName", classes: "user-control-name"
	}],
	create: function() {
		this.inherited(arguments);
		this.user = this.$.currentUser;
	},
	initControl: function(inResponse) {
		this.$.avatar.setSrc(inResponse.avatar);
		this.$.userName.setContent(inResponse.name);
	}
});