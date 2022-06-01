const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})
userSchema.plugin(uniqueValidator)

//method Model and method Instance
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = await jwt.sign({ _id: user._id }, "SEC_JWT")

  //Save token to user.tokens
  user.tokens.push({ token })
  await user.save({ validateModifiedOnly: true })

  return token
}
userSchema.statics.findByCredentials = async (email, password) => {
  //Check email
  const user = await User.findOne({ email })
  if (!user) throw new Error("Unable to login")

  //Check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Unable to login")
  return user
}

//Middleware instance
userSchema.pre("save", async function (next) {
  const user = this
  //isModified
  //true: create new, có field password trong update
  //false: field không có trong create và update
  //!!! không compare pwd mà mình update với passHash trong db
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

//Model
const User = mongoose.model("User", userSchema)

module.exports = User

// user.validate((err) => {
//   console.log(err)
// })
