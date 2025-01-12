import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

const NewWorkModal = ({ isOpen, closeModal, onSubmit, initialWork }) => {
    const defaultWork = {
        id: null,
        items: [{ id: uuidv4(), section: 1, description: '', contract_amount:'', actual_amount:'', unit_cost:'', status:'', work_type:'', total_section_cost:'' }],
        contractor_name: '',
        facility_name: '',
        work_number: '',
        classification: 'WORK',
        start_date: new Date().toISOString().split('T')[0],
        due_end_date: new Date().toISOString().split('T')[0],
        end_date: null,
        status: 'PENDING_APPROVAL',
        location_name: '',
        remarks: '',
        contractor: 1,
        manager: 1,
        facility: 1,
    };

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialWork || defaultWork,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    useEffect(() => {
        if (initialWork) {
            reset(initialWork);
        }
    }, [initialWork, reset]);

    // const onSubmitHandler = async (data) => {
    //     try {
    //         await onSubmit(data);
    //         closeModal();
    //         reset(defaultWork); // Reset to default after successful submission
    //     } catch (error) {
    //         console.error("Error saving work:", error);
    //     }
    // };
    const onSubmitHandler = async (data) => {
        try {
            if (data.id) {
                // Edit existing work
                await onSubmit(data);
            } else {
                // Create new work
                const createdWork = await DataService.createWork(data);
                if (createdWork) {
                    onSubmit(createdWork); // Pass the created work back up
                } else {
                    throw new Error("Failed to create work.");
                }
            }
            closeModal();
            reset(initialWork || defaultWork); // Reset after successful submission or edit
        } catch (error) {
            console.error("Error saving work:", error);
            // Display error message to the user (using MUI Snackbar or similar)
            alert("An error occurred while saving the work. Please try again."); // Simple alert for now
        }
    };

    return (
        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
            <DialogTitle>{initialWork ? 'Edit Work' : 'Add New Work'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    {/* Work Details (Using Grid for better layout) */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField {...register("work_number", { required: "Work Number is required" })} label="Work Number" fullWidth margin="normal" error={!!errors.work_number} helperText={errors.work_number?.message}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField {...register("contractor_name", { required: "Contractor Name is required" })} label="Contractor Name" fullWidth margin="normal" error={!!errors.contractor_name} helperText={errors.contractor_name?.message}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField {...register("facility_name", { required: "Facility Name is required" })} label="Facility Name" fullWidth margin="normal" error={!!errors.facility_name} helperText={errors.facility_name?.message}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField {...register("location_name", { required: "Location Name is required" })} label="Location Name" fullWidth margin="normal" error={!!errors.location_name} helperText={errors.location_name?.message}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register("remarks")} label="Remarks" fullWidth margin="normal" multiline rows={3} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                {...register("start_date", { required: "Start Date is required" })}
                                label="Start Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.start_date}
                                helperText={errors.start_date?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                {...register("due_end_date", { required: "Due End Date is required" })}
                                label="Due End Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.due_end_date}
                                helperText={errors.due_end_date?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    {...register("status", { required: "Status is required" })}
                                    label="Status"
                                    error={!!errors.status}
                                >
                                    {/* ... MenuItems */}
                                </Select>
                                {errors.status && <div style={{ color: 'red' }}>{errors.status.message}</div>}
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Work Items (Improved Layout) */}
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Work Items</Typography>
                    {fields.map((item, index) => (
                        <Paper key={item.id} elevation={2} sx={{ padding: 2, mb: 2 }}>
                            <Grid container spacing={2} direction="column"> {/* Vertical layout */}
                                <Grid item xs={12}>
                                    <TextField
                                        {...register(`items.${index}.description`, { required: "Description is required" })}
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        error={!!errors.items?.[index]?.description}
                                        helperText={errors.items?.[index]?.description?.message}
                                    />
                                </Grid>
                                <Grid container item spacing={2}> {/* Horizontal layout for other fields */}
                                    <Grid item xs={6} sm={3}>
                                        <TextField {...register(`items.${index}.section`, { required: "Section is required" })} label="Section" type="number" fullWidth error={!!errors.items?.[index]?.section} helperText={errors.items?.[index]?.section?.message}/>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField {...register(`items.${index}.contract_amount`, { required: "Contract Amount is required" })} label="Contract Amount" type="number" fullWidth error={!!errors.items?.[index]?.contract_amount} helperText={errors.items?.[index]?.contract_amount?.message}/>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField {...register(`items.${index}.actual_amount`, { required: "Actual Amount is required" })} label="Actual Amount" type="number" fullWidth error={!!errors.items?.[index]?.actual_amount} helperText={errors.items?.[index]?.actual_amount?.message}/>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField {...register(`items.${index}.unit_cost`, { required: "Unit Cost is required" })} label="Unit Cost" type="number" fullWidth error={!!errors.items?.[index]?.unit_cost} helperText={errors.items?.[index]?.unit_cost?.message}/>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField {...register(`items.${index}.work_type`, { required: "Work Type is required" })} label="Work Type" fullWidth error={!!errors.items?.[index]?.work_type} helperText={errors.items?.[index]?.work_type?.message}/>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id={`status-label-${index}`}>Status</InputLabel>
                                            <Select
                                                labelId={`status-label-${index}`}
                                                id={`status-${index}`}
                                                {...register(`items.${index}.status`, { required: "Status is required" })}
                                                label="Status"
                                                error={!!errors.items?.[index]?.status}
                                            >
                                                {/* ... MenuItems */}
                                            </Select>
                                            {errors.items?.[index]?.status && <div style={{ color: 'red' }}>{errors.items?.[index]?.status?.message}</div>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}> {/* Align delete to the right */}
                                    <IconButton onClick={() => remove(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    <Button type="button" onClick={() => append({ id: uuidv4(), section: 1, description: '', contract_amount:'', actual_amount:'', unit_cost:'', status:'', work_type:'', total_section_cost:'' })}>Add Work Item</Button>

                    <DialogActions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};




export { NewWorkModal }; // Named export (important!)
// or if you want default export
// export default NewWorkModal;

// import { useState } from "react"
// import { WorkRowList } from "./WorkRowList";
// import { generateSimpleId } from "../../services/utils";
//
// export const NewWorkModal = ({ isOpen, closeModal }) => {
//
//
//
//     //#region New Work
//     const addNewWork = () => {
//         return {
//             id: generateSimpleId(),
//             workType: '',
//             amount: 1,
//             unitMeasure: 'מטר',
//             eachCost: 0
//         }
//     }
//     const [sections, setSections] = useState([addNewWork()]);
//
//     const removeSection = (id) => {
//         if (sections.length <= 1) return;
//         setSections(sections.filter(s => s.id !== id))
//     }
//
//     const updateSecction = (secction) => {
//
//     }
//
//     //#endregion
//     //#region Modal control methods
//     const onCancelBtnClicked = () => {
//
//         closeModal();
//     }
//     const onSaveBtnClicked = () => {
//
//         closeModal();
//     }
//     //#endregion
//
//     //#region DOM
//     if (!isOpen) return <></>
//     return <>
//         <div className="modal-overlay"></div>
//
//         <form className="new-main-container">
//             <h2 className="new-main-title">הוסף משימה לעבודה פעילה</h2>
//
//             <div className="new-row-container">
//                 <label htmlFor="work-num" className="new-sub-header">מספר עבודה</label>
//                 <input type="text" id="new-cost" />
//             </div>
//
//             <div className="new-row-container">
//                 <label className="new-sub-header">בחירת קבלן לביצוע</label>
//                 <select className="new-sub-select">
//                     <option value="one">קובי ממן</option>
//                     <option value="two">יזהר כהן</option>
//                     <option value="three">אבי נמני</option>
//                 </select>
//             </div>
//
//             <WorkRowList addSection={() => setSections([...sections, addNewWork()])}
//                 removeRow={(sectionId) => removeSection(sectionId)}
//                 workRows={sections} />
//
//             <div className="new-cul-container">
//                 <label className="new-sub-header" htmlFor="new-notes-textarea">הערות</label>
//                 <textarea id="new-notes-textarea"></textarea>
//             </div>
//
//             <div className="new-row-container details-row">
//                 <div className="new-cul-container details-container">
//                     <h4 className="new-sub-header">סה"כ עלות לעבודה</h4>
//                     <h4 >300 ₪</h4>
//                 </div>
//                 <div className="new-cul-container details-container">
//                     <h4 className="new-sub-header">אישור עבודה מנהל</h4>
//                     <div className="new-row-container">
//                         <h4 className="new-mini-sub-header">סטטוס:</h4>
//                         <h4 > בהמתנה</h4>
//                     </div>
//                 </div>
//                 <div className="new-cul-container details-container">
//                     <h4 className="new-sub-header">אישור עבודה קבלן</h4>
//                     <div className="new-row-container">
//                         <h4 className="new-mini-sub-header">סטטוס:</h4>
//                         <h4 >בהמתנה לאישור הקבלן</h4>
//                     </div>
//                 </div>
//             </div>
//
//
//             <div className="new-row-container btn-container">
//                 <button className="save-btn" onClick={() => onSaveBtnClicked()}>שמור</button>
//                 <button className="cancel-btn" onClick={() => onCancelBtnClicked()}>בטל</button>
//             </div>
//         </form>
//     </>
//     //#endregion
//
// }


//     return (
//         <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
//             <DialogTitle>{initialWork ? 'Edit Work' : 'Add New Work'}</DialogTitle>
//             <DialogContent>
//                 <form onSubmit={handleSubmit(onSubmitHandler)}>
//                     <TextField {...register("work_number", { required: "Work Number is required" })} label="Work Number" fullWidth margin="normal" error={!!errors.work_number} helperText={errors.work_number?.message}/>
//                     <TextField {...register("contractor_name", { required: "Contractor Name is required" })} label="Contractor Name" fullWidth margin="normal" error={!!errors.contractor_name} helperText={errors.contractor_name?.message}/>
//                     <TextField {...register("facility_name", { required: "Facility Name is required" })} label="Facility Name" fullWidth margin="normal" error={!!errors.facility_name} helperText={errors.facility_name?.message}/>
//                     <TextField {...register("location_name", { required: "Location Name is required" })} label="Location Name" fullWidth margin="normal" error={!!errors.location_name} helperText={errors.location_name?.message}/>
//                     <TextField {...register("remarks")} label="Remarks" fullWidth margin="normal" multiline rows={3} />
//                     <TextField
//                         {...register("start_date", { required: "Start Date is required" })}
//                         label="Start Date"
//                         type="date"
//                         fullWidth
//                         margin="normal"
//                         InputLabelProps={{ shrink: true }}
//                         error={!!errors.start_date}
//                         helperText={errors.start_date?.message}
//                     />
//                     <TextField
//                         {...register("due_end_date", { required: "Due End Date is required" })}
//                         label="Due End Date"
//                         type="date"
//                         fullWidth
//                         margin="normal"
//                         InputLabelProps={{ shrink: true }}
//                         error={!!errors.due_end_date}
//                         helperText={errors.due_end_date?.message}
//                     />
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel id="status-label">Status</InputLabel>
//                         <Select
//                             labelId="status-label"
//                             id="status"
//                             {...register("status", { required: "Status is required" })}
//                             label="Status"
//                             error={!!errors.status}
//                         >
//                             <MenuItem value={'PENDING_APPROVAL'}>PENDING_APPROVAL</MenuItem>
//                             <MenuItem value={'IN_PROGRESS'}>IN_PROGRESS</MenuItem>
//                             <MenuItem value={'FINISHED'}>FINISHED</MenuItem>
//                             {/* Add other status options */}
//                         </Select>
//                         {errors.status && <div style={{ color: 'red' }}>{errors.status.message}</div>}
//                     </FormControl>
//
//                     <h3>Work Items</h3>
//                     {fields.map((item, index) => (
//                         <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//                             <TextField {...register(`items.${index}.section`, { required: "Section is required" })} label="Section" type="number" sx={{ mr: 1 }} error={!!errors.items?.[index]?.section} helperText={errors.items?.[index]?.section?.message}/>
//                             <TextField {...register(`items.${index}.description`, { required: "Description is required" })} label="Description" sx={{ mr: 1 }} fullWidth error={!!errors.items?.[index]?.description} helperText={errors.items?.[index]?.description?.message}/>
//                             <TextField {...register(`items.${index}.contract_amount`, { required: "Contract Amount is required" })} label="Contract Amount" type="number" sx={{ mr: 1 }} error={!!errors.items?.[index]?.contract_amount} helperText={errors.items?.[index]?.contract_amount?.message}/>
//                             <TextField {...register(`items.${index}.actual_amount`, { required: "Actual Amount is required" })} label="Actual Amount" type="number" sx={{ mr: 1 }} error={!!errors.items?.[index]?.actual_amount} helperText={errors.items?.[index]?.actual_amount?.message}/>
//                             <TextField {...register(`items.${index}.unit_cost`, { required: "Unit Cost is required" })} label="Unit Cost" type="number" sx={{ mr: 1 }} error={!!errors.items?.[index]?.unit_cost} helperText={errors.items?.[index]?.unit_cost?.message}/>
//                             <TextField {...register(`items.${index}.work_type`, { required: "Work Type is required" })} label="Work Type" sx={{ mr: 1 }} fullWidth error={!!errors.items?.[index]?.work_type} helperText={errors.items?.[index]?.work_type?.message}/>
//                             <FormControl sx={{ mr: 1 }} fullWidth>
//                                 <InputLabel id={`status-label-${index}`}>Status</InputLabel>
//                                 <Select
//                                     labelId={`status-label-${index}`}
//                                     id={`status-${index}`}
//                                     {...register(`items.${index}.status`, { required: "Status is required" })}
//                                     label="Status"
//                                     error={!!errors.items?.[index]?.status}
//                                 >
//                                     <MenuItem value={'PENDING'}>PENDING</MenuItem>
//                                     <MenuItem value={'IN_PROGRESS'}>IN_PROGRESS</MenuItem>
//                                     <MenuItem value={'FINISHED'}>FINISHED</MenuItem>
//                                     {/* Add other status options */}
//                                 </Select>
//                                 {errors.items?.[index]?.status && <div style={{ color: 'red' }}>{errors.items?.[index]?.status?.message}</div>}
//                             </FormControl>
//                             <IconButton onClick={() => remove(index)}>
//                                 <DeleteIcon />
//                             </IconButton>
//                         </Box>
//                     ))}
//                     <Button type="button" onClick={() => append({ id: uuidv4(), section: 1, description: '', contract_amount:'', actual_amount:'', unit_cost:'', status:'', work_type:'', total_section_cost:'' })}>Add Work Item</Button>
//
//                     {/*<DialogActions>*/}
//                     {/*    <Button onClick={closeModal}>Cancel</Button>*/}
//                     {/*    <Button type="submit">Save</Button>*/}
//                     {/*</DialogActions>*/}
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={closeModal}>Cancel</Button>
//                 <Button type="submit">Save</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };
