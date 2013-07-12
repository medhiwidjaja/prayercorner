enyo.kind({
	name: "PrayerList.Application",
	kind: "enyo.Application",
	controllers: [
		{
			//name: "pl.groupsCollection",
			name: "pl.categoriesCollection",
			kind: "PrayerList.CategoryController",
			global: true
		},
		{
			name: "pl.prayersCollection",
			kind: "PrayerList.PrayersController",
			global: true
		},
		{
			name: "pl.selectedCategoryController",
			kind: "PrayerList.SelectedCategoryController",
			global: true
		}
	],
	view: "PrayerList.RootView",

	create: function() {
		this.inherited(arguments);
		pl.categoriesCollection.fetch();
		//pl.prayersCollection.fetch();
	},
	
	// This function strips HTML codes from a string
	// Note: Maybe unsafe if the string contains malicious codes
	// See: http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
	stripHTML: function (html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent||tmp.innerText;
	}
});

new enyo.Store({source: "PrayerList.localSource"});


enyo.singleton({
    name: "PrayerList.AllPrayers",
    kind: "enyo.Collection",
    model: "PrayerList.Prayer",

    create: function() {
        this.inherited(arguments);
        this.fetch();
    }
})