import { useEffect, useState } from "react"
import { PersonalDetails } from "../cmps/Management/PersonalDetails";
import { WorkTable } from "../cmps/Management/WorkTable";
import { getTableData } from "../services/dataService";
import users from "../data/user.json"
import { NewWorkModal } from "../cmps/NewWork/NewWorkModal";

export const ManagementPage = () => {

  const [user, setUser] = useState(users[0])
  const [activeTableData, setActiveTableData] = useState(getTableData(user, false))
  const [finishedTableData, setfinishedTableData] = useState(getTableData(user, true))

  const [isOpen, setIsOpen] = useState(false);

  return <main className="main-container contractor-main-container">
    <PersonalDetails user={user} />
    <button className="add-work-btn" onClick={() => setIsOpen(true)} >הוסף משימה לעבודה פעילה +</button>
    {/* TODO: Add filter, choose from drop down and will show relevant search options */}
    <WorkTable isManager={user.isManager}
      data={activeTableData}
      isDone={false} />

    <WorkTable isManager={user.isManager}
      data={finishedTableData}
      isDone={true} />


    <NewWorkModal isOpen={isOpen}
      closeModal={() => setIsOpen(false)} />



  </main>
}