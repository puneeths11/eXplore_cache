const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
//--------------------------------------------

/*----------------------------------------------
Schema
------------------------------------------------*/
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);
//plugin- automatically adds hash, salt, methods

/*-----------------------------------------------------
Exporting
-----------------------------------------------------*/
module.exports = mongoose.model("User", userSchema);
