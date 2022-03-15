import Head from 'next/head'
import {useRouter} from 'next/router'
import {useState, forwardRef} from 'react';
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


export default function Contests({tableData, contestName, contestId}) {
	const tableIcons = {
		DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
		FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
		NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
		PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
		SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
		ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
		ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
	}

	const columns = [
		{
			title: "Id ",
			field: "id_team",
		},
		{
			title: "Name",
			field: "name",
			align: "center",
		},
		{
			title: "Members of the team",
			field: "members"
		},
		{
			title: "Total score",
			field: "score",
		},
	]

	const router = useRouter()

	return (
		<div className="">
			<MaterialTable columns={columns}
						   data={tableData}
						   icons={tableIcons}
						   title="Reduced automata"
						   options={{
							   draggable: false,
							   exportButton: false,
						   }}
			/>
		</div>

	)
}

export async function getServerSideProps(ctx) {

	const response = await fetch('http://localhost:8080/')
	const tableData = await response.json()

	console.log(tableData)

	return {
		props: {tableData},
	}
}