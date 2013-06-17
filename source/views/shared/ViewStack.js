enyo.kind({
	name: "ViewStack",
	kind: "Panels",
	arrangerKind: "CarouselArranger",
	draggable: false,
	handlers: {
		onTransitionFinish: "transitionFinish"
	},
	currView: -1,
	transitionFinish: function() {
		// Suppress event while in the process of popping panels
		if (this.suppressFinish) {
			return true;
		}
		// When the last panel is greater than the current, we need to pop
		var last = this.getPanels().length - 1;
		if (last > this.currView) {
			this.suppressFinish = true;
			// Turn off animation, since panels will jump while destroying
			this.saveAnimate = this.getAnimate();
			this.setAnimate(false);
			// Pop any views in excess (to the right) of the current
			while (last > this.currView) {
				var view = this.getPanels()[last];
				view.destroy();
				last--;
			}
			// Go directly back to the current view and restore animation
			this.setIndexDirect(this.currView);
			this.setAnimate(this.saveAnimate);
			this.suppressFinish = false;
		}
	},
	pushView: function(inView, inOpts) {
		this.currView++;
		var c = this.createComponent(inView, inOpts);
		c.render();
		this.reflow();
		this.next();
		return c;
	},
	popView: function() {
		this.currView--;
		this.previous();
	},
	popToRootView: function(direct) {
		this.currView = 0;
		if (direct) {
			this.setIndexDirect(0);
		} else {
			this.setIndex(0);
		}
	},
	popAll: function() {
		this.saveAnimate = this.getAnimate();
		this.setAnimate(false);
		this.suppressFinish = true;
		var last = this.getPanels().length - 1;
		while (last > -1) {
			var view = this.getPanels()[last];
			view.destroy();
			last--;
		}
		this.setAnimate(this.saveAnimate);
		this.suppressFinish = false;
	}
});