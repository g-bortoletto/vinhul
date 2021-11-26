const mongooseConnection = require("mongoose");
mongooseConnection
  .connect("mongodb://127.0.0.1:27017/vinhul", { useNewUrlParser: true })
  .then(console.log("[MESSAGE] Database connected..."))
  .catch((error) => { console.error("[ERROR] " + error)});

const userSchema = new mongooseConnection.Schema({
  email: String,
  password: String
}, {
  collection: "user"
});

module.exports = { mongooseModule: mongooseConnection, userSchema: userSchema };