import { useState } from "react"
import { CostsChart } from "../cmps/Dashboard/CostsChart"
import { FacilityFaultsChart } from "../cmps/Dashboard/FacilityFaultsChart"
import { TimeStatusChart } from "../cmps/Dashboard/TimeStatusChart"
import { WorkStatusChart } from "../cmps/Dashboard/WorkStatusChart"
import { ToggleButton } from "@mui/material"

export const Dashboard = () => {
    const [chart, setChart] = useState('costs');

    const getChartTitle = () => {
        switch (chart) {
            case 'costs':
                return 'ניהול עלויות';
            case 'faults':
                return 'סטטוס תקלות לפי מתקן';
            case 'time':
                return 'לוחות זמנים';
            case 'work':
                return 'סטטוס עבודות';
        }
    }
    return <>

        <div className="dashboard-main-container">
            <div className="dashboard-select-container">
                <label htmlFor="chart-select">בחר גרף</label>
                <select id="chart-select"
                    onChange={(e) => setChart(e.target.value)}>
                    <option value='costs'>ניהול עלויות</option>
                    <option value='faults'>סטטוס תקלות לפי מתקן</option>
                    <option value='time'>לוחות זמנים</option>
                    <option value='work'>סטטוס עבודות</option>
                </select>
            </div>

            <div className="dashboard-filter-container">
                <div className="col-input">
                    <label>תאיך התחלה</label>
                    <input type="Date" />
                </div>
                <div className="col-input">
                    <label>תאריך סיום</label>
                    <input type="Date" />
                </div>
                <div className="col-input">
                    <label>שם קבלן</label>
                    <input type="Text" />
                </div>

            </div>
        </div>

        <div className="dashboard-graph-container">
            <h2>{getChartTitle()}</h2>
            {chart === 'costs' && <CostsChart />}
            {chart === 'faults' && <FacilityFaultsChart />}
            {chart === 'time' && <TimeStatusChart />}
            {chart === 'work' && <WorkStatusChart />}
        </div>
    </>
}