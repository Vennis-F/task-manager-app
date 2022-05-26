//CRUD
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017"
const database = "task-manager"

MongoClient.connect(connectionURL)
  .then((client) => {
    client.db(database).collection("users")

    // client.db(database).collection("users").insertOne({ name: "anh" })
    client
      .db(database)
      .collection("users")
      .findOne({ name: "anh" })
      .then((data) => {
        console.log(data._id)
      })
  })
  .catch((err) => {
    console.log("Unable connect to database")
  })
