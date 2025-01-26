import { useEffect, useState } from "react";
import { columns } from "../../data/workTableHeaders";
import DataTable from "react-data-table-component";
import { WorkItem } from "./WorkItem";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {format} from "date-fns";

export const WorkTable = ({ isManager = false, data, isDone = false ,onEdit, onDelete }) => {
    const [dataColumns, setDataColumns] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const columnsToShow = setColumnsToShowFn(columns, isManager, isDone);
        setDataColumns(columnsToShow);
    }, [isManager, columns, isDone]);


    const formatDate = (dateString) => {
        if (dateString) {
            try {
                return format(new Date(dateString), 'dd/MM/yyyy');
            } catch (error) {
                console.error("Invalid date:", dateString, error);
                return "Invalid Date";
            }
        }
        return '';
    };

    useEffect(() => {
        if (data) {
            const formattedData = data.map(item => ({
                ...item,
                start_date: formatDate(item.start_date),
                due_end_date: formatDate(item.due_end_date),
                end_date: formatDate(item.end_date),
            }));
            setTableData(formattedData);
        }

    }, [data]);
    const setColumnsToShowFn = (columns, isManager, isDone) => {
        return columns.filter((column) => {
            if (column.name === 'תאריך סיום' && !isDone) return false;
            // if (column.name === 'ציון קבלן' && !isManager) return false;
            return true;
        }).map((column) => {
            // switch (column.name) {
            //     case 'שם':
            //         return { ...column, name: isManager ? 'שם קבלן' : 'שם מנהל' };
            //     case 'טלפון':
            //         return { ...column, name: isManager ? 'טלפון קבלן' : 'טלפון מנהל' };
            //     default:
            //         return column;
            // }
            return column;
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
            // allowOverflow: false,
            // button: true,
        },
    ];

    const ExpandedComponent = ({ data }) => {
        return <WorkItem data={data} />;
    };



    if (!data || data.length === 0) return <p>אין מידע להצגה</p>;
    console.log(data);
    console.log('data');
    return (
        <DataTable className="data-table"
            columns={[...dataColumns, ...actions]}
            // columns={dataColumns}
            // data={data}
            data={tableData}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            title={`עבודות ${isDone ? "שהסתיימו" : "פעילות"}`}
        />
    );
};
