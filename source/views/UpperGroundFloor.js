enyo.kind({ 
	name: "UpperGroundFloor",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
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
				{ kind: "GroupEditFields", classes: "living-room" },
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
		// TODO: animate closing of the panel
		this.doDoneEditing();
		this.log();
	}
});


enyo.kind({
	name: "GroupEditFields",
	events: {

	},
	components: [
		{kind: "onyx.Groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Header"},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", style: "width: 100%", placeholder: "Enter text here"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", style: "width: 100%", value: "Middle"}
			]},
			{kind: "onyx.InputDecorator", style: "background: lightblue;", components: [
				{kind: "onyx.Input", style: "width: 100%;", value: "Last"}
			]}
		]},
	]
})