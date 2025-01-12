import Rating from '@mui/material/Rating';
import { workItemColumns } from '../../data/workItemColumns';
import DataTable from 'react-data-table-component';

export const WorkItem = ({ data }) => {
    const tableData = data.items.map((section) => ({
        ...section,
        totalSectionCost: section.actual_amount * section.unit_cost
    }));
    return (
        <div className="work-content-container">
            <div className="work-num-container">
                             <h2 className="work-item-sub-title">מספר עבודה</h2>
                             <h2 className="work-num-item">{data.work_number}</h2>
                        </div>
            <DataTable
                columns={workItemColumns}
                data={tableData}
                selectableRows
                // pagination
            />
            {data.manager && (
                <div className="work-ranking-container">
                    <h2 className='work-item-sub-title'>הוספת ציון לקבלן</h2>
                    <Rating className='star-rating' name="customized-10"  value={data.contractor_rank || 4} max={10} />
                    {/*<Rating className='star-rating' name="customized-10" defaultValue={5} max={10}/>      */}
                </div>
            )}
        </div>
    );
};


// import Rating from '@mui/material/Rating';
// import DataTable from 'react-data-table-component';
// import { workItemColumns } from '../../data/workItemColumns';
// import { useState } from 'react';
//
// export const WorkItem = ({data}) => {
// const [columns, setColumns] = useState(workItemColumns);
// const isManager = false;
//
// const setTableData = () => {
//     const tableData = [];
//     console.log('data?', data);
//     data.sections.map((section) => {
//        tableData.push({
//         ...section,
//         totalSectionCost: section.actualAmount * section.unitCost })
//
//     })
//     return tableData;
// }
//
// const [dataToShow, setDataToShow] = useState(setTableData());
//
//     return <div className="work-content-container">
//         <div className="work-num-container">
//             <h2 className="work-item-sub-title">מספר עבודה</h2>
//             <h2 className="work-num-item">{data.workNumber}</h2>
//         </div>
//
//         <DataTable className='work-detail-table'
//         columns={columns}
//         data={dataToShow}
//         selectableRows/>
//
//         {/*מנהל בלבד - ציון 1-10 */}
//
// {data.isManager &&
//         <div className="work-ranking-container">
//         <h2 className='work-item-sub-title'>הוספת ציון לקבלן</h2>
//         <Rating className='star-rating' name="customized-10" defaultValue={5} max={10}/>
//         </div>}
//     </div>
// }
