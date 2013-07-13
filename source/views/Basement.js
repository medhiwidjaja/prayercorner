enyo.kind({
	name: "Basement",
	kind: "enyo.FittableRows",
	classes: "plist-basement enyo-fit",
	events: {
		onAddGroup: ""
	},
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
				{ name: "groups", kind: "PrayerList.CatList", onModelAdded: "modelsChanged" },
				{ content: "＋", classes: "list-item-title", ontap: "addGroup" },
				{ kind: "swash-small" },
				{ content: "Answered", classes: "basement-header" },
				{ content: "Unanswered", classes: "basement-header" },
				{ content: "Archived", classes: "basement-header" },
				{ kind: "swash-small" },
				{ content: "Settings", classes: "basement-header" },
				{ fit: true },
				{ kind: "swash-big", ontap: "refresh" },
				{ style: "margin-top:20px" }
			]
		}
	],

	render: function() {
        this.inherited(arguments);
        this.$.groups.render();
    },

    addGroup: function() {
    	var group = new PrayerList.Category();
    	pl.selectedCategoryController.set("model", group);
    	this.doAddGroup();
    	this.log()
    },

    refresh: function() {
    	this.log();
    },

	modelsChanged: function(s,e) {
		this.log(s,e);
	}
});

enyo.kind({
	name: "PrayerList.CatList",
	kind: "enyo.DataRepeater", 
	controller: "pl.categoriesCollection", 
	events: {
		onSelectGroup: ""
	},
	components: [{
		ontap: "itemTap",
		layoutKind: "FittableColumnsLayout", components: [
			{ bindFrom: ".title", classes: "list-item-title" },
			{ bindFrom: ".count", classes: "list-item-count" }
		]
	}],
	
	itemTap: function(inSender, inEvent) {
		// FIXME: Close EditCategory panel first
		var group = inEvent.model;
		pl.selectedCategoryController.set("model", group);
		// this.controller.setSelectedTitle(group.title);
		// this.controller.setSelectedCategory(group);
		this.doSelectGroup(inEvent);
		pl.prayersCollection.filterCategory(group);
		this.log(group.id + " " + group.title);
	}
})

enyo.kind({
	name: "Today",
	layoutKind: "FittableColumnsLayout",
	style: "padding-bottom: 4px;",
	components: [
		{ content: "Today", fit: true, classes: "today-header middle" },
		{ name: "cal", kind: "CalDate", additionalStyles: "color: #FFEFCB;" },
		{ style: "margin-right: 20px"}
	],

	create: function() {
		this.inherited(arguments);
		var today = new Date();
		var els = today.toString().split(" ");
		this.$.cal.setMonth(els[1]);
		this.$.cal.setDate(els[2][0] == "0" ? els[2][1] : els[2]);
	}
})

