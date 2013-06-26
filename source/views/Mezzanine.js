enyo.kind({ 
	name: "Mezzanine",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide",
	draggable: false,
	components: [
		{ name: "MezzanineTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ kind: "StylishHeader", title: "Edit Category", watermark: false }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "MezzanineBottomToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ content: "Done" }
			]
		}
	]
});