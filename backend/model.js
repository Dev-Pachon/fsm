const model = {};

let originalAutomata = {
	MealyStateTable:{
		"A":{
			f:["B","C"],
			g:[0,0]
		},
		"B":{
			f:["C","D"],
			g:[1,1]
		},
		"C":{
			f:["D","E"],
			g:[0,0]
		},
		"D":{
			f:["C","B"],
			g:[1,1]
		},
		"E":{
			f:["F","E"],
			g:[1,1]
		},
		"F":{
			f:["G","C"],
			g:[0,0]
		},
		"G":{
			f:["F","G"],
			g:[1,1]
		},
		"H":{
			f:["J","B"],
			g:[1,0]
		},
		"J":{
			f:["H","D"],
			g:[1,0]
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
		}else {
			flag = false
			let j = 0

			for (; j < groups.length && !flag; j++) {

				let tempKeys = Object.keys(groups[j])

				//Validate if a state belongs to a group j according his inputs k
				let validFlag = true

				for (let k = 0; k < numOutputs; k++) {
					if (!(machine[keys[i]].g[k] === groups[j][tempKeys[0]].g[k])){
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


model.partition = initialPartitionMealyAutomata;

module.exports = model;