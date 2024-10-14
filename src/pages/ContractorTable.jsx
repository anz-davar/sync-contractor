export const ContractorTable = () => {

    return <main className="main-container contractor-main-container">
        <h2>פרטים אישיים</h2>
        <div className="headers-container">
        <h4 className="header-style">שם</h4>
        <h4 className="header-style">ת"ז</h4>
        <h4 className="header-style">טלפון</h4>
        <h4 className="header-style">מייל</h4>
        <h4 className="header-style">מ"ס עבודות פתוחות</h4>

        </div>
        <h2 >עבודות פעילות</h2>
        <div className="headers-container">
            {/*על ידי לחיצה על מספר עבודה נפתח החלון של העבודה */}
        <h4 className="header-style">מספר עבודה</h4>
        <h4 className="header-style">סיווג</h4>
        <h4 className="header-style">תאריך התחלה</h4>
        <h4 className="header-style">תאריך יעד לסיום</h4>
        <h4 className="header-style">סטטוס</h4>
        <h4 className="header-style">שם מנהל</h4>
        <h4 className="header-style">טלפון מנהל</h4>
        <h4 className="header-style">מ"ס מתקן</h4>
        <h4 className="header-style">מיקום</h4>
        </div>
  

        <h2 >עבודות שהסתיימו</h2>
        <div className="headers-container">
            {/*על ידי לחיצה על מספר עבודה נפתח החלון של העבודה */}
        <h4 className="header-style">מספר עבודה</h4>
        <h4 className="header-style">סיווג</h4>
        <h4 className="header-style">תאריך התחלה</h4>
        <h4 className="header-style">תאריך יעד לסיום</h4>
        <h4 className="header-style">תאריך סיום בפועל</h4>
        <h4 className="header-style">סטטוס</h4>
        <h4 className="header-style">שם מנהל</h4>
        <h4 className="header-style">טלפון מנהל</h4>
        <h4 className="header-style">מ"ס מתקן</h4>
        <h4 className="header-style">מיקום</h4>
        </div>
         </main>
}