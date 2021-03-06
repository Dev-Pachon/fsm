const model = {}

let originalAutomata = {}
let originalAutomata2 = {}

function initialice(){
	originalAutomata =  {
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
	inputAlphabet: "0,1"
}
	originalAutomata2 = {
	MooreStateTable: {
		"A": {
			f: ["B", "C"],
			h: [0]
		},
		"B": {
			f: ["C", "D"],
			h: [1]
		},
		"C": {
			f: ["D", "E"],
			h: [0]
		},
		"D": {
			f: ["C", "B"],
			h: [1]
		},
		"E": {
			f: ["F", "E"],
			h: [1]
		},
		"F": {
			f: ["G", "C"],
			h: [0]
		},
		"G": {
			f: ["F", "G"],
			h: [1]
		},
		"H": {
			f: ["J", "B"],
			h: [1]
		},
		"J": {
			f: ["H", "D"],
			h: [1]
		}
	},
	initialState: 0,
	inputAlphabet: "0,1",
	numStates: 9
}
}
/**
 * This method compares two partitions
 * @param {array} actualPartition the actual partition
 * @param {array} prevPartition the previous partition
 */

function comparePartitions(actualPartition, prevPartition) {
	let bool = false
	if (actualPartition.length === prevPartition.length) {
		bool = true
	}
	return bool
}

/**
 * This method returns the block of the state
 * @param {array} partition 
 * @param {array} state
 */
function getBlock(partition, state) {
	let block
	let flag = true
	for (let i = 0; i < partition.length && flag; i++) {
		for (let j = 0; j < partition[i].length && flag; j++) {
			if (partition[i][j] === state) {
				block = i
				flag = false
			}
		}
	}
	return block;
}

/**
 * This method verify if two states are in the same block
 * @param {array} partition
 * @param {array} state1
 * @param {array} state2
 */
function checkBlock(partition, state1, state2) {
	let checked = false
	if (getBlock(partition, state1) === getBlock(partition, state2)) {
		checked = true
	}
	return checked;
}


/**
 * Mealy machine methods
 */
function initialPartitionMealyAutomata(mealyMachine) {
	let machine = mealyMachine.StateTable
	let numStates = mealyMachine.numStates
	let numOutputs = mealyMachine.numInputs
	let keys = Object.keys(machine)

	//Groups of states
	let groups = []

	let flag;
	for (let i = 0; i < numStates; i++) {
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

	return partitionBase(groups, originalAutomata.MealyStateTable)
}


/**
 * Moore machine methods
 */
function initialPartitionMooreAutomata(mooreMachine) {
	let machine = mooreMachine.StateTable
	let numStates = mooreMachine.numStates
	let keys = Object.keys(machine)

	//Groups of states
	let groups = []

	let flag;
	for (let i = 0; i < numStates; i++) {
		if (i === 0) {
			groups.push({})
			groups[0][keys[0]] = machine[keys[0]]
		} else {
			flag = false
			let j = 0

			for (; j < groups.length && !flag; j++) {

				let tempKeys = Object.keys(groups[j])

				let validFlag = true

				if (!(machine[keys[i]].h[0] === groups[j][tempKeys[0]].h[0])) {
					validFlag = false
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


	return partitionBase(groups, originalAutomata2.MooreStateTable)
}

/**
 *Used to verify if a state is reachable from the initial state
 */
function floydWarshall(States) {
	let dist = []

	for (let i = 0; i < States.length; i++) {
		let state = []
		dist.push(state)
		for (let j = 0; j < States[i].length; j++) {
			let empty = false
			if (j === i) {
				empty = true
			}
			state.push(empty)
		}
	}

	for (let k = 0; k < States.length; k++) {
		for (let r = 0; r < States[k].length; r++) {
			let aux = States[k][r]
			if (aux !== 0) {
				dist[k][r] = true
			}
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

function transformToMatrix(Machine) {

	let machineKeys = Object.keys(Machine)

	let dictMatrix = {}

	let matrix = new Array(machineKeys.length);

	//Crate an array of nxn with n equals to the num os states
	for (let i = 0; i < machineKeys.length; i++) {
		matrix[i] = new Array(machineKeys.length).fill(0);
		dictMatrix[machineKeys[i]] = i
		dictMatrix[i] = machineKeys[i]
	}

	for (let i = 0; i < machineKeys.length; i++) {
		for (let j = 0; j < Machine[machineKeys[i]].f.length; j++) {

			let fArrayElement = Machine[machineKeys[i]].f[j]

			let index = dictMatrix[fArrayElement]

			matrix[i][index] = 1
		}
	}

	return { matrix: matrix, dictMatrix: dictMatrix }
}

function eliminateInaccessibleStates(machine, numStates) {
	let obj = transformToMatrix(machine)

	let dist = floydWarshall(obj.matrix)

	let deletedStates = 0
	for (let i = 0; i < dist[0].length; i++) {
		if (dist[0][i] === false) {
			delete machine[obj.dictMatrix[i]]
			deletedStates++
		}
	}
	let newMachine = {}

	newMachine["StateTable"] = machine
	newMachine["numStates"] = numStates - deletedStates

	return newMachine
}

function partitionBase(firstPartition, stateTable) {
	let partition = []

	for (let i = 0; i < firstPartition.length; i++) {
		partition.push(Object.keys(firstPartition[i]))
	}

	return partitionRecursive(stateTable, [], partition)
}
/**
 * This method makes the rest of the partitions
 */
function partitionRecursive(stateTable, actualPartition = [], prevPartition, isInitial = true) {

	let partitions = []

	for (let i = 0; i < prevPartition.length; i++) {

		let belongPartition = []
		let notBelongPartition = []
		const fElement = stateTable[prevPartition[i][0]].f
		belongPartition.push(prevPartition[i][0])

		for (let j = 1; j < prevPartition[i].length; j++) {
			const fElement2 = stateTable[prevPartition[i][j]].f
			let isSameBlock = true

			for (let k = 0; k < fElement.length && isSameBlock; k++) {
				isSameBlock = checkBlock(prevPartition, fElement[k], fElement2[k])
			}

			if (isSameBlock) {
				belongPartition.push(prevPartition[i][j])
			} else {
				notBelongPartition.push(prevPartition[i][j])
			}
		}

		partitions.push(belongPartition)
		if (notBelongPartition.length !== 0) {
			partitions.push(notBelongPartition)
		}

	}
	console.table(partitions)

	if (!isInitial && comparePartitions(partitions, prevPartition)) {
		return actualPartition
	}

	return partitionRecursive(stateTable, partitions, partitions, false)
}

function reduceMealy() {
	let newAutomata = eliminateInaccessibleStates(originalAutomata.MealyStateTable, originalAutomata.numStates)
	newAutomata["numInputs"] = originalAutomata.inputAlphabet.length
	return initialPartitionMealyAutomata(newAutomata)
}

function showMealy(){
	let finalPart = reduceMealy()
	console.log(finalPart)

	let finalMachine = {
		stateTable:{},
		inputAlphabet:originalAutomata.inputAlphabet,
		numStates:finalPart.length
	}

	for (let i = 0; i < finalPart.length; i++) {
		finalMachine.stateTable["{"+finalPart[i]+"}"] = {
			f:originalAutomata.MealyStateTable[finalPart[i][0]].f,
			g:originalAutomata.MealyStateTable[finalPart[i][0]].g
		}
	}

	let keys = Object.keys(finalMachine.stateTable)

	for (let i = 0; i < keys.length; i++) {
		console.log(finalMachine.stateTable[keys[i]].f)
	}
	console.table(finalMachine.stateTable)

	return finalMachine
}
function showMoore(){

	let finalPart = reduceMoore()

	let finalMachine = {
		stateTable:{},
		inputAlphabet:originalAutomata2.inputAlphabet,
		numStates:finalPart.length
	}

	for (let i = 0; i < finalPart.length; i++) {
		finalMachine.stateTable["{"+finalPart[i]+"}"] = {
			f:originalAutomata2.MooreStateTable[finalPart[i][0]].f,
			h:originalAutomata2.MooreStateTable[finalPart[i][0]].h
		}
	}

	return finalMachine
}

function reduceMoore() {
	let newAutomata = eliminateInaccessibleStates(originalAutomata2.MooreStateTable, originalAutomata2.numStates)
	return initialPartitionMooreAutomata(newAutomata)
}

function fetchDataMealy(data) {
	originalAutomata = data
}

function fetchDataMoore(data) {
	originalAutomata2 = data
}

model.showMealy = showMealy
model.showMoore = showMoore
model.fetchDataMealy = fetchDataMealy
model.fetchDataMoore = fetchDataMoore

module.exports = model
