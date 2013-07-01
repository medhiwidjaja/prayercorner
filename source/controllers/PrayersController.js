
enyo.kind({
	name: "PrayerList.PrayersController",
	kind: "enyo.Collection",
	model: "PrayerList.PrayerModel",
	components: [
		{ name: "pdb", kind: "PrayersStore", onReadPrayerData: "dataRead" }
	],
	
	constructor: function() {
		this.inherited(arguments);
		this.bound = {
			dataRead: enyo.bind(this, this.dataRead),
			handleFetchResults: enyo.bind(this, this.handleFetchResults),
			handleError: enyo.bind(this, this.handleError),
		}
	},

	fetchList: function(id) {
		this.$.pdb.forGroup(id, this.bound.handleFetchResults, this.bound.handleError);
	},

	handleFetchResults: function(inEvent) {
		this.data(inEvent);
	},

	dataRead: function(inSender, inEvent) {
		this.data(inEvent);
	},

	handleError: function() {
    	this.log("Error");
    }
});