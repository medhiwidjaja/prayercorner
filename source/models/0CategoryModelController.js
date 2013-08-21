enyo.kind({
	name: "PrayerList.CategoryModelController",
	kind: "enyo.ModelController",
	model: "PrayerList.Category",

	count: enyo.computed(function(){
        prayers = new PrayerList.PrayersController();
        prayers.fetchAndReplace();
        return prayers.filter(function(v,a) {return v.category === this.model.id}).length
    }, "model" )
})