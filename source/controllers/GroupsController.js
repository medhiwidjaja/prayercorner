// 

enyo.kind({
	name: "PrayerList.GroupsController",
	kind: "enyo.Collection",
	model: "PrayerList.GroupModel",
    components: [
    	{ name: "gdb", kind: "Categories", onReadData: "dataRead" }
    ],
    published: {
    	selectedTitle: "",
    	selectedGroup: ""
    },
	constructor: function() {
		this.inherited(arguments);
		this.bound = {
			dataRead: enyo.bind(this, this.dataRead),
			handleFetchResults: enyo.bind(this, this.handleFetchResults),
			handleError: enyo.bind(this, this.handleError),
			handleSaveSuccess: enyo.bind(this, this.handleSaveSuccess)
		}
	},

    // index: 0,

    // next: function () {
    //     var idx = this.index + 1;
    //     this.set("index", idx >= this.length ? 0 : idx);
    // },

    // item: enyo.computed(function () {
    //     return this.get("data")[this.index];
    // }, "index"),

	find: function(id) {
		this.$.gdb.forId(id, this.bound.handleFetchResults, this.bound.handleError);
	},

	handleFetchResults: function(inEvent) {
		return inEvent;
	},

  	dataRead: function(inSender, inEvent) {
  		this.data(inEvent);
  	},

  	save: function(model) {
  		this.$.gdb.save(model, this.bound.handleSaveSuccess, this.bound.handleError);
  	},

  	handleSaveSuccess: function(inEvent) {
  		this.$.gdb.all(this.bound.dataRead, this.bound.handleError);
  		this.log("Saved");
  	},

	handleError: function() {
    	this.log("Error");
    }
});
