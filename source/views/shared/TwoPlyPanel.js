enyo.kind({
	name: "PrayerList.TwoPlyPanel",
	kind: "Panels",
	arrangerKind: "CollapsingArranger",
	handlers: {
		onTransitionFinish: "transitionComplete",
		onClose: "popView"
	},

	pushView: function(inView, inOpts) {
		var view = inView;
		view.name = "topView";
		var c = this.createComponent(view, inOpts);
		c.render();
		this.reflow();
		this.next();
		return c;
	},

	popView: function(inSender, inEvent) {
        this.hidingView = true;
        this.previous();
    },

    transitionComplete: function(inSender, inEvent) {
        if(this.hidingView) {
            this.destroyView();
        }
    },

    destroyView: function() {
        this.$.topView.destroy();
        this.hidingView = false;
    },
});