enyo.depends(
	"$lib/layout",
	"$lib/layout/easing",
	"$lib/onyx/source",	// To theme Onyx using Theme.less, change "$lib/onyx" to "$lib/onyx/source",
	"Theme.less",	// uncomment this line, and follow the steps described in Theme.less
	"lib",
	"css",
	"models",
	"controllers",
	"apps",
	"views",
	// include our default entry point
	"start.js"
);
