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
            wrap: true,
            components: [
                {
                    name: "basement" ,
                    kind: "Basement"
                },
                {
                    name: "groundFloor",
                    kind: "GroundFloor"
                },
                {
                    name: "upperFloor",
                    kind: "UpperFloor"
                }
            ]
        }
    ],
    toggleBasement: function() {
        this.$.rootPanels.next();    
    },
    toggleGF: function(inSender) {
        inSender.parent.next();
        this.log();
    }
});