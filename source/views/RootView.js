enyo.kind({
	name:				"PrayerList.NarrowPanels",
	kind:				enyo.Panels,
	statics: {
		/*
			Returns true when the window width is 640px or less. This value must be
			the same as the "max-width" media query used for panel sizing in the
			matching Panels.css
		*/
		isScreenNarrow: function() {
			return enyo.dom.getWindowWidth() <= 640;
		}
	}
});

enyo.kind({
	name: "PrayerList.RootView",
	kind: "enyo.View",
	classes: "plist",
	components: [
		{
			name: "rootPanels", 
			kind: "PrayerList.NarrowPanels",
			arrangerKind: "enyo.CollapsingArranger",
			classes: "plist-panels enyo-fit",
			realtimeFit: false,
			narrowFit: false,
			fit: true,
			//wrap: true,
			onTransitionFinish: "rootTransitionComplete", 
			onTogglePanel: "toggleGroundFloor", 
			onFocusEditPanel: "toggleUpperFloor",
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

	toggleGroundFloor: function(inSender) {
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

	toggleUpperFloor: function() {
		//
		if (PrayerList.NarrowPanels.isScreenNarrow()) {
			this.$.rootPanels.setIndex(2);
		} else {
			this.$.rootPanels.setIndex(1);
		}
	},

	editCategory: function(inSender, inEvent) {
		this.log();
		// close any open PrayerView panels first
		this.closePrayerPanels();
		
		pl.editCategoryController.set("isAddingNew", inSender.name === "basement" ? true : false); 
		var title = (inSender.name  === "basement") ? "New category" : "Edit category";
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
					toolbarTitle: title,
					category: inSender.name === "editGroup" ? inEvent : "",
					onDoneEditing: "hideEditGroup"
				}, 
				{owner: this}
			);
			newComponent.render();
			this.$.rootPanels.render();
			if (PrayerList.NarrowPanels.isScreenNarrow()) {
				this.$.rootPanels.setIndex(2);
			} else {
				this.$.rootPanels.setIndex(1);
			}
		}
	},

	hideEditGroup: function(inSender, inEvent) {
		this.$.basement.$.groups.render();
		this.$.categoryView.refreshBindings();
		inSender.destroy();
		if (! PrayerList.NarrowPanels.isScreenNarrow()) {
			this.$.rootPanels.setIndex(0);
		}
		this.log();
	},

	// hidePrayerView: function(inSender, inEvent) {
	// 	this.log();
	// 	inSender.parent.destroy();
	// 	this.$.rootPanels.refresh();
	// },

	// rootTransitionComplete: function(inSender, inEvent) {
	// 	if (this.hidingPrayerView) {
	// 		this.destroyPrayerView();
	// 		this.log("Prayerview")
	// 	} else { 
	// 		if(this.hidingEditGroup) {
	// 			this.destroyEditGroup();
	// 			this.log("edit group")
	// 		}
	// 	}
	// },

	// contentTransitionComplete: function(inSender, inEvent) {
	// 	if(this.hidingEditGroup) {
	// 		this.destroyEditGroup();
	// 		this.log("edit group")
	// 	}
	// },

	// prayerViewTransitionComplete: function(inSender, inEvent) {
	// 	this.log("prayerview panels")
	// },

	// destroyEditGroup: function() {
	// 	if (this.$.editGroup) {
	// 		this.$.editGroup.destroy();
	// 		this.hidingEditGroup = false;
	// 	}
	// 	if (! PrayerList.NarrowPanels.isScreenNarrow()) {
	// 		this.$.rootPanels.setIndex(0);
	// 	}
	// 	this.log();
	// },

	// destroyPrayerView: function() {
	// 	this.$.prayerView.destroy();
	// 	this.hidingPrayerView = false;
	// 	this.log();
	// },

	addPrayerItem: function(inSender, inEvent) {
		this.log();
	},

	viewPrayerItem: function(inSender, inModel) {
		// close edit panel if it's open
		if (this.$.editGroup) {
			this.$.editGroup.controller.cancel();
		}
		// close any open edit (journal or verse) panel
		var prayerPanel = this.$.rootPanels.$.prayerPanels;
		if (prayerPanel) {
			if (prayerPanel.$.topView)
				prayerPanel.popView();
		}
		// now create the panel if one doesn't exist yet
		if (! prayerPanel) {
			var newComponent = this.$.rootPanels.createComponent(
				{ name: "prayerPanels", 
					kind: "PrayerList.PrayerPanels", 
				}
			);
			newComponent.render();
			this.$.rootPanels.render();
		} else {
			// necessary for PrayerView to display the title:
			prayerPanel.$.prayerView.rebuildBindings();
			// necessary for Scroller in PrayerView to work right:
			prayerPanel.$.prayerView.render();
		}
		if (PrayerList.NarrowPanels.isScreenNarrow()) {
			this.$.rootPanels.setIndex(2);
		} else if (enyo.dom.getWindowWidth() < 930) {
			this.$.rootPanels.setIndex(1);
		}
		this.log();
	},

	closePrayerPanels: function() {
		this.log();
		var panels = this.$.rootPanels.$.prayerPanels;
		if (panels) panels.destroy();
		if (! PrayerList.NarrowPanels.isScreenNarrow()) {
			this.$.rootPanels.setIndex(0);
		}
	},

	viewCategoryItems: function(inSender, inEvent) {
		if (PrayerList.NarrowPanels.isScreenNarrow()) {
			this.$.rootPanels.setIndex(1);
		}
		// This will make sure the categoryView's DOM dimensions are recomputed to fit the contents
		this.$.rootPanels.render();
		this.log();
	}
});