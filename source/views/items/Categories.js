enyo.kind({
	name: "Categories",
	components: [
		{ kind: "Repeater", onSetupItem: "setupItem", components: [
			{ name: "item", components: [
				{ name: "count", classes: "list-item-count" },
				{ name: "title", classes: "list-item-title"}
			]}
		]},
		// {
		// 	name: "groupdb",
		// 	kind: "PrayerList.GroupsModel"
  //       }
  		{
            name: "db",
            kind: "onecrayon.Database",
            database: 'ext:com.prayerlist.db',
            version: "",
            //debug: (enyo.exists(enyo.fetchFrameworkConfig().debuggingEnabled) ? enyo.fetchFrameworkConfig().debuggingEnabled : false)
            debug: true
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

	setupItem: function(inSender, inEvent) {
		var menu = this.catlist[inEvent.index];

		var item = inEvent.item;
		item.$.title.setContent(menu.title);
		item.$.count.setContent(menu.count);
		return true;
	},

	setList: function(results) {
		this.catlist = results;
		this.$.repeater.setCount(this.catlist.length);
	},


    populateDatabase: function() {
        this.runningQuery = true;
        // Run the table creation schema and populate our items list
        this.$.db.setSchemaFromURL('/assets/db/PrayerListSchema.json', {
        //this.$.db.setSchema(this.schema, {
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
        this.all(this.bound.setList, this.bound.handleError);
		this.$.repeater.setCount(this.catlist.length);
		//this.$.repeater.setCount(4);
    },

    all: function(handleSuccess, handleError) {
        var sql = 'SELECT title FROM groups';
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

    schema: [
	    {
	        "table": "prayers",
	        "columns": [
	            { "column": "rowID", "type": "INTEGER", "constraints": ["PRIMARY KEY"] },
	            { "column": "title", "type": "TEXT" },
	            { "column": "answered", "type": "INTEGER" },
	            { "column": "category", "type": "INTEGER" },
	            { "column": "createdDate", "type": "TEXT" },
	            { "column": "answeredDate", "type": "TEXT" }
	        ],
	        "data": [
	            { "rowID": 1, "title": "Vacation as a family", "category": 1 },
	            { "rowID": 2, "title": "Guidance as we move to new city. Dad’s job, Mom’s coping with new responsibilities, Bob and Fiona’s schools", "category": 1 },
	            { "rowID": 3, "title": "Wisdom in expanding the business", "category": 3 },
	            { "rowID": 4, "title": "Perseverance in finishing my book", "category": 2, "answeredDate": "25/02/2013" }
	        ]
	    },
	    {
	        "table": "groups",
	        "columns": [
	            { "column": "rowID", "type": "INTEGER", "constraints": ["PRIMARY KEY"] },
	            { "column": "title", "type": "TEXT" },
	            { "column": "answeredCount", "type": "INTEGER" },
	            { "column": "unansweredCount", "type": "INTEGER" }
	        ],
	        "data": [
	            { "rowID": 1, "title": "Family"},
	            { "rowID": 2, "title": "Personal" },
	            { "rowID": 3, "title": "Work" },
	            { "rowID": 3, "title": "Church" }
	        ]
	    }
	]
	// catlist: [
	// 	{title: "Family", count: 8 },
	// 	{title: "Personal", count: 3 },
	// 	{title: "Work", count: 2 },
	// 	{title: "Church", count: 5 }
	// ]
});