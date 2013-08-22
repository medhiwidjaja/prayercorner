enyo.kind({
	name: "Categories",
    events: {
        onReadData: ""
    },
	components: [
  		{
            name: "db",
            kind: "onecrayon.Database",
            database: 'ext:com.prayerlist.db',
            version: "",
            debug: false
        }
	],

    constructor: function() {
        this.inherited(arguments);

        // Ensures we don't try to load items multiple times while in asynchronous communication w/ database
        // Is also set to true while loading table schema and intro data
        this.runningQuery = false;

        // This is a common pattern for me; I do all my multi-use bindings in the constructor
        this.bound = {
            finishFirstRun: enyo.bind(this, this.finishFirstRun),
            setList: enyo.bind(this, this.setList),
            handleAllError: enyo.bind(this, this.handleAllError),
            handlePopulateError: enyo.bind(this, this.handlePopulateError),
            handleSetListError: enyo.bind(this, this.handleSetListError)
        };
    },

	create: function() {
		this.inherited(arguments);
		
		if (!localStorage["PrayerList.firstRun"] && !this.runningQuery) {
            this.populateDatabase();
        } else {
        	this.all(this.bound.setList, this.bound.handleAllError);
        }
	},

	setList: function(inSender, inEvent) {
		for (var idx in inEvent) {
			this.catlist.push({ 
				title: inEvent[idx].title,
				count: inEvent[idx].ct
			});
		};
        this.doReadData(inSender, inEvent);
	},


    populateDatabase: function() {
        this.runningQuery = true;
        // Run the table creation schema and populate our items list
        this.$.db.setSchemaFromURL('/assets/db/PrayerListSchema.json', {
            onSuccess: this.bound.finishFirstRun,
            onError: this.bound.handlePopulateError
        });
    },

    // This finishes the first run insert and calls the insert method
    finishFirstRun: function() {
        localStorage["PrayerList.firstRun"] = "true";
        // Set the database version (allows for schema upgrades down the road)
        this.$.db.changeVersion('1.0');
        this.runningQuery = false;

        // I proceed to refresh my document listings here
        // this.all(this.bound.setList, this.bound.handleError);
    },

    // viewGroupItem: function(inSender, inEvent) {
    // 	this.doViewGroupItem(this.catlist[inEvent.index]);
    // },

    all: function(handleSuccess, handleError) {
        var sql = 'SELECT g.title, count(p.rowID) as count FROM groups g, prayers p WHERE p.category = g.rowID GROUP BY p.category';
        this.$.db.query(sql, { "onSuccess": handleSuccess, "onError": handleError });
    },

    findGroup: function(id, callback) {
        // Construct our query object
        var query = {
            "sql": "SELECT title FROM groups WHERE rowID = ?",
            "values": [ id ]
        };
        // Run the query
        this.$.db.query(query, { "onSuccess": callback });
    },

    searchGroups: function(searchString, callback) {
        // Sanitize the search string for backslash escapes and wildcards
        searchString = searchString.replace(/\\/g, '\\\\').replace(/(%|_)/g, '\\$1');
        // Add wildcards around the searchString
        searchString = '%' + searchString + '%';
        // Construct our query object
        var query = {
            "sql": "SELECT title FROM groups WHERE title LIKE ? ESCAPE '\\'",
            "values": [ searchString ]
        };
        // Run the query
        this.$.db.query(query, { "onSuccess": callback });
    },

    handlePopulateError: function() {
    	this.log("Error");
    },

    handleAllError: function() {
    	this.log("Error");
    },

    handleSetListError: function() {
    	this.log("Error");
    },

    catlist: [],

});