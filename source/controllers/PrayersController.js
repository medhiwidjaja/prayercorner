
enyo.kind({
	name: "PrayerList.PrayersController",
	kind: "enyo.Collection",
	model: "PrayerList.PrayerModel",
    components: [
    	{ name: "pdb", kind: "PrayersStore", onReadPrayerData: "dataread" }
    ],

  	dataread: function(inSender, inEvent) {
  		// FIX THIS: We need to removeAll first, because onReadData event is fired twice. Why?
  		this.removeAll();
  		this.add(inEvent);
  	}
});