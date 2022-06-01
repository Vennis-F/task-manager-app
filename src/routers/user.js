const router = require("express").Router()
const { findById } = require("../models/user")
const User = require("../models/user")

//POST /users
router.post("/", async (req, res) => {
  const user = new User(req.body)

  try {
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

//GET /users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

//GET /users/:id
router.get("/:id", async (req, res) => {
  let _id = req.params.id.trim()

  try {
    //Find user by id vs Check user empty
    const user = await User.findById(_id)
    if (!user) return res.status(404).send()

    res.send(user)
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(400).send({ error: "Invalid ID" })
    res.status(500).send(error)
  }
})

//PATCH /users/:id
router.patch("/:id", async (req, res) => {
  const _id = req.params.id.trim()
  const updates = Object.keys(req.body)
  const allowUpdateds = ["name", "age", "email", "password"]

  //Check valid update
  const isValid = updates.every((update) => allowUpdateds.includes(update))
  if (!isValid) return res.status(400).send({ error: "Invalid updates" })

  try {
    //Find user and Check user exist
    const user = findById(_id)
    if (!user) return res.status(404).send()

    //Update user
    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save({ validateModifiedOnly: true })

    res.send(user)
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(400).send({ error: "Invalid ID" })
    res.status(400).send(error)
  }
})

//DELETE /users/:id
router.delete("/:id", async (req, res) => {
  const _id = req.params.id.trim()

  try {
    const user = await User.findByIdAndDelete(_id)
    if (!user) return res.status(404).send()

    res.send(user)
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(400).send({ error: "Invalid ID" })
    res.status(500).send(error)
  }
})

module.exports = router
