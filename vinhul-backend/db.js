const mongooseConnection = require("mongoose");
mongooseConnection
  .connect("mongodb://127.0.0.1:27017/vinhul", { useNewUrlParser: true })
  .then(console.log("[MESSAGE] Database connected..."))
  .catch((error) => { console.error("[ERROR] " + error); });

const userSchema = new mongooseConnection.Schema({
  email: String,
  password: String,
  name: String,
}, {
  collection: "user"
});

const wineSchema = new mongooseConnection.Schema({
  origin: String,
  type: String,
  grapeType: String,
  foodHarmony: String,
  image: {
    data: Buffer,
    contentType: String
  }
}, {
  collection: "wine"
});

const reviewSchema = new mongooseConnection.Schema({
  score: Number,
  message: String
}, {
  collection: "review"
});

module.exports = {
  mongooseModule: mongooseConnection,
  userSchema: userSchema,
  wineSchema: wineSchema,
  reviewSchema: reviewSchema
};