enyo.kind({
	name: "PrayerList.PrayerItem",
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