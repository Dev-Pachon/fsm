import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";


export default function MooreInputTable({inputAlphabet, numStates}) {

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
			e1.append("f(" + inputAlphabetSplit[i] + ")")
		}
		let e2 = document.createElement("th")
		header.append(e2)
		e2.append("h")
		
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
				inp1.setAttribute("id", "inputMoore-" + i+j)
			}
			let e1 = document.createElement("td")
			let inp1 = document.createElement("input")
			inp1.style.textAlign = 'center'
			p.append(e1)
			e1.classList.add("border")
			inp1.classList.add("w-full")
			e1.append(inp1)
			inp1.setAttribute("id", "outputMoore-"+i)
			inputs.append(p)
		}
	})

	let sendDataMoore = () => {
		let obj = {}
		obj["numStates"] = numStates
		obj["inputAlphabet"] = inputAlphabet
		obj["MooreStateTable"] = {}

		for (let i = 0; i < numStates; i++) {
			console.log(String.fromCharCode("A".charCodeAt(0) + i))
			let state = String.fromCharCode("A".charCodeAt(0) + i)

			obj["MooreStateTable"][state] = {f: [], h: []}

			for (let j = 0; j < numInputs; j++) {

				let inputE = document.getElementById("inputMoore-" + i+j).value

				obj["MooreStateTable"][state]["f"].push(inputE)
			}
			let outputE = document.getElementById("outputMoore-"+i).value
			obj["MooreStateTable"][state]["h"].push(outputE)

		}

		console.log(obj)

		fetch('/api/fetchMoore', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
			  })
	
			router.push("/resultMoore")
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
				<button onClick={sendDataMoore}>Reduce table</button>
			</div>
		</div>
	)
}