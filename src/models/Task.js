const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
const validator = require("validator")

//schema
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

//Model
const Task = mongoose.model("Task", TaskScheme)

module.exports = Task
