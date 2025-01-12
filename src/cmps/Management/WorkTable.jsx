import { useEffect, useState } from "react";
import { columns } from "../../data/workTableHeaders";
import DataTable from "react-data-table-component";
import { WorkItem } from "./WorkItem";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const WorkTable = ({ isManager = false, data, isDone = false ,onEdit, onDelete }) => {
    const [dataColumns, setDataColumns] = useState([]);

    useEffect(() => {
        const columnsToShow = setColumnsToShowFn(columns, isManager, isDone);
        setDataColumns(columnsToShow);
    }, [isManager, columns, isDone]);

    const setColumnsToShowFn = (columns, isManager, isDone) => {
        return columns.filter((column) => {
            // if (column.name === 'תאריך סיום' && !isDone) return false;
            // if (column.name === 'ציון קבלן' && !isManager) return false;
            return true;
        }).map((column) => {
            switch (column.name) {
                case 'שם':
                    return { ...column, name: isManager ? 'שם קבלן' : 'שם מנהל' };
                case 'טלפון':
                    return { ...column, name: isManager ? 'טלפון קבלן' : 'טלפון מנהל' };
                default:
                    return column;
            }
        });
    };

    const handleEditClick = (row) => {
        if (onEdit) {
            onEdit(row);
        }
    }

    const handleDeleteClick = (row) => {
        if (onDelete) {
            onDelete(row);
        }
    }


    // const actions = [
    //     {
    //         cell: (row) => <Button onClick={() => handleEditClick(row)}>Edit</Button>,
    //         allowOverflow: false,
    //         button: true,
    //     },
    // ];
    const actions = [
        {
            cell: (row) => (
                <>
                    <Button onClick={() => handleEditClick(row)}>Edit</Button>
                    <IconButton onClick={() => handleDeleteClick(row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
            allowOverflow: false,
            button: true,
        },
    ];

    const ExpandedComponent = ({ data }) => {
        return <WorkItem data={data} />;
    };



    if (!data || data.length === 0) return <p>אין מידע להצגה</p>;

    return (
        <DataTable className="data-table"
            columns={[...dataColumns, ...actions]}
            // columns={dataColumns}
            data={data}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            title={`עבודות ${isDone ? "שהסתיימו" : "פעילות"}`}
        />
    );
};


// import {useEffect, useState} from "react";
// import {columns} from "../../data/workTableHeaders";
// import DataTable from "react-data-table-component";
// import {WorkItem} from "./WorkItem";
//
// export const WorkTable = ({isManager = false, data, isDone = false}) => {
//     console.log(data);
//     const [dataColumns, setDataColumns] = useState();
//
//     useEffect(() => {
//         setDataColumns(setColumnsToShow())
//     }, [isManager, columns, isDone])
//     console.log(dataColumns);
//     const setColumnsToShow = () => {
//         if (!columns) return;
//         const columnsToShow = []
//         columns.map(column => {
//             switch (column.name) {
//                 case ('תאריך סיום'):
//                     if (isDone) columnsToShow.push(column);
//                 case ('ציון קבלן'):
//                     if (isManager) columnsToShow.push(column);
//                     break;
//                 case('שם'):
//                     columnsToShow.push({...column, name: isManager ? 'שם קבלן' : 'שם מנהל'})
//                     break;
//                 case('טלפון'):
//                     columnsToShow.push({...column, name: isManager ? 'טלפון קבלן' : 'טלפון מנהל'})
//                     break;
//                 default:
//                     columnsToShow.push(column);
//                     break;
//             }
//         })
//         return columnsToShow
//     }
//
//     const ExpandedComponent = ({data}) => {
//         return <WorkItem data={data}/>;
//     };
//
//     if (!columns) return <h1>אין מידע להצגה</h1>
//
//     return <>
//         <DataTable className="data-table"
//                    columns={dataColumns}
//                    data={data}
//                    reverse
//                    // expandableRows
//                    // expandableRowsComponent={ExpandedComponent}
//                    title={`עבודות ${isDone ? "שהסתיימו" : "פעילות"}`}
//         />
//     </>
// }
