import { useState } from "react"
import { getActiveWorkCount } from "../../services/dataService";

export const PersonalDetails = ({user}) => {
const [activeWorkCount, setActiveWorkCount] = useState(getActiveWorkCount(user));

    return <div className="info-headers-container">
        <div className="info-header-set">
        <h4 className="info-header-style">:שם</h4>
        <h4 className="info-item-style">{user.name}</h4>
        </div>

        <div className="info-header-set">
        <h4 className="info-header-style">:ת"ז</h4>
        <h4 className="info-item-style">{user.idNum}</h4>
        </div>

        <div className="info-header-set">
        <h4 className="info-header-style">:טלפון</h4>
        <h4 className="info-item-style">{user.phoneNum}</h4>
        </div>

        <div className="info-header-set">
        <h4 className="info-header-style">:מייל</h4>
        <h4 className="info-item-style">{user.email}</h4>
        </div>

        <div className="info-header-set">
        <h4 className="info-header-style">:מ"ס עבודות פתוחות</h4>
        <h4 className="info-item-style">{activeWorkCount}</h4>

        </div>
    </div>
}