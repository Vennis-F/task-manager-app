require("../src/db/mongoose")
const Task = require("../src/models/Task")

Task.findByIdAndDelete("628f05bf7aac459ad01c577e")
  .then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
  })
  .then((nums) => console.log(nums))
  .catch((error) => console.log(error))
