const mongoose = require("mongoose")

//DB local
//"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"

//Connect db
mongoose.set("autoIndex", false)
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api")
  .then(() => console.log("DB Connect sucessful"))
  .catch(() => console.log("Cannot connect to DB"))
