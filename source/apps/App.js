enyo.kind({
	name: "PrayerList.Application",
	kind: "enyo.Application",
	controllers: [
		{
			name: "pl.groupsCollection",
			kind: "PrayerList.GroupsController",
			global: true
		}
	],
	view: "PrayerList.RootView",
	
	// This function strips HTML codes from a string
	// Note: Maybe unsafe if the string contains malicious codes
	// See: http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
	stripHTML: function (html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent||tmp.innerText;
	}
});
