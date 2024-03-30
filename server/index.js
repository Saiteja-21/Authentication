const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userrouter = require("./routes/User.js");
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const dbUrl=process.env.DBURL 


const connectTodb = async () => {         
  return await mongoose.connect(dbUrl);
};

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/user", userrouter);
app.listen(port, async () => {
  connectTodb();
  console.log("server started");
});
