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
            fit: true,
            //wrap: true,
            onTransitionFinish: "rootTransitionComplete", 
            components: [
                {
                    name: "basement",
                    kind: "Basement",
                    onSelectCategory: "viewCategoryItems",
                    onAddCategory: "editCategory"
                },
                {
                    kind: "enyo.Panels", 
                    name:"contentPanels", 
                    arrangerKind:"CollapsingArranger", 
                    draggable:false, 
                    //wrap: true,
                    classes:"panels enyo-fit", 
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
                // {
                //     name: "upperFloor",
                //     kind: "UpperFloor",
                //     classes: "wide"
                // }

            ]
        }
    ],

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
        if (inSender.parent.index === 0) {
            inSender.parent.next();
        } else {
            inSender.parent.previous();
        }
        //inSender.parent.next();
        this.log();
    },

    editCategory: function(inSender, inEvent) {
        this.log();
        pl.editCategoryController.set("isAddingNew", inSender.name === "basement" ? true : false); 
        if (! this.$.editGroup) {
            var newComponent = this.$.contentPanels.createComponent(
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
            this.$.contentPanels.render();
            //if (enyo.Panels.isScreenNarrow()) {
                this.$.contentPanels.setIndex(1);
            //}
        }
    },

    //FIXME: hiding Edit Group View doesn't animate
    hideEditGroup: function() {
        this.hidingEditGroup = true;
        this.$.basement.$.groups.render();
        this.$.categoryView.refreshBindings();
        //this.$.editGroup.titleBinding.refresh();
        this.$.contentPanels.setIndex(0);
    },

    //FIXME: hiding PrayerView doesn't animate
    hidePrayerView: function() {
        this.log();
        this.hidingPrayerView = true;
        //this.$.basement.$.groups.render();
        this.$.contentPanels.setIndex(0);
    },

    rootTransitionComplete: function(inSender, inEvent) {
        if (this.hidingPrayerView) {
            this.destroyPrayerView();
            this.log("Prayerview")
        }
    },

    contentTransitionComplete: function(inSender, inEvent) {
        if(this.hidingEditGroup) {
            this.destroyEditGroup();
            this.log("edit group")
        }
    },

    destroyEditGroup: function() {
        //this.$.rootPanels.setIndex(0);
        this.$.editGroup.destroy();
        this.hidingEditGroup = false;
    },

    destroyPrayerView: function() {
        this.$.prayerView.destroy();
        this.hidingPrayerView = false;
    },

    addPrayerItem: function(inSender, inEvent) {
        this.log();
    },

    viewPrayerItem: function(inSender, inModel) {
        if (! this.$.prayerView) {  
            var newComponent = this.$.rootPanels.createComponent(
                {name: "prayerView", 
                    kind: "PrayerList.PrayerView",
                    mixins: ["enyo.AutoBindingSupport"],
                    onDoneEditing: "hidePrayerView",
                    onGrabberTap: "toggleGF"
                }, 
                {owner: this}
            );
            newComponent.set("model", inModel);
            pl.journalEntriesCollection.filterPrayer(inModel);
            pl.bibleVersesCollection.filterPrayer(inModel);
            //newComponent.$.journals.set("controller", pl.journalEntriesCollection);
            newComponent.render();
            this.$.rootPanels.render();
            if (enyo.Panels.isScreenNarrow()) {
                this.$.rootPanels.setIndex(2);
            }
            this.log("New: " + inModel.title);
        } else {
            this.$.prayerView.set("model", inModel);
            pl.journalEntriesCollection.filterPrayer(inModel);
            pl.bibleVersesCollection.filterPrayer(inModel);
            if (enyo.Panels.isScreenNarrow()) {
                this.$.rootPanels.setIndex(2);
            }
            //this.$.prayerView.$.journals.set("controller", pl.journalEntriesCollection);
            this.log("Changed: " + inModel.title);
        };
    },

    viewCategoryItems: function(inSender, inEvent) {
        if (! this.$.categoryView) {
            var newComponent = this.$.rootPanels.createComponent(
                {name: "categoryView", title: inEvent.title, groupId: inEvent.model.rowID, kind: "PrayerList.CategoryView"}, 
                {owner: this}
            );
            newComponent.render();
            this.$.rootPanels.render();
            if (enyo.Panels.isScreenNarrow()) {
                this.$.rootPanels.setIndex(1);
            }
        } else {
            //this.$.categoryView.$.header.render();
            if (enyo.Panels.isScreenNarrow()) {
                this.$.rootPanels.setIndex(1);
            }    
        };
        this.log();
    }
});