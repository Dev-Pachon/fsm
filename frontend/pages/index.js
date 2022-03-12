import InputPage from "./input";
import {useState} from "react";

export default function HomePage() {

	const [inputOption, setInputOption] = useState(false)
	const [mooreOption, setMooreOption] = useState(false)
	const [mealyOption, setMealyOption] = useState(false)
	const [numStates, setNumStates] = useState(0)
	const [numInputs, setNumInputs] = useState(0)

	let handleChangeS = (e)=>{
		setNumStates(e.target.value)
	}
	let handleChangeI = (e)=>{
		setNumInputs(e.target.value)
	}

	let InputTable = (e) =>{
		setInputOption(true)
	}

	return(
		<div>
			<h1 className="text-center font-bold">FINITE STATE MACHINE</h1>
			{!inputOption&&
				<div>
					<p className="m-0">Choose one:</p>
					<div>
						<div className="flex flex-row w-256 justify-between	">
							<button className="buttons" onClick={()=>setMealyOption(true)} id="mealy">Mealy Machine</button>
							<button className="buttons" id="moore">Moore Machine</button>
						</div>
					</div>
				</div>}

			{mealyOption&&
				<div> 
					<input type="number" className="border" onChange={handleChangeS}/>
					<input type="number" className="border" onChange={handleChangeI}/>
					<button onClick={InputTable}>Click Here</button>
				</div>}

			{inputOption && <InputPage numStates={numStates} numInputs={numInputs}/>}
		</div>
	)
}