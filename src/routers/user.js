const router = require("express").Router()
const User = require("../models/user")
const auth = require("../middlewares/auth")

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

//POST /logout
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    )
    await req.user.save({ validateModifiedOnly: true })

    res.send()
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

//POST /logoutAll
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save({ validateModifiedOnly: true })

    res.send()
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

//GET /users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

//GET /users/me
router.get("/me", auth, async (req, res) => {
  res.send(req.user)
})

//GET /users/:id
router.get("/:id", auth, async (req, res) => {
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

//PATCH /users/me
router.patch("/me", auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowUpdateds = ["name", "age", "email", "password"]

  //Check valid update
  const isValid = updates.every((update) => allowUpdateds.includes(update))
  if (!isValid) return res.status(400).send({ error: "Invalid updates" })

  try {
    //Update user
    updates.forEach((update) => (req.user[update] = req.body[update]))
    await req.user.save({ validateModifiedOnly: true })

    res.send(req.user)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

//PATCH /users/:id
router.patch("/:id", auth, async (req, res) => {
  const _id = req.params.id.trim()
  const updates = Object.keys(req.body)
  const allowUpdateds = ["name", "age", "email", "password"]

  //Check valid update
  const isValid = updates.every((update) => allowUpdateds.includes(update))
  if (!isValid) return res.status(400).send({ error: "Invalid updates" })

  try {
    //Find user and Check user exist
    const user = await User.findById(_id)
    if (!user) return res.status(404).send()

    //Update user
    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save({ validateModifiedOnly: true })

    res.send(user)
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(400).send({ error: "Invalid ID" })
    res.status(400).send({ error: error.message })
  }
})

//DELETE /users/me
router.delete("/me", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id)
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

//DELETE /users/:id
router.delete("/:id", auth, async (req, res) => {
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
