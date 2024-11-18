import { useState } from "react"
import { WorkRowList } from "./WorkRowList";
import { generateSimpleId } from "../../services/utils";

export const NewWorkModal = ({ isOpen, closeModal }) => {



    //#region New Work
    const addNewWork = () => {
        return {
            id: generateSimpleId(),
            workType: '',
            amount: 1,
            unitMeasure: 'מטר',
            eachCost: 0
        }
    }
    const [sections, setSections] = useState([addNewWork()]);

    const removeSection = (id) => {
        if (sections.length <= 1) return;
        setSections(sections.filter(s => s.id !== id))
    }

    const updateSecction = (secction) => {

    }

    //#endregion
    //#region Modal control methods 
    const onCancelBtnClicked = () => {

        closeModal();
    }
    const onSaveBtnClicked = () => {

        closeModal();
    }
    //#endregion

    //#region DOM
    if (!isOpen) return <></>
    return <>
        <div className="modal-overlay"></div>

        <form className="new-main-container">
            <h2 className="new-main-title">הוסף משימה לעבודה פעילה</h2>

            <div className="new-row-container">
                <label htmlFor="work-num" className="new-sub-header">מספר עבודה</label>
                <input type="text" id="new-cost" />
            </div>

            <div className="new-row-container">
                <label className="new-sub-header">בחירת קבלן לביצוע</label>
                <select className="new-sub-select">
                    <option value="one">קובי ממן</option>
                    <option value="two">יזהר כהן</option>
                    <option value="three">אבי נמני</option>
                </select>
            </div>

            <WorkRowList addSection={() => setSections([...sections, addNewWork()])}
                removeRow={(sectionId) => removeSection(sectionId)}
                workRows={sections} />

            <div className="new-cul-container">
                <label className="new-sub-header" htmlFor="new-notes-textarea">הערות</label>
                <textarea id="new-notes-textarea"></textarea>
            </div>

            <div className="new-row-container details-row">
                <div className="new-cul-container details-container">
                    <h4 className="new-sub-header">סה"כ עלות לעבודה</h4>
                    <h4 >300 ₪</h4>
                </div>
                <div className="new-cul-container details-container">
                    <h4 className="new-sub-header">אישור עבודה מנהל</h4>
                    <div className="new-row-container">
                        <h4 className="new-mini-sub-header">סטטוס:</h4>
                        <h4 > בהמתנה</h4>
                    </div>
                </div>
                <div className="new-cul-container details-container">
                    <h4 className="new-sub-header">אישור עבודה קבלן</h4>
                    <div className="new-row-container">
                        <h4 className="new-mini-sub-header">סטטוס:</h4>
                        <h4 >בהמתנה לאישור הקבלן</h4>
                    </div>
                </div>
            </div>


            <div className="new-row-container btn-container">
                <button className="save-btn" onClick={() => onSaveBtnClicked()}>שמור</button>
                <button className="cancel-btn" onClick={() => onCancelBtnClicked()}>בטל</button>
            </div>
        </form>
    </>
    //#endregion

}