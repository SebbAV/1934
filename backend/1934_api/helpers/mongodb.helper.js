/**
 * This helper allows to control the database connections
 * and launching commands
 */


var config = require('config');
var MongoClient = require('mongodb').MongoClient;
function getUrl() {
    return "mongodb://" +
        config.databases.development.host + ":" +
        config.databases.development.port + "/";
}
function getDB() {
    return config.databases.development.database;
}

module.exports = {
    insert: function (object, collection) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(getUrl(), function (err, db) {
                if (err) reject(err);
                var dbo = db.db(getDB());
                dbo.collection(collection).insertOne(object, function (err, res) {
                    if (err) reject(err);
                    db.close();
                    resolve(res.insertedId);
                });
            });
        });
    }
}