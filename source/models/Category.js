enyo.kind({
    name: "PrayerList.Category",
    kind: "enyo.Model",
    attributes: {
        id: "",
        rowNo: "",
        title: "",
        //count: "",
        answeredCount: "",
        unansweredCount: "",
        createdDate: "",
        scheduleDaily: true,
        scheduleWeekly: ""
    },

    // Returns the number of prayer items under this category
    count: enyo.computed(function() {
        return PrayerList.AllPrayers.filter(
            function(v,a) {
                return v.category === this.id
            }, 
            this
        ).length
    }, "model" )
});
