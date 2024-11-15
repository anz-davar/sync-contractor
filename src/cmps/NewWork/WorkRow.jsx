import { NewWork } from "../../pages/NewWork"

export const WorkRow = ({count = 1}) => {


    return <div className="new-row-container">
        <div className="new-row-container">
            <label htmlFor="new-content" className="new-sub-header">בחירת מהות עבודה</label>
            <select id="new-content" className="new-sub-select">
                <option value="one">החלפת צנרת במשאבת בורג</option>
                <option value="two">פתיחת סתימה במשאבות</option>
                <option value="three">בניית פסל לגרגלך הראשי</option>
            </select>
        </div>
        <div className="new-row-container">
            <label htmlFor="new-amount" className="new-sub-header">כמות</label>
            <input type="number" id="new-amount"/>
            <select className="new-count-select">
                <option value="one">יחידה</option>
                <option value="two">מטר</option>
            </select>
        </div>
        <div className="new-row-container">
            <label htmlFor="new-cost" className="new-sub-header">עלות למטר/יחידה בש"ח</label>
            <input min={0} type="number" id="new-cost"/>
        </div>
      
       
    </div>
}