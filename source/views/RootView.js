enyo.kind({
    name: "Foreplot.RootView",
    kind: "enyo.View",
    classes: "foreplot",
    components: [
        {
        	name: "rootPanels", 
        	kind: "enyo.Panels",
		    arrangerKind: "enyo.CollapsingArranger",
		    classes: "foreplot-panels enyo-fit",
		    realtimeFit: true,
            wrap: true,
		    components: [{
		        name: "basement", kind: "Foreplot.Basement"
            },{
                name: "lgFloor",
                kind: "enyo.Panels", arrangerKind: "enyo.CollapsingArranger",
                classes: "foreplot-panels enyo-fit",
                peekWidth: 50, wrap: true,
                components: [
    		        {name: "groundFloor", kind: "Foreplot.GroundFloor", onGFGrabberTap: "toggleBasement", showing: true},
    		        {name: "levelOne", kind: "Foreplot.LevelOne", onL1GrabberTap: "toggleGF", showing: true}
                ]
            }]
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