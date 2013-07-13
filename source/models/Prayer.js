enyo.kind({
	name: "PrayerList.Prayer",
	kind: "enyo.Model",
	attributes: {
		id: "",
		title: "",
		answered: "",
		category: "",
		createdDate: "",
		answeredDate: "",
		rowNo: "",
		// journalEntries: {
		// 	relation: enyo.toMany({
		// 		inverseKey: "prayer",
		// 		model: "PrayerList.JournalEntry",
		// 		inCommit: true
		// 	})
		// },
		// verses: {
		// 	relation: enyo.toMany({
		// 		inverseKey: "prayer",
		// 		model: "PrayerList.BibleVerse",
		// 		inCommit: true
		// 	})
		// }
	}
});

/*** DATA:

PrayerList.Category:01aea6f9-d3d2-6061-6cfd-1c35cf09514b
{"id":"01aea6f9-d3d2-6061-6cfd-1c35cf09514b","title":"Church"}
PrayerList.Category:618b8d97-5e1e-bf28-d906-ddaaff55d630
{"id":"618b8d97-5e1e-bf28-d906-ddaaff55d630","rowID":1,"title":"Family"}
PrayerList.Category:b330cb38-005a-0964-aa63-754945f149e0
{"id":"b330cb38-005a-0964-aa63-754945f149e0","title":"Personal"}
PrayerList.Category:b824b588-165b-c46a-4245-5fc6ad46ac3c
{"id":"b824b588-165b-c46a-4245-5fc6ad46ac3c","title":"Work"}
PrayerList.Prayer:1a00d8ee-b724-58d8-6767-9df92df4fa1f
{"id":"1a00d8ee-b724-58d8-6767-9df92df4fa1f","title":"Church building","category":"01aea6f9-d3d2-6061-6cfd-1c35cf09514b"}
PrayerList.Prayer:69797c2c-d6b3-2bec-5a78-976db79d5ca4
{"id":"69797c2c-d6b3-2bec-5a78-976db79d5ca4","title":"Perseverance in finishing book","category":"01aea6f9-d3d2-6061-6cfd-1c35cf09514b"}
PrayerList.Prayer:84859c7c-7dcf-063c-23cf-0e05875a461a
{"id":"84859c7c-7dcf-063c-23cf-0e05875a461a","title":"Presentation at National Conference","category":"b824b588-165b-c46a-4245-5fc6ad46ac3c"}
PrayerList.Prayer:88b99b13-541b-822d-53a7-e793b757b8ee
{"id":"88b99b13-541b-822d-53a7-e793b757b8ee","title":"Approval for new company building","category":"b824b588-165b-c46a-4245-5fc6ad46ac3c"}
PrayerList.Prayer:aa50daec-2475-805f-7551-bca661542799
{"id":"aa50daec-2475-805f-7551-bca661542799","title":"Sunday School curriculum","category":"01aea6f9-d3d2-6061-6cfd-1c35cf09514b"}
PrayerList.Prayer:ef7867a8-6484-478a-07ca-5b0cf51f3288
{"id"

***/