enyo.kind({
	name: "PrayerList.CategoryController",
	kind: "enyo.Collection",
	model: "PrayerList.Category",

    findByTitle: function(title) {
        var m = this.filter(function(v,a) {return v.title === title});
        return m[0];
    },

	findById: function(id) {
        var m = this.filter(function(v,a) {return v.id === id});
        return m[0];
    },

    build: function(data) {
    	this.log();
		return new this.model(data);
	},

	createNew: function(model) {
		model.commit();
		this.log()
	},

	save: function(model) {
		model.commit();
		this.log()
	},

	delete: function(model) {
		model.destroy();
		this.log()
	}

})