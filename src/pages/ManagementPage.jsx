import {  useEffect, useState } from "react"
import { PersonalDetails } from "../cmps/Management/PersonalDetails";
import { WorkTable } from "../cmps/Management/WorkTable";
import { getTableData } from "../services/dataService";
import users from "../data/user.json"

export const ManagementPage = () => {

    const [isManager, setIsManager] = useState(false);
    const[user, setUser] = useState(users[0])
    const [activeTableData, setActiveTableData] = useState(getTableData(user, false))
    const [finishedTableData, setfinishedTableData] = useState(getTableData(user, true))


  return <main className="main-container contractor-main-container">

        <PersonalDetails user={user}/>
        <WorkTable isManager={user.isManager} data={activeTableData} isDone={false} />
        <WorkTable isManager={user.isManager} data={finishedTableData} isDone={true} />
     
     </main>
}