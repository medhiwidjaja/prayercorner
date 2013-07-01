// 

enyo.kind({
	name: "PrayerList.GroupsController",
	kind: "enyo.Collection",
	model: "PrayerList.GroupModel",
    components: [
    	{ name: "gdb", kind: "Categories", onReadData: "dataread" }
    ],
    published: {
    	selectedTitle: ""
    },
    
    // index: 0,

    // next: function () {
    //     var idx = this.index + 1;
    //     this.set("index", idx >= this.length ? 0 : idx);
    // },

    // item: enyo.computed(function () {
    //     return this.get("data")[this.index];
    // }, "index"),

  	dataread: function(inSender, inEvent) {
  		this.data(inEvent);
  	}
});
