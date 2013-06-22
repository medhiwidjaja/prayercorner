enyo.kind({
	name: "Basement",
	kind: "enyo.FittableRows",
	classes: "plist-basement enyo-fit",
	components: [
		{ name: "BasementTitle", content: "Prayer Garden", classes: "basement-title" },
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "Today" },
				{ kind: "swash-small" },
				{ content: "Categories", classes: "basement-header" },
				{ kind: "Categories" },
				{ kind: "swash-small" },
				{ content: "Answered", classes: "basement-header" },
				{ content: "Unanswered", classes: "basement-header" },
				{ content: "Archived", classes: "basement-header" },
				{ kind: "swash-small" },
				{ content: "Settings", classes: "basement-header" },
				{ fit: true },
				{ kind: "swash-big" },
				{ style: "margin-top:20px" }
			]
		}
	]
});

enyo.kind({
	name: "Categories",
	components: [
		{ kind: "Repeater", onSetupItem: "setupItem", components: [
			{ name: "item", components: [
				{ name: "count", classes: "list-item-count" },
				{ name: "title", classes: "list-item-title"}
			]}
		]},
	],
	create: function() {
		this.inherited(arguments);
		this.$.repeater.setCount(this.catlist.length);
	},
	setupItem: function(inSender, inEvent) {
		var menu = this.catlist[inEvent.index];
		var item = inEvent.item;
		item.$.title.setContent(menu.title);
		item.$.count.setContent(menu.count);
		return true;
	},
	catlist: [
		{title: "Family", count: 8 },
		{title: "Personal", count: 3 },
		{title: "Work", count: 2 },
		{title: "Church", count: 5 }
	]
});

enyo.kind({
	name: "Today",
	layoutKind: "FittableColumnsLayout",
	style: "padding-bottom: 4px;",
	components: [
		{ content: "Today", fit: true, classes: "today-header middle" },
		{ kind: "CalDate", month: "Jun", date: "18", additionalStyles: "color: #FFEFCB;" },
		{ style: "margin-right: 20px"}
	]
})

