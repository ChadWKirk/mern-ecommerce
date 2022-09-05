const { MongoClient } = require("mongodb");
const Db = process.env.DATABASE_URL;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (db) {
        _db = db.db("mern-ecommerce");
        console.log("successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: () => {
    return _db;
  },
};
