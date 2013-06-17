enyo.kind({
	name: "Foreplot.Application",
	kind: "enyo.Application",
	controllers: [{
		name: "article",
		kind: "Foreplot.ArticleController"
	}, {
		name: "articles",
		kind: "Foreplot.ArticlesController"
	}],
	view: "Foreplot.RootView",

	// This function strips HTML codes from a string
	// Note: Maybe unsafe if the string contains malicious codes
	// See: http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
	stripHTML: function (html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent||tmp.innerText;
	}
});
