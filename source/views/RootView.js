enyo.kind({
	name: "PrayerList.RootView",
	kind: "enyo.View",
	classes: "plist",
	components: [
		{
			name: "rootPanels", 
			kind: "enyo.Panels",
			arrangerKind: "enyo.CollapsingArranger",
			classes: "plist-panels enyo-fit",
			realtimeFit: false,
			narrowFit: false,
			fit: true,
			//wrap: true,
			onTransitionFinish: "rootTransitionComplete", 
			onTogglePanel: "toggleGF", 
			onClosePanel: "closePrayerPanels",
			components: [
				{
					name: "basement",
					kind: "Basement",
					onSelectCategory: "viewCategoryItems",
					onAddCategory: "editCategory",
					onCloseEditCategoryPanel: "destroyEditGroup"
				},
				{
					kind: "enyo.Panels", 
					name:"contentPanels", 
					arrangerKind:"CollapsingArranger", 
					draggable:false, 
					//wrap: true,
					classes:"panels enyo-fit plist-groundfloor", 
					onTransitionFinish: "contentTransitionComplete", 
					components: [
						{
							name: "categoryView",
							kind: "PrayerList.CategoryView",
							mixins: ["enyo.AutoBindingSupport"],
							classes: "enyo-fit",
							controller: "pl.selectedCategoryController",
							onEditCategory: "editCategory",
							onAddPrayerItem: "addPrayerItem",
							onViewPrayerItem: "viewPrayerItem",
							onGrabberTap: "toggleBasement"
						}
				]}
			]
		},
		{ kind: "Signals", onClosePrayerPanels: "closePrayerPanels" }
	],

	// create: function() {
	//     this.inherited(arguments);
	//     this.$.rootPanels.getAnimator().setEasingFunction(enyo.easing.easeOutBounce);
	// },

	render: function() {
		this.inherited(arguments);
		this.$.basement.render();
		this.$.categoryView.render();
		this.$.categoryView.refreshBindings();
	},

	toggleBasement: function() {
		if (this.$.rootPanels.index === 0) {
			this.$.rootPanels.next();
		} else {
			this.$.rootPanels.previous();
		}
		this.log();  
	},

	toggleGF: function(inSender) {
		// if (inSender.parent.index === 0) {
		// 	inSender.parent.next();
		// } else {
		// 	inSender.parent.previous();
		// }
		//inSender.parent.next();
		if (inSender.index === 0) {
			inSender.next();
		} else {
			inSender.previous();
		}
		this.log();
	},

	editCategory: function(inSender, inEvent) {
		this.log();
		pl.editCategoryController.set("isAddingNew", inSender.name === "basement" ? true : false); 
		if (this.$.prayerView) {
			this.$.prayerView.destroy();
		}
		if (! this.$.editGroup) {
			var newComponent = this.$.rootPanels.createComponent(
				{
					name: "editGroup", 
					kind: "PrayerList.EditCategory",  
					mixins: ["enyo.AutoBindingSupport"],
					bindFrom: ".model",
					bindTo: "model",
					bindSource: "pl.selectedCategoryController",
					
					category: inSender.name === "editGroup" ? inEvent : "",
					onDoneEditing: "hideEditGroup"
				}, 
				{owner: this}
			);
			newComponent.render();
			this.$.rootPanels.render();
			if (enyo.Panels.isScreenNarrow()) {
				this.$.rootPanels.setIndex(2);
			}
		}
	},

	hideEditGroup: function(inSender, inEvent) {
		this.$.basement.$.groups.render();
		this.$.categoryView.refreshBindings();
		inSender.destroy();
		this.log();
	},

	hidePrayerView: function(inSender, inEvent) {
		this.log();
		inSender.parent.destroy();
		this.$.rootPanels.refresh();
	},

	rootTransitionComplete: function(inSender, inEvent) {
		if (this.hidingPrayerView) {
			this.destroyPrayerView();
			this.log("Prayerview")
		} else { 
			if(this.hidingEditGroup) {
				this.destroyEditGroup();
				this.log("edit group")
			}
		}
	},

	contentTransitionComplete: function(inSender, inEvent) {
		if(this.hidingEditGroup) {
			this.destroyEditGroup();
			this.log("edit group")
		}
	},

	prayerViewTransitionComplete: function(inSender, inEvent) {
		this.log("prayerview panels")
	},

	destroyEditGroup: function() {
		if (this.$.editGroup) {
			this.$.editGroup.destroy();
			this.hidingEditGroup = false;
		}
		this.log();
	},

	destroyPrayerView: function() {
		this.$.prayerView.destroy();
		this.hidingPrayerView = false;
		this.log();
	},

	addPrayerItem: function(inSender, inEvent) {
		this.log();
	},

	viewPrayerItem: function(inSender, inModel) {
		if (this.$.editGroup) {
			this.$.editGroup.controller.cancel();
		}
		if (! this.$.rootPanels.$.prayerPanels) {
			var newComponent = this.$.rootPanels.createComponent(
				{ name: "prayerPanels", 
					kind: "PrayerList.PrayerPanels", 
					// onTogglePanel: "toggleGF", 
					// onClosePanel: "closePrayerPanels" 
				}
			);
			newComponent.render();
			this.$.rootPanels.render();
			if (enyo.Panels.isScreenNarrow()) {
				this.$.rootPanels.setIndex(2);
			}
			this.log();
		} else {
			// necessary for PrayerView to display the title:
			this.$.rootPanels.$.prayerPanels.$.prayerView.rebuildBindings();
			// necessary for Scroller in PrayerView to work right:
			this.$.rootPanels.render();
			if (enyo.Panels.isScreenNarrow()) {
				this.$.rootPanels.setIndex(2);
			}
		}
		
		// if (! this.$.prayerView) {  
		//     var newComponent = this.$.rootPanels.createComponent(
		//         {name: "prayerViewPanels",
		//             // kind: "enyo.Panels",
		//             // arrangerKind:"CollapsingArranger", 
		//             kind: "PrayerList.TwoPlyPanel",
		//             draggable:false, 
		//             classes:"panels enyo-fit plist-groundfloor", 
		//             //onTransitionFinish: "prayerViewPanelsTransitionComplete",
		//             components: [
		//                 {name: "prayerView", 
		//                     kind: "PrayerList.PrayerView",
		//                     mixins: ["enyo.AutoBindingSupport"],
		//                     //onDoneEditing: "hidePrayerView",
		//                     onGrabberTap: "toggleGF",
		//                     //onAddVerseItem: "addVerseItem"
		//                 }
		//             ]
		//         }, 
		//         {owner: this}
		//     );
		//     this.$.prayerView.set("model", inModel);
		//     pl.prayersCollection.select(inModel.id);
		//     pl.journalEntriesCollection.filterPrayer(inModel);
		//     pl.bibleVersesCollection.filterPrayer(inModel);
		//     //newComponent.$.journals.set("controller", pl.journalEntriesCollection);
		//     newComponent.render();
		//     this.$.rootPanels.render();
		//     if (enyo.Panels.isScreenNarrow()) {
		//         this.$.rootPanels.setIndex(2);
		//     }
		//     this.log("New: " + inModel.title);
		// } else {
		//     this.$.prayerView.set("model", inModel);
		//     pl.prayersCollection.select(inModel.id);
		//     pl.journalEntriesCollection.filterPrayer(inModel);
		//     pl.bibleVersesCollection.filterPrayer(inModel);
		//     if (enyo.Panels.isScreenNarrow()) {
		//         this.$.rootPanels.setIndex(2);
		//     }
		//     //this.$.prayerView.$.journals.set("controller", pl.journalEntriesCollection);
		//     this.log("Changed: " + inModel.title);
		// };
	},

	closePrayerPanels: function() {
		this.log();
		var panels = this.$.rootPanels.$.prayerPanels;
		if (panels) panels.destroy();
	},

	viewCategoryItems: function(inSender, inEvent) {
		if (enyo.Panels.isScreenNarrow()) {
			this.$.rootPanels.setIndex(1);
		}
		// This will make sure the categoryView's DOM dimensions are recomputed to fit the contents
		this.$.rootPanels.render();
		this.log();
	}
});