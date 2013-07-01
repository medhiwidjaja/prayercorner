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

                },
                {
                    name: "groundFloor",
                    kind: "GroundFloor",
                    classes: "enyo-fit",
                    title: "Today's Prayers",
                    onEditGroup: "editGroup",
                    onAddPrayerItem: "addPrayerItem",
                    onViewPrayerItem: "viewPrayerItem"
                },
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
        var newComponent = this.$.rootPanels.createComponent(
            {name: "editGroup", kind: "UpperGroundFloor", onDoneEditing: "hideEditGroup"}, 
            {owner: this}
        );
        newComponent.render();
        this.$.rootPanels.render();
        this.$.rootPanels.setIndex(1);
    },

    hideEditGroup: function() {
        this.hidingEditGroup = true;
        this.$.rootPanels.setIndex(0);
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
        if (! this.$.groundFloor) {
            var newComponent = this.$.rootPanels.createComponent(
                {name: "groundFloor", title: inEvent.title, groupId: inEvent.model.rowID, kind: "GroundFloor"}, 
                {owner: this}
            );
            newComponent.render();
            this.$.rootPanels.render();
            this.$.rootPanels.setIndex(1);
        } else {
            this.$.groundFloor.$.header.render();
        };
        this.log(inEvent);
    }
});