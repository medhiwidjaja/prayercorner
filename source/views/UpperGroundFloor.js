enyo.kind({ 
	name: "UpperGroundFloor",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide",
	draggable: false,
	events: {
		onDoneEditing: ""
	},
	components: [
		{ name: "UGFTopToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ kind: "onyx.Grabber" },
				{ kind: "StylishHeader", title: "Edit Category", watermark: false }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ content: "Edit group" },
				{ kind: "swash-big", classes: "swash-dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "UGFBottomToolbar", kind: "onyx.Toolbar", classes: "groundfloor-toolbar", components: [
				{ content: "Done", classes: "done-button", ontap: "done" }
			]
		}
	],

	done: function() {
		this.doDoneEditing();
		this.log();
	}
});