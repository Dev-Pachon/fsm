import React, {useEffect, useState} from "react";

export default function InputPage({numInputs, numStates}){

	useEffect(() => {
		let header = document.getElementById("thead")
		header.innerHTML = "";
		let e = document.createElement("th")
		header.append(e)
		e.append("")
		for(let i = 0 ; i <numInputs; i++){
			let e = document.createElement("th")
			header.append(e)

			e.append(String.fromCharCode("A".charCodeAt(0)+i))

		}
		let inputs = document.getElementById("tbody")
		inputs.innerHTML = "";

		for (let i = 0; i < numStates; i++) {
			let p = document.createElement("tr")
			p.append("q"+i)
			for(let i = 0 ; i <numInputs; i++){
				let e = document.createElement("td")
				let inp = document.createElement("input")
				p.append(e)
				e.classList.add("border")
				e.append(inp)
				e.setAttribute("id", "input-"+i)
			}
			inputs.append(p)
		}
	})

	return(
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="flex flex-col justify-center items-center h-screen">
				<div className="text-2xl">Transition Table</div>
					<div className="flex container mx-30">
						<table >
							<thead id="thead">
							</thead>
							<tbody id="tbody">

							</tbody>
						</table>
					</div>
			</div>
		</div>
	)
}