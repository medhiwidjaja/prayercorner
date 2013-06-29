enyo.kind({
	name: "PrayerList.PrayerModel",
	kind: "enyo.Model",
	modelProperties: {
		defaults: {
			id: null,
			title: "",
			answered: "",
			category: "",
			createdDate: "",
			answeredDate: ""
		}
	}
});