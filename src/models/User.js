const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
const validator = require("validator")

//schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be positive number")
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(data) {
      if (validator.isEmail(data) === false)
        throw new Error("Email is not valid!")
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value === "password") throw new Error("Password is not same password")
    },
  },
})
UserSchema.plugin(uniqueValidator)

//Model
const User = mongoose.model("User", UserSchema)

module.exports = User

// user.validate((err) => {
//   console.log(err)
// })
