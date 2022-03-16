export default function Contests({tableData}) {

    let stateTableKeys = Object.keys(tableData.stateTable)
    let inputAlphabet = tableData.inputAlphabet.split(",")

	return (
				<div className="flex">
                <table>
                <tr>
                    <th></th>
                    {inputAlphabet.map((input)=>(
                            <th>f({input})</th>
                    ))}
                    <th>h</th>
                    
                </tr>
                

                {Array.from(Array(stateTableKeys.length).keys()).map((i) =>(
                    <tr>
                        <td>{stateTableKeys[i]}</td>
                        {Array.from(Array(tableData.stateTable[stateTableKeys[i]].f.length).keys()).map((j)=>(
                                <td className="w-full border">{tableData.stateTable[stateTableKeys[i]].f[j]}</td>
                        ))}
                        <td>{tableData.stateTable[stateTableKeys[i]].h[0]}</td>
                    </tr>
                ))}

            </table>
				</div>
	)
}

export async function getServerSideProps(ctx) {

	const response = await fetch('http://localhost:8080/getMooreResult')
	const tableData = await response.json()

	console.log(tableData)

	return {
		props: {tableData},
	}
}