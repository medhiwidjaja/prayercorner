enyo.kind({
	name: "PrayerList.EditCategory",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
	//draggable: false,
	published: {

	},

	controller: "pl.editCategoryController",
	// bindings: [
	// 	{from: ".model.title", to: "$.tbtitle.content"},
	// ],
	components: [
		{ name: "ECTopToolbar", 
			kind: "onyx.Toolbar", 
			classes: "top-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ kind: "enyo.Button", content: "Cancel", classes: "text-button", ontap: "cancel" },
				{ name: "toolbarHeader", kind: "StylishHeader", title: "Edit Category", fit: true, watermark: false },
				{ kind: "enyo.Button", content: "Done", classes: "text-button", ontap: "done" }
			]
		},
		{ kind: "enyo.Scroller", 
			strategyKind: "TouchScrollStrategy",
			horizontal: "hidden",
			fit: true,
			components: [
				{ tag: "br" },
				{ kind: "GroupEditFields", classes: "living-room" },
				{ kind: "swash", type: "w", shade: "dark" },
				{ style: "margin-top:20px" }
			]
		},
		{ name: "ECBottomToolbar", 
			kind: "onyx.Toolbar", 
			classes: "bottom-toolbar", 
			layoutKind: "FittableColumnsLayout",
			components: [
				{ fit: true },
				{ kind: "enyo.Button", content: "Delete", classes: "text-button negative", ontap: "showConfirm" }
				// { kind: "onyx.MenuDecorator", 
				// 	//style: "display:inline-block;float:right",
				// 	components: [
				// 		{ kind: "enyo.Button", content: "Delete", classes: "text-button negative" },
				// 		{ kind: "onyx.ContextualPopup",
				// 			style: "width: 250px",
				// 			title: "Confirm",
				// 			floating: true,
				// 			actionButtons: [
				// 				{ kind: "enyo.Button", content: "Delete", classes: "text-button negative" },
				// 				{ kind: "enyo.Button", content: "Cancel", classes: "text-button" }
				// 			]
				// 		}
				// 	]
				// }
			]
		}
	]
})



enyo.kind({
	name: "GroupEditFields",
	controller: "pl.editCategoryController",
	bindings: [
		{ from: ".controller.model.title", to: ".$.groupName.value", oneWay: false, transform: "prettify" }
	],
	components: [
		{kind: "onyx.Groupbox", classes: "pl-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Category", classes: "pl-groupbox-header"},
			{kind: "onyx.InputDecorator", classes: "pl-input-decorator", components: [
				{name: "groupName", kind: "onyx.Input", classes: "pl-input",
					placeholder: "Name"
				}
			]},
		]},
	]
})