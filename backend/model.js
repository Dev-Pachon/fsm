const model = {};

let originalAutomata = {
	MealyStateTable: {
		"A": {
			f: ["B", "C"],
			g: [0, 0]
		},
		"B": {
			f: ["C", "D"],
			g: [1, 1]
		},
		"C": {
			f: ["D", "E"],
			g: [0, 0]
		},
		"D": {
			f: ["C", "B"],
			g: [1, 1]
		},
		"E": {
			f: ["F", "E"],
			g: [1, 1]
		},
		"F": {
			f: ["G", "C"],
			g: [0, 0]
		},
		"G": {
			f: ["F", "G"],
			g: [1, 1]
		},
		"H": {
			f: ["J", "B"],
			g: [1, 0]
		},
		"J": {
			f: ["H", "D"],
			g: [1, 0]
		}
	},
	initialState: 0,
	numStates: 9,
	numInputs: 2
}
let originalAutomata2 = {
MooreStateTable:{
	"A":{
		f:["B","C"],
		h:[0]
	},
	"B":{
		f:["C","D"],
		h:[1]
	},
	"C":{
		f:["D","E"],
		h:[0]
	},
	"D":{
		f:["C","B"],
		h:[1]
	},
	"E":{
		f:["F","E"],
		h:[1]
	},
	"F":{
		f:["G","C"],
		h:[0]
	},
	"G":{
		f:["F","G"],
		h:[1]
	},
	"H":{
		f:["J","B"],
		h:[1]
	},
	"J":{
		f:["H","D"],
		h:[1]
	}},
initialState: 0,
numStates: 9,
numInputs: 2
}

function initialPartitionMealyAutomata() {
	let machine = originalAutomata.MealyStateTable
	let numStates = originalAutomata.numStates
	let numOutputs = originalAutomata.numInputs
	let keys = Object.keys(machine)

	console.log(keys)
	console.log(machine)
	console.log(originalAutomata)

	//Groups of states
	let groups = []

	let flag;
	for (let i = 0; i < numStates; i++) {
		//Delete an element from states array to add it into groups array
		if (i === 0) {
			groups.push({})
			groups[0][keys[0]] = machine[keys[0]]
		} else {
			flag = false
			let j = 0

			for (; j < groups.length && !flag; j++) {

				let tempKeys = Object.keys(groups[j])

				//Validate if a state belongs to a group j according his inputs k
				let validFlag = true

				for (let k = 0; k < numOutputs; k++) {
					if (!(machine[keys[i]].g[k] === groups[j][tempKeys[0]].g[k])) {
						validFlag = false
					}
				}

				if (validFlag) {
					groups[j][keys[i]] = machine[keys[i]]
					flag = true
				}
			}
			if (!flag) {
				groups[j] = {}
				groups[j][keys[i]] = machine[keys[i]]
				flag = true
			}
		}
	}
	console.log(groups)
	return groups;
}

function initialPartitionMooreAutomata() {
	let machine = originalAutomata2.MooreStateTable
	let numStates = originalAutomata2.numStates
	let keys = Object.keys(machine)

	console.log(keys)
	console.log(machine)
	console.log(originalAutomata2)

	//Groups of states
	let groups = []

	let flag;
	for (let i = 0; i < numStates; i++) {
		if (i === 0) {
			groups.push({})
			groups[0][keys[0]] = machine[keys[0]]
		}else {
			flag = false
			let j = 0

			for (; j < groups.length && !flag; j++) {

				let tempKeys = Object.keys(groups[j])

				let validFlag = true

				if (!(machine[keys[i]].h[0] === groups[j][tempKeys[0]].h[0])){
					validFlag = false}

				if (validFlag) {
					groups[j][keys[i]] = machine[keys[i]]
					flag = true
				}
			}
			if (!flag) {
				groups[j] = {}
				groups[j][keys[i]] = machine[keys[i]]
				flag = true
			}
		}
	}
	console.log(groups)
	return groups;
}



//Used to verify if a state is reachable from the initial state
function floydWarshall() {
	let dist = []

	for (let i = 0; i < numStates; i++) {
		let state = []
		dist.push(state)
		for (let j = 0; j < numStates; j++) {
			let empty = false
			if (j == i) {
				empty = true
			}
			state.push(empty)
		}
	}

	for (let k = 0; k < numStates; k++) {
		for (let r = 0; r < numStates[k]; r++) {
			let aux = numStates[k][r]
			dist[k][aux] = true
		}
	}
	for (let s = 0; s < dist.length; s++) {
		for (let t = 0; t < dist.length; t++) {
			for (let a = 0; a < dist.length; a++) {
				if (dist[t][s] && dist[s][a]) {
					dist[t][a] = true
				}
			}
		}
	}

	return dist;
}


model.partition = initialPartitionMealyAutomata;

module.exports = model;

initialPartitionMealyAutomata();
initialPartitionMooreAutomata();

