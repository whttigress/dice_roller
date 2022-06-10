var diceDB = (function () {
    var dDB = {};
    var datastore = null;
    dDB.open = function (callback) {
        var version = 1;
        var request = indexedDB.open("dice", version);
        request.onupgradeneeded = function (e) {
            var db = e.target.result;
            e.target.transaction.onerror = dDB.onerror;
            if (db.objectStoreNames.contains("dice")) {
                db.deleteObjectStore("dice");
            }
            var store = db.createObjectStore("dice", {
                keyPath: 'timestamp'
            });
        };
        request.onsuccess = function (e) {
            datastore = e.target.result;
            callback();
        };
        request.onerror = dDB.onerror;
    };
    dDB.fetchDice = function (callback) {
        var db = datastore;
        var transaction = db.transaction(["dice"], "readwrite");
        var objStore = transaction.objectStore("dice");

        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = objStore.openCursor(keyRange);

        var rolls = [];

        transaction.oncomplete = function (e) {
            callback(rolls);
        };
        cursorRequest.onsuccess = function (e) {
            var result = e.target.result;
            if (!!result == false) {
                return;
            }
            rolls.push(result.value);
            result.continue();
            
        };
        cursorRequest.onerror = dDB.onerror;
    };
    dDB.fetchRoll = function (id, callback) {
        var db = datastore;
        var transaction = db.transaction(["dice"], "readwrite");
        var objStore = transaction.objectStore("dice");

        var request = objStore.get(id);

        request.onsuccess = function (e) {
            var result = e.target.result
            if (!!result == false) {
                return;
            }
            callback(result);
        };
        request.onerror = dDB.onerror;

    };
    dDB.saveDice = function (roll, total, callback) {
        var db = datastore;
        var transaction = db.transaction(["dice"], "readwrite");
        var objStore = transaction.objectStore("dice");

        var timestamp = new Date().getTime();
        var entry = {
            "total": total,
            "roll": roll,
            "timestamp": timestamp
        };
        var request = objStore.put(entry);
        request.onsuccess = function (e) {
            callback(entry);
        };
        request.onerror = dDB.onerror;
    };
    dDB.deleteDice = function (id, callback) {
        var db = datastore;
        var transaction = db.transaction(["dice"], "readwrite");
        var objStore = transaction.objectStore("dice");

        var request = objStore.delete(id);

        request.onsuccess = function (e) {
            callback();
        }
        request.onerror = function (e) {
            console.log(e);
        }
    };
    return dDB;
}());