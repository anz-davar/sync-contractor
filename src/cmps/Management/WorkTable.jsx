import { useEffect, useState } from "react";
import { WorkTableHeader } from "./WorkTableHeader";
import { columns } from "../../data/workTableHeaders";
import DataTable from "react-data-table-component";
import { WorkItem } from "./WorkItem";

export const WorkTable = ({isManager = false, data, isDone = false}) => {

      const [dataColumns, setDataColumns] = useState();

      useEffect(()=> {
        setDataColumns(setColumnsToShow())
      },[isManager,columns,isDone])

     const setColumnsToShow = () => {
        if(!columns)
            return;
        const columnsToShow = []
        columns.map(column =>{
             switch(column.name){
                 case ('תאריך סיום'):
                     if(isDone) columnsToShow.push(column);
                    case ('ציון קבלן'):
                        if(isManager)
                            columnsToShow.push(column);
                        break;
                        case('שם'):
                        columnsToShow.push({...column, name: isManager ? 'שם קבלן' : 'שם מנהל'})
                        break;
                        case('טלפון'):
                        columnsToShow.push({...column, name: isManager ? 'טלפון קבלן' : 'טלפון מנהל'})
                        break;
                        default:
                            columnsToShow.push( column);
                            break;
                        }
                    })
                    return columnsToShow
                }
    
     const ExpandedComponent = ({data}) => {
                    return <WorkItem data={data}/>;
                };
                
if(!columns)
    return <h1>אין מידע להצגה</h1>

    return <>
        <DataTable className="data-table"
        columns={dataColumns}
        data={data}
        reverse
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        title={`עבודות ${isDone ? "שהסתיימו" : "פעילות"}`}
        />
</> 
}
