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
            realtimeFit: true,
            fit: true,
            onTransitionFinish: "contentTransitionComplete", 
            components: [
                {
                    name: "basement",
                    kind: "Basement",
                    onSelectGroup: "viewGroupItems",
                    onAddGroup: "editGroup"
                },
                {
                    kind: "enyo.Panels", 
                    name:"contentPanels", 
                    arrangerKind:"CollapsingArranger", 
                    draggable:false, 
                    classes:"panels enyo-fit", 
                    onTransitionFinish: "contentTransitionComplete", 
                    components: [
                        {
                            name: "categoryView",
                            kind: "PrayerList.CategoryView",
                            classes: "enyo-fit",
                            title: "Today's Prayers",
                            onEditGroup: "editGroup",
                            onAddPrayerItem: "addPrayerItem",
                            onViewPrayerItem: "viewPrayerItem"
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
        this.$.rootPanels.next();    
    },

    toggleGF: function(inSender) {
        inSender.parent.next();
        this.log();
    },

    editGroup: function(inSender, inEvent) {
        this.log();
        if (! this.$.editGroup) {
            var newComponent = this.$.contentPanels.createComponent(
                {
                    name: "editGroup", 
                    kind: "UpperGroundFloor",  
                    isAddingNew: inSender.name === "basement" ? true : false, 
                    category: inSender.name === "groundFloor" ? inEvent : "",
                    onDoneEditing: "hideEditGroup"
                }, 
                {owner: this}
            );
            newComponent.render();
            this.$.contentPanels.render();
            this.$.contentPanels.setIndex(1);
        }
    },

    hideEditGroup: function() {
        this.hidingEditGroup = true;
        this.$.groundFloor.titleBinding.refresh();
        this.$.contentPanels.setIndex(0);
    },

    contentTransitionComplete: function(inSender, inEvent) {
        if(this.hidingEditGroup) {
            this.destroyEditGroup();
        }
    },

    destroyEditGroup: function() {
        //this.$.rootPanels.setIndex(0);
        this.$.editGroup.destroy();
        this.hidingEditGroup = false;
    },

    addPrayerItem: function(inSender, inEvent) {
        this.log();
    },

    viewPrayerItem: function(inSender, inEvent) {
        if (! this.$.prayerItem) {
            var newComponent = this.$.rootPanels.createComponent(
                {name: "prayerItem", kind: "UpperFloor"}, 
                {owner: this}
            );
            newComponent.render();
            this.$.rootPanels.render();
            this.$.rootPanels.setIndex(1);
        };
        this.log();
    },

    viewGroupItems: function(inSender, inEvent) {
        if (! this.$.categoryView) {
            var newComponent = this.$.rootPanels.createComponent(
                {name: "categoryView", title: inEvent.title, groupId: inEvent.model.rowID, kind: "PrayerList.CategoryView"}, 
                {owner: this}
            );
            newComponent.render();
            this.$.rootPanels.render();
            this.$.rootPanels.setIndex(1);
        } else {
            this.$.categoryView.$.header.render();
            // this.$.rootPanels.setIndex(1);
        };
        this.log();
    }
});