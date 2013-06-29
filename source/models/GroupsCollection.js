enyo.kind({
	name: "xGroupsCollection",
	kind: "enyo.Collection",
	model: "PrayerList.GroupItem",

	collectionProperties: {
		// localStorage: new Store("plist")
	},
	published: {
		filter: "all",
		filteredContent: null,
		answered: null,
		answeredCount: null,
		unanswered: null,
		unansweredCount: null
	},

	answered: enyo.computed(function () {
		return this.collection.get("answered");
	}, "content"),
	
	answeredCount: enyo.computed(function () {
		return this.get("answered").length;
	}, "answered"),

	unanswered: enyo.computed(function () {
		return this.collection.get("unanswered");
	}, "content"),
	
	unansweredCount: enyo.computed(function () {
		return this.get("unanswered").length;
	}, "unanswered"),

	filteredContent: enyo.computed(function () {
		var f = this.get("filter"), ret;
		if (f === "all") ret = this.get("content");
		else if (f === "answered") ret = this.get("answered");
		else if (f === "unanswered") ret = this.get("unanswered");
		else ret = [];
		return ret;
	}, "content", "filter")
})