export const workItemColumns = [{
    selector: row => row.section,
    name: 'סעיף',
}, {
    selector: row => row.description,
    name: 'תיאור',
}, {
    selector: row => row.contractAmount,
    name: 'כמות בחוזה',
}, {
    selector: row => row.actualAmount,
    name: 'כמות בפועל',

}, {
    selector: row => row.unitCost,
    name: 'עלות ליחידה',
}, {
    selector: row => row.totalSectionCost,
    name: 'סה"כ עלות לסעיף',
},
{
    selector: row => row.status,
    name: 'סטטוס ביצוע',
}
]