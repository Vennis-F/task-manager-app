const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

//Configure
require("./db/mongoose")
app.use(express.json()) //Translate json req.body to object

//REST API
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`)
})
