const mongooseConnection = require("mongoose");
mongooseConnection
  .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
  })
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
  name: String,
  origin: String,
  type: String,
  grapeType: String,
  foodHarmony: String,
  image: String
}, {
  collection: "wine"
});

const reviewSchema = new mongooseConnection.Schema({
  score: Number,
  title: String,
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