const express = require("express");
const model = require("./model");
const serverPort = "8080"

const app = express();

app.get("/",(req,res)=>{
	res.send(model.partition())
})

app.listen(serverPort);