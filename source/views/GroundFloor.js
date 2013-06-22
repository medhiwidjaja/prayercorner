enyo.kind({ 
	name: "GroundFloor",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide",
	draggable: false,
	components: [
		{ name: "GFTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ kind: "StylishHeader", title: "Family", watermark: true }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ kind: "GroupList", classes: "living-room" },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "GFBottomToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ content: "＋" }
			]
		}
	]
});

enyo.kind({
	name: "GroupList",
	components: [
		{ kind: "Repeater", onSetupItem: "setupItem", components: [
			{ name: "item", components: [
				{ name: "title", classes: "prayer-list-item"},
				{ kind: "swash-small", classes: "swash-dark" }
			]}
		]},
	],
	create: function() {
		this.inherited(arguments);
		this.$.repeater.setCount(this.list.length);
	},
	setupItem: function(inSender, inEvent) {
		var prayer = this.list[inEvent.index];
		var item = inEvent.item;
		item.$.title.setContent(prayer.title);
		return true;
	},
	list: [
		{title: "Vacation as a family"},
		{title: "Guidance as we move to new city. Dad’s job, Mom’s coping with new responsibilities, Bob and Fiona’s schools" }
	]
});