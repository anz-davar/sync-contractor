import { useEffect, useState } from "react";
import { columns } from "../../data/workTableHeaders";
import DataTable from "react-data-table-component";
import { WorkItem } from "./WorkItem";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {format} from "date-fns";
import EditIcon from '@mui/icons-material/Edit';

export const WorkTable = ({ isManager = false, data, isDone = false ,onEdit, onDelete, user }) => {
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
    // const setColumnsToShowFn = (columns, isManager, isDone) => {
    //     return columns.filter((column) => {
    //         if (column.name === 'תאריך סיום' && !isDone) return false;
    //         // if (column.name === 'ציון קבלן' && !isManager) return false;
    //         return true;
    //     }).map((column) => {
    //         // switch (column.name) {
    //         //     case 'שם':
    //         //         return { ...column, name: isManager ? 'שם קבלן' : 'שם מנהל' };
    //         //     case 'טלפון':
    //         //         return { ...column, name: isManager ? 'טלפון קבלן' : 'טלפון מנהל' };
    //         //     default:
    //         //         return column;
    //         // }
    //         return column;
    //     });
    // };

    const setColumnsToShowFn = (columns, isManager, isDone) => {
        return columns.filter((column) => {
            console.log(column)
            if (column.selector === 'end_date' && !isDone) return false;
            if (user && ['CONTRACTOR', 'CONTRACTOR_VIEWER'].includes(user.role) && column.name === 'ציון קבלן') return false;
            return true;
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


    // const renderActionButtons = (row) => {
    //     if (user && ["CONTRACTOR_VIEWER"].includes(user.role)) {
    //         return null; // No buttons for CONTRACTOR_VIEWER
    //     } else if (user && ["CONTRACTOR", "PAYMENT_ADMIN"].includes(user.role)) {
    //         return (
    //             <Button  variant="contained"   size="small" onClick={() => handleEditClick(row)}>ערוך</Button>
    //         );
    //     } else {
    //         return (
    //             <>
    //                 <Button  variant="contained"  size="small"  onClick={() => handleEditClick(row)}>ערוך</Button>
    //                 <IconButton aria-label="delete" onClick={() => handleDeleteClick(row)}>
    //                     <DeleteIcon />
    //                 </IconButton>
    //             </>
    //         ); // Both edit and delete for other roles
    //     }
    // };

    const renderActionButtons = (row) => {
        if (!user) return null;

        const showEdit = !["CONTRACTOR_VIEWER"].includes(user.role);
        const showDelete = !["CONTRACTOR", "PAYMENT_ADMIN", "CONTRACTOR_VIEWER"].includes(user.role);
        if (!showEdit && !showDelete) {
            return null; // If neither edit nor delete should be shown, return null
        }
        return (
            <Stack direction="row" spacing={1}> {/* Use Stack for horizontal layout */}
                {showEdit && (
                    <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon />
                    </IconButton>
                )}
                {showDelete && (
                    <IconButton onClick={() => handleDeleteClick(row)}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </Stack>
        );
    };
    // const actions = [
    //     {
    //         cell: (row) => (
    //             <>
    //                 <Button onClick={() => handleEditClick(row)}>לערון</Button>
    //                 <IconButton onClick={() => handleDeleteClick(row)}>
    //                     <DeleteIcon />
    //                 </IconButton>
    //             </>
    //         ),
    //     },
    // ];

    // const actions = [
    //     {
    //         name: 'פעולות',
    //         cell: (row) => renderActionButtons(row),
    //         width: '100px',
    //         center: true,
    //     },
    // ];

    const actions = user && !["CONTRACTOR_VIEWER"].includes(user.role) ? [ // Conditionally define actions
        {
            name: 'פעולות',
            cell: (row) => renderActionButtons(row),
            width: '100px', // Adjust as needed
            center: true,
        },
    ] : [];
    const ExpandedComponent = ({ data }) => {
        return <WorkItem data={data} />;
    };



    if (!data || data.length === 0)
        // return <p>אין מידע להצגה</p>;
        return <p> </p>;
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
