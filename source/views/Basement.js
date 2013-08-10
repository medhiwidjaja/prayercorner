enyo.kind({
	name: "Basement",
	kind: "enyo.FittableRows",
	classes: "plist-basement enyo-fit",
	events: {
		onAddCategory: ""
	},
	components: [
		{ name: "BasementTitle", content: "Prayer Corner", classes: "basement-title" },
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "Today" },
				{ kind: "swash", type: "s", shade: "light" },
				{ content: "Categories", classes: "basement-header" },
				{ name: "groups", kind: "PrayerList.CatList", onModelAdded: "modelsChanged" },
				{ content: "＋", classes: "list-item-title", ontap: "addCategory" },
				{ kind: "swash", type: "s", shade: "light" },
				{ content: "Answered", classes: "basement-header" },
				{ content: "Unanswered", classes: "basement-header" },
				{ content: "Archived", classes: "basement-header" },
				{ kind: "swash", type: "s", shade: "light" },
				{ content: "Settings...", classes: "basement-header", ontap: "setup"},
				{ fit: true },
				{ kind: "swash", type: "w", shade: "light", ontap: "refresh" },
				{ style: "margin-top:20px" }
			]
		}
	],

	render: function() {
        this.inherited(arguments);
        this.$.groups.render();
    },

    addCategory: function() {
    	var category = new PrayerList.Category();
    	pl.selectedCategoryController.set("model", category);
    	this.doAddCategory();
    	this.log()
    },

    refresh: function() {
    	this.log();
    },

	modelsChanged: function(s,e) {
		this.log(s,e);
	},

	setup: function() {
		if (window.localStorage["PrayerCorner.setup"] !== "1") {
			var c = pl.categoriesCollection.findByTitle("Family");
			var p = new PrayerList.Prayer({title: "Guidance as we move to new city. Dad’s job, Mom’s coping with new responsibilities, Bob and Fiona’s schools", category: c.id});
			p.commit();
			var j = new PrayerList.JournalEntry({content:"New job", createdDate: "2 Feb 2013", prayerId: p.id});
			j.commit();
			j = new PrayerList.JournalEntry({content:"School registration accepted", createdDate: "15 Apr 2013", prayerId: p.id});
			j.commit();
			var b = new PrayerList.BibleVerse({text:"For you are my rock and my fortress; and for your name's sake you lead me and guide me;", verse:"Psalms 31:3", prayerId: p.id})
			b.commit();
			b = new PrayerList.BibleVerse({text:"And I will lead the blind in a way that they do not know, in paths that they have not known I will guide them. I will turn the darkness before them into light, the rough places into level ground. These are the things I do, and I do not forsake them.", verse:"Isaiah 42:16", prayerId: p.id})
			b.commit();
			p = new PrayerList.Prayer({title: "School vacation", category: c.id});
			p.commit();
			c = pl.categoriesCollection.findByTitle("Personal");
			p = new PrayerList.Prayer({title: "Perseverance in finishing book", category: c.id});
			p.commit();
			p = new PrayerList.Prayer({title: "Courage in starting new venture", category: c.id});
			p.commit();
			c = pl.categoriesCollection.findByTitle("Work");
			p = new PrayerList.Prayer({title: "Presentation at National Conference", category: c.id});
			p.commit();
			j = new PrayerList.JournalEntry({content:"Paper proposal accepted", createdDate: "20 May 2013", prayerId: p.id});
			j.commit();
			j = new PrayerList.JournalEntry({content:"Fundings got approved", createdDate: "31 May 2013", prayerId: p.id});
			j.commit();
			b = new PrayerList.BibleVerse({text:"Now faith is the assurance of things hoped for, the conviction of things not seen.", verse:"Hebrew 11:1", prayerId: p.id})
			b.commit();
			window.localStorage["PrayerCorner.setup"] = "1";
		}
	}
});

enyo.kind({
	name: "PrayerList.CatList",
	kind: "enyo.DataRepeater", 
	controller: "pl.categoriesCollection", 
	events: {
		onSelectCategory: ""
	},
	components: [{
		ontap: "itemTap",
		layoutKind: "FittableColumnsLayout", components: [
			{ components: [{bindFrom: ".title", classes: "list-item-title"}], fit: true },
			{ components: [{bindFrom: ".count", classes: "list-item-count"}] }
		]
	}],
	
	itemTap: function(inSender, inEvent) {
		// FIXME: Close EditCategory panel first
		var category = inEvent.model;
		pl.selectedCategoryController.set("model", category);
		// Save the model's attributes in the controller:
		pl.selectedCategoryController.set("savedAttributes", JSON.parse(category.toJSON()));
		this.doSelectCategory(inSender, inEvent);
		pl.prayersCollection.filterCategory(category);
		enyo.forEach(this.controls, function(c) {c.removeClass("selected-category")});
		inSender.addClass("selected-category");
		this.log(category.id + " " + category.title);
	}
})

enyo.kind({
	name: "Today",
	layoutKind: "FittableColumnsLayout",
	style: "padding-bottom: 4px;",
	components: [
		{ content: "Today", fit: true, classes: "today-header middle" },
		{ name: "cal", kind: "PrayerList.CalDate", calendarDate: new Date(), additionalStyles: "color: #FFEFCB;" },
		{ style: "margin-right: 20px"}
	]
})

