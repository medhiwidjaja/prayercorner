enyo.kind({
	name: "PrayerList.CategoryController",
	kind: "enyo.Collection",
	model: "PrayerList.Category",

    findByTitle: function(title) {
        return this.filter(function(v,a) {return v.title === title})
    },

	findById: function(id) {
        return this.filter(function(v,a) {return v.id === id})
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