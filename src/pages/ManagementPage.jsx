import {  useEffect, useState } from "react"
import { PersonalDetails } from "../cmps/Management/PersonalDetails";
import { WorkTable } from "../cmps/Management/WorkTable";
import { getTableData } from "../services/dataService";
import users from "../data/user.json"
import { NewWork } from "./NewWork";

export const ManagementPage = () => {

    const [isManager, setIsManager] = useState(false);
    const[user, setUser] = useState(users[0])
    const [activeTableData, setActiveTableData] = useState(getTableData(user, false))
    const [finishedTableData, setfinishedTableData] = useState(getTableData(user, true))
    
    const[isPopupVisible, setIsPopupVisible] = useState(false)
    const onAddBtnClicked = () => {
      setIsPopupVisible(!isPopupVisible)
    }

  return <main className="main-container contractor-main-container">
        <div>
          <PersonalDetails user={user}/>
          <div className="add-work-container">
            <button className="add-work-btn" onClick={() => onAddBtnClicked()} >הוסף משימה לעבודה פעילה +</button>
          </div>
        </div>
        <WorkTable isManager={user.isManager} data={activeTableData} isDone={false} />
        <WorkTable isManager={user.isManager} data={finishedTableData} isDone={true} />
     
{ isPopupVisible && 

        <div className="add-work-popup">
                <NewWork />
                <div>
                  <button onClick={onAddBtnClicked()}>שמור</button>
                  <button onClick={onAddBtnClicked()}>בטל</button>
                </div>
        </div>
        
}     
</main>
}