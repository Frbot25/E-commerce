const Mongoose = require('mongoose');

Mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>
console.log(
  "==============Mongodb Database Connected Successfully=============="
)
)
.catch((err) => {
console.log(err);
console.log("Database Not Connected !!!");
});

module.exports = Mongoose;

