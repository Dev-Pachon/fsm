import React, {useEffect, useState} from "react";

export default function MooreInputTable({inputAlphabet, numStates}) {

	inputAlphabet = inputAlphabet.split(",")

	let numInputs = inputAlphabet.length

	useEffect(() => {
		let header = document.getElementById("thead")
		header.innerHTML = "";
		let e = document.createElement("th")
		header.append(e)
		e.append("")
		for (let i = 0; i < numInputs; i++) {
			let e1 = document.createElement("th")
			header.append(e1)
			e1.append("f(" + inputAlphabet[i] + ")")
		}
		let e2 = document.createElement("th")
		header.append(e2)
		e2.append("h")

		let inputs = document.getElementById("tbody")
		inputs.innerHTML = "";

		for (let i = 0; i < numStates; i++) {
			let p = document.createElement("tr")
			p.append("q" + i)
			for (let i = 0; i < numInputs; i++) {
				let e1 = document.createElement("td")
				let inp1 = document.createElement("input")
				p.append(e1)
				e1.classList.add("border")
				inp1.classList.add("w-full")
				e1.append(inp1)
				inp1.setAttribute("id", "inputMoore-" + i)
			}
			let e1 = document.createElement("td")
			let inp1 = document.createElement("input")
			p.append(e1)
			e1.classList.add("border")
			inp1.classList.add("w-full")
			e1.append(inp1)
			inp1.setAttribute("id", "outputMoore")
			inputs.append(p)
		}
	})

	let sendDataMealy = () => {
		let obj = {}
		obj["numStates"] = numStates
		obj["numInputs"] = numInputs
		obj["StateTable"] = {}

		for (let i = 0; i < numStates; i++) {
			console.log(String.fromCharCode("A".charCodeAt(0) + i))
			let state = String.fromCharCode("A".charCodeAt(0) + i)

			obj["StateTable"][state] = {f: [], g: []}

			for (let j = 0; j < numInputs; j++) {

				let inputE = document.getElementById("input-" + i).value
				let outputE = document.getElementById("output-" + i).value

				obj["StateTable"][state]["f"].push(inputE)
				obj["StateTable"][state]["g"].push(outputE)
			}
		}

		console.log(obj)
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center items-center">
				<div className="flex container mx-40">
					<table>
						<thead id="thead">
						</thead>
						<tbody id="tbody">

						</tbody>
					</table>
				</div>
				<button onClick={sendDataMealy}>Click</button>
			</div>
		</div>
	)
}