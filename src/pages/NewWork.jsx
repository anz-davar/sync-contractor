import { useState } from "react"
import { WorkRow } from "../cmps/NewWork/WorkRow";

export const NewWork = () => {
    const [sectionsCount, setSectionsCount] = useState(0);
    return <form className="new-main-container"> 
        <h2 className="new-main-title">הוסף עבודה חדשה</h2>

        <div className="new-cul-container">
            <label className="new-sub-header">בחירת קבלן לביצוע</label>
            <select className="new-sub-select">
                <option value="one">קובי ממן</option>
                <option value="two">יזהר כהן</option>
                <option value="three">אבי נמני</option>
            </select>
        </div>

            <div className="new-row-container">
                <WorkRow />
            </div>

        <div className="new-row-container">
            <div className="new-cul-container">
                <h4 className="new-sub-header">סה"כ עלות לעבודה</h4>
                <h4 >300</h4>
            </div>
            <div className="new-cul-container"> 
                <h4 className="new-sub-header">אישור עבודה מנהל</h4>
                <h4 >בהמתנה</h4>
            </div>
            <div className="new-cul-container">
                <h4 className="new-sub-header">אישור עבודה קבלן</h4>
                <h4 >בהמתנה לאישור הקבלן</h4>
            </div>
        </div>

        </form>
}