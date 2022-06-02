const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
const validator = require("validator")

//schema
const taskSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
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
taskSchema.plugin(uniqueValidator)

//Model
const Task = mongoose.model("Task", taskSchema)

module.exports = Task
