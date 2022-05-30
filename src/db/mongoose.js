const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
const validator = require("validator")

//"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"

mongoose.set("autoIndex", false)
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api")
  .then(() => console.log("DB Connect sucessful"))
  .catch(() => console.log("Cannot connect to DB"))

//User schema and model
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

const User = mongoose.model("User", UserSchema)

// const user = new User({
//   name: "Anh 4",
//   age: 10,
//   email: "hoanganhgo@gmail.com",
//   password: "narut  ",
// })
// console.log(user)

// user.validate((err) => {
//   console.log(err)
// })

// user
//   .save()
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//Task schema and model
const TaskScheme = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})
TaskScheme.plugin(uniqueValidator)
const TaskModel = mongoose.model("Task", TaskScheme)

//Create instance model
const task = new TaskModel({
  description: "Làm bài tập SWP",
})
// task
//   .save()
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//(Khi login có jwt rồi thì đa Authen)
//get/:idCart
//jwt: userID
//B1: Đã Authen chưa: valid jwt, có req.user, role, đã biết user là ai với idUser và role
//B2: Author: + role: ok qua
//            +
