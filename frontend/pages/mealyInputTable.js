import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";

export default function MealyInputTable({numStates, inputAlphabet}) {

	let inputAlphabetSplit = inputAlphabet.split(",")

	const router = useRouter()
	let numInputs = inputAlphabetSplit.length

	useEffect(() => {
		let header = document.getElementById("thead")
		header.innerHTML = "";
		let e = document.createElement("th")
		header.append(e)
		e.append("")
		for (let i = 0; i < numInputs; i++) {
			let e1 = document.createElement("th")
			header.append(e1)
			e1.append("f( "+inputAlphabetSplit[i]+")")

			let e2 = document.createElement("th")
			header.append(e2)
			e2.append("g("+inputAlphabetSplit[i]+")")

		}
		let inputs = document.getElementById("tbody")
		inputs.innerHTML = "";

		for (let i = 0; i < numStates; i++) {
			let p = document.createElement("tr")
			p.append(String.fromCharCode("A".charCodeAt(0) + i))
			for (let j = 0; j < numInputs; j++) {
				let e1 = document.createElement("td")
				let inp1 = document.createElement("input")
				inp1.style.textAlign = 'center'
				p.append(e1)
				e1.classList.add("border")
				inp1.classList.add("w-full")
				e1.append(inp1)
				inp1.setAttribute("id", "inputMealy-" + i+j)

				let e2 = document.createElement("td")
				let inp2 = document.createElement("input")
				inp2.style.textAlign = 'center'
				p.append(e2)
				e2.classList.add("border")
				inp2.classList.add("w-full")
				e2.append(inp2)
				inp2.setAttribute("id", "outputMealy-" + i+j)
			}
			inputs.append(p)
		}
	})

	let sendDataMealy = () => {
		let obj = {}
		obj["numStates"] = numStates
		obj["inputAlphabet"] = inputAlphabet
		obj["MealyStateTable"] = {}

		for (let i = 0; i < numStates; i++) {
			console.log(String.fromCharCode("A".charCodeAt(0) + i))
			let state = String.fromCharCode("A".charCodeAt(0) + i)

			obj["MealyStateTable"][state] = {f: [], g: []}

			for (let j = 0; j < numInputs; j++) {

				let inputE = document.getElementById("inputMealy-" + i+j).value
				let outputE = document.getElementById("outputMealy-" + i+j).value

				obj["MealyStateTable"][state]["f"].push(inputE)
				obj["MealyStateTable"][state]["g"].push(outputE)
			}
		}

		console.log(obj)

		fetch('/api/fetchMealy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      	})

		router.push("/resultMealy")
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center items-center">
				<div className="flex mx-20">
					<table>
						<thead id="thead">
						</thead>
						<tbody id="tbody">

						</tbody>
					</table>
				</div>
				<button onClick={sendDataMealy}>Reduce table</button>				
			</div>
		</div>
	)
}