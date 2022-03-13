import MooreInputTable from "./mooreInputTable";
import MealyInputTable from "./mealyInputTable";
import {useState} from "react";


export default function HomePage() {

	const [inputOption, setInputOption] = useState(false)
	const [mooreOption, setMooreOption] = useState(false)
	const [mealyOption, setMealyOption] = useState(false)
	const [numStates, setNumStates] = useState(0)
	const [inputAlphabet, setInputAlphabet] = useState("")

	let handleChangeS = (e) => {
		setNumStates(e.target.value)
	}
	let handleChangeI = (e) => {
		setInputAlphabet(e.target.value)
	}
	let handleMealyButton = () => {
		setMooreOption(false)
		setMealyOption(true)
	}
	let handleMooreButton = () => {
		setMooreOption(true)
		setMealyOption(false)
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
							<button onClick={handleMealyButton} id="mealy">Mealy Machine</button>
							<button onClick={handleMooreButton} id="moore">Moore Machine</button>
						</div>
					</div>
				</div>}

			{(mealyOption || mooreOption) && !inputOption &&
				<div className="flex flex-col h-72 w-100 justify-between">
					<p className="text-center">
						{mealyOption && "Mealy Machine"}
						{mooreOption && "Moore Machine"}
					</p>
					<div className="flex justify-between">
						<label className="basis-2/4" htmlFor="numStates">Number of states:</label>
						<input name="numStates" type="number" placeholder={"Number of states"} className="text-center basis-3/4"
						       onChange={handleChangeS}/>
					</div>
					<div className="flex justify-between">
						<label className="basis-2/4" htmlFor="iAlphabet">Input alphabet:</label>
						<input type="text" name="iAlphabet" placeholder={"Comma separated values"} className="text-center basis-3/4" onChange={handleChangeI}/>
					</div>

					<button onClick={InputTable}>Next</button>
				</div>}


			{inputOption && mooreOption &&
				<MooreInputTable numStates={numStates} inputAlphabet={inputAlphabet}/>}
			{inputOption && mealyOption &&
				<MealyInputTable numStates={numStates} inputAlphabet={inputAlphabet}/>}
		</div>
	)
}