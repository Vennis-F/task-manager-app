const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const User = require("./models/User")
const Task = require("./models/Task")

//Configure
require("./db/mongoose")
app.use(express.json()) //Translate json req.body to object

//REST API
app.post("/users", (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then((u) => {
      res.send(u)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`)
})
