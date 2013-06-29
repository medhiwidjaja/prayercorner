// 

enyo.kind({
	name: "PrayerList.GroupsController",
	kind: "enyo.Collection",
	model: "PrayerList.GroupModel",
    
    index: 0,

    next: function () {
        var idx = this.index + 1;
        this.set("index", idx >= this.length ? 0 : idx);
    },

    item: enyo.computed(function () {
        return this.get("data")[this.index];
    }, "index"),

    create: function() {
        this.add([
            { groupid: 1, title: "Family"},
            { groupid: 2, title: "Personal" },
            { groupid: 3, title: "Work" },
            { groupid: 4, title: "Church" }
        ]);
    }
});
