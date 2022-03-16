const express = require("express");
const bodyParser = require("body-parser");
const { fetchDataMealy } = require("./model");
const model = require("./model");
const serverPort = "8080"

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/getMealyResult",(req,res)=>{

	let result = model.showMealy()

	console.log(result)

	let data = JSON.stringify(result)

	res.send(data)
})

app.get("/getMooreResult",(req,res)=>{
	console.log("Result")
	let result = model.showMoore()

	console.log(result)

	let data = JSON.stringify(result)

	res.send(data)
})

app.post("/fetchMealy",(req,res)=>{
	let data = req.body
	console.log(req.body)
	model.fetchDataMealy(data)
	res.sendStatus(200)
})

app.post("/fetchMoore",(req,res)=>{
	let data = req.body
	console.log(req.body)
	console.log("SE EJECUTA?")
	model.fetchDataMoore(data)

	res.sendStatus(200)
})

app.listen(serverPort);