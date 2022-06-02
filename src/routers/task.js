const router = require("express").Router()
const Task = require("../models/task")
const auth = require("../middlewares/auth")

//POST /tasks
router.post("/", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id })

  try {
    const taskSaved = await task.save()
    res.status(201).send(taskSaved)
  } catch (error) {
    res.status(400).send(error)
  }
})

//GET /tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

//GET /tasks/:id
router.get("/:id", async (req, res) => {
  let _id = req.params.id.trim()

  try {
    //Find task and Check task exist
    const task = await Task.findById(_id)
    if (!task) return res.status(404).send()

    res.send(task)
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(400).send({ error: "Invalid ID" })
    res.status(500).send(error)
  }
})

//PATCH /tasks/:id
router.patch("/:id", async (req, res) => {
  const _id = req.params.id.trim()
  const updates = Object.keys(req.body)
  const allowUpdateds = ["description", "completed"]

  //Check valid update
  const isValid = updates.every((update) => allowUpdateds.includes(update))
  if (!isValid) return res.status(400).send({ error: "Invalid updates" })

  try {
    //Updated user and check userUpdated exist
    let taskUpdated = await Task.findByIdAndUpdate(
      _id,
      { ...req.body },
      { new: true, runValidators: true }
    )
    if (!taskUpdated) return res.status(404).send()

    res.send(taskUpdated)
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(400).send({ error: "Invalid ID" })
    res.status(400).send(error)
  }
})

//DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  const _id = req.params.id.trim()

  try {
    const task = await Task.findByIdAndDelete(_id)
    if (!task) return res.status(404).send()

    res.send(task)
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(400).send({ error: "Invalid ID" })
    res.status(500).send(error)
  }
})

module.exports = router
