//  Add your code here
const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celebrity = mongoose.model("Celebrities", celebritySchema);

module.exports = Celebrity;
