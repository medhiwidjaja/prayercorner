enyo.kind({
	name: "ArticlesCollection",
	kind: "enyo.Collection",
	model: "PrayerList.ArticleModel",

	collectionProperties: {
		// localStorage: new Store("plist")
	},
	published: {
		filter: "all",
		filteredContent: null,
		public: null,
		publicCount: null,
		private: null,
		privateCount: null
	},

	public: enyo.computed(function () {
		return this.collection.get("public");
	}, "content"),
	
	publicCount: enyo.computed(function () {
		return this.get("public").length;
	}, "public"),

	private: enyo.computed(function () {
		return this.collection.get("private");
	}, "content"),
	
	privateCount: enyo.computed(function () {
		return this.get("private").length;
	}, "private"),

	filteredContent: enyo.computed(function () {
		var f = this.get("filter"), ret;
		if (f === "all") ret = this.get("content");
		else if (f === "public") ret = this.get("public");
		else if (f === "private") ret = this.get("private");
		else ret = [];
		return ret;
	}, "content", "filter")
})