enyo.kind({
	name: "PrayerList.EditCategory",
	kind: "enyo.FittableRows",
	classes: "plist-groundfloor wide bg",
	//draggable: false,
	published: {

	},
	controller: "pl.editCategoryController",
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
				{ kind: "PrayerList.ScheduledItemEdit", controller: "pl.editCategoryController", classes: "living-room" },
				{ tag: "br" },
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




