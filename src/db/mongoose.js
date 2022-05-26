const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
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
  },
})

UserSchema.plugin(uniqueValidator)
const User = mongoose.model("User", UserSchema)

//Task schema and model
const TaskScheme = mongoose.Schema({
  description: String,
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
task
  .save()
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
