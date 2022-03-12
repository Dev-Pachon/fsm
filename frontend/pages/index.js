import InputPage from "./input";
import { useState } from "react";


export default function HomePage() {

	const [inputOption, setInputOption] = useState(false)
	const [mooreOption, setMooreOption] = useState(false)
	const [mealyOption, setMealyOption] = useState(false)
	const [numStates, setNumStates] = useState(0)
	const [numInputs, setNumInputs] = useState(0)

	let handleChangeS = (e) => {
		setNumStates(e.target.value)
	}
	let handleChangeI = (e) => {
		setNumInputs(e.target.value)
	}

	let InputTable = (e) => {
		setInputOption(true)
	}

	return (
		<div>
			<h1 className="text-center font-bold">FINITE STATE MACHINE</h1>
			{!inputOption &&
				<div>
					<p className="text-left">Choose one:</p>
					<div>
						<div className="flex flex-row w-256 justify-between	">
							<button onClick={() => setMealyOption(true)} id="mealy">Mealy Machine</button>
							<button onClick={() => setMooreOption(true)} id="moore">Moore Machine</button>
						</div>
					</div>
				</div>}

			{mealyOption &&
				<div>
					<p className="text-center">Mealy Machine</p>
					<input type="number" placeholder={"Number of states"} className="text-center" onChange={handleChangeS} />
					<input type="number" placeholder={"Input alphabet"} className="text-center" onChange={handleChangeI} />
					<button onClick={InputTable}>Next</button>
				</div>}



			{inputOption && <InputPage numStates={numStates} numInputs={numInputs} />}
		</div>
	)
}