enyo.kind({
	name: "Foreplot.LevelOne",
	kind: "FittableRows",
	classes: "foreplot-groundfloor enyo-unselectable enyo-fit",
	events: {
		onL1GrabberTap: ""
	},
	components: [
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber", ontap: "grabberTap"},
			{content: "LevelOne", fit: true}
		]},
		{kind: "List", fit: true, touch: true, onSetupItem: "setupItem", components: [
			{name: "item", style: "padding: 10px;", classes: "foreplot-item enyo-border-box", ontap: "itemTap", components: [
				{name: "thumbnail", kind: "Image", classes: "foreplot-thumbnail"},
				{name: "title", classes: "foreplot-title"},
				{name: "description", classes: ""}
			]}
			// ,
			// {name: "more", style: "background-color: #323232;", components: [
			// 	{kind: "onyx.Button", content: "more photos", classes: "onyx-dark foreplot-more-button", ontap: "more"},
			// 	{name: "moreSpinner", kind: "Image", src: "assets/spinner.gif", classes: "foreplot-more-spinner"}
			// ]}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.IconButton", src: "assets/Onyx-Icons-Examples-DarkBkgrnd-Square.png"},
			{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png"},
			{fit: true},
			{name: "fetchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false}
		]}
	],
	grabberTap: function() {
		this.doL1GrabberTap();
	}
});