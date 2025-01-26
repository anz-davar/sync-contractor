import React, {useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import DataService from "../../services/dataService.js";

const NewWorkModal = ({isOpen, closeModal, onSubmit, initialWork}) => {
    const [contractors, setContractors] = useState([]);
    const [managers, setManagers] = useState([]);
    const [facilities, setFacilities] = useState([]);

    const defaultWork = {
        id: null,
        work_number: '',
        project: '',
        classification: 'FAULT',
        start_date: new Date().toISOString().split('T')[0],
        due_end_date: new Date().toISOString().split('T')[0],
        end_date:null,
        status: 'PENDING_APPROVAL',
        contractor: 2,
        manager: 1,
        facility: 2,
        location_name: '',
        remarks: '',
        quality_score: null, // New field
        time_score: null,    // New field
        cost_score: null,    // New field
        items: [{
            section: 1,
            description: '',
            contract_amount: '',
            actual_amount: '',
            unit_cost: '',
            status: 'PENDING',
            work_type: ''
        }]
    };

    const formatInitialWork = (work) => {
        if (!work) return defaultWork;
        const formatDate = (dateString) => {
            if (dateString) {
                try {
                    // Check if the date is in dd/MM/yyyy format
                    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
                        const [day, month, year] = dateString.split('/');
                        const isoDateString = `${year}-${month}-${day}T00:00:00.000Z`; // Construct ISO string
                        return isoDateString.split("T")[0];

                    } else {
                        const date = new Date(dateString);
                        return date.toISOString().split("T")[0];
                    }
                } catch (error) {
                    console.error("Invalid date:", dateString, error);
                    return "";
                }
            }
            return "";
        };

        return {
            ...work,
            // start_date: work.start_date ? new Date(work.start_date).toISOString().split('T')[0] : '',
            // due_end_date: work.due_end_date ? new Date(work.due_end_date).toISOString().split('T')[0] : '',
            // end_date: work.end_date ? new Date(work.end_date).toISOString().split('T')[0] : '',
            start_date: formatDate(work.start_date),
            due_end_date: formatDate(work.due_end_date),
            end_date: formatDate(work.end_date),
            contractor: work.contractor,
            project: work.project,
            manager: work.manager,
            facility: work.facility,
            classification: work.classification || 'FAULT',
            status: work.status || 'PENDING_APPROVAL',
            quality_score: work.quality_score, // New field
            time_score: work.time_score,    // New field
            cost_score: work.cost_score,    // New field
            items: work.items.map(item => ({
                ...item,
                section: Number(item.section),
                contract_amount: item.contract_amount?.toString().replace(/\.00$/, '') || '',
                actual_amount: item.actual_amount?.toString().replace(/\.00$/, '') || '',
                unit_cost: item.unit_cost?.toString().replace(/\.00$/, '') || '',
                status: item.status || 'PENDING'
            }))
        };
    };

    const {register, control, handleSubmit, reset, watch, setValue, formState: {errors}} = useForm({
        defaultValues: formatInitialWork(initialWork)
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "items"
    });

    // Watch values for controlled components
    const watchedContractor = watch('contractor');
    const watchedManager = watch('manager');
    const watchedFacility = watch('facility');
    const watchedClassification = watch('classification');
    const watchedStatus = watch('status');

    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                const [contractorsData, managersData, facilitiesData] = await Promise.all([
                    DataService.getContractors(),
                    DataService.getManagers(),
                    DataService.getFacilities()
                ]);
                setContractors(contractorsData);
                setManagers(managersData);
                setFacilities(facilitiesData);
            } catch (error) {
                console.error('Error fetching reference data:', error);
                alert('Error loading form data. Please try again.');
            }
        };

        if (isOpen) {
            fetchReferenceData();
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialWork) {
            const formattedWork = formatInitialWork(initialWork);
            reset(formattedWork);
        }
    }, [initialWork, reset]);

    const onSubmitHandler = async (data) => {
        try {
            // Format dates to ISO format
            const formatDateToISO = (dateString) => {
                if (dateString) {
                    try {
                        return new Date(dateString).toISOString();
                    } catch (error) {
                        console.error("Invalid date:", dateString, error);
                        return null; // Return empty string for invalid dates
                    }
                }
                return null; // Return empty string for missing dates
            };

            const formattedData = {
                ...data,
                start_date: formatDateToISO(data.start_date),
                due_end_date: formatDateToISO(data.due_end_date),
                end_date: formatDateToISO(data.end_date),
                contractor: Number(data.contractor),
                manager: Number(data.manager),
                facility: Number(data.facility),
                items: data.items.map((item) => ({
                    ...item,
                    // contract_amount: item.contract_amount.toString(), // Convert to string
                    // actual_amount: item.actual_amount.toString(), // Convert to string
                    // unit_cost: item.unit_cost.toString(), // Convert to string
                })),
            };

            // Submit the formatted data to the onSubmit callback
            await onSubmit(formattedData);
            closeModal();
            reset(defaultWork);
        } catch (error) {
            console.error("Error saving work:", error);
            alert("An error occurred while saving the work. Please try again.");
        }
    };
    return (
        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
            <DialogTitle>{initialWork ? 'Edit Work' : 'Add New Work'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                {...register("work_number", {required: "Work Number is required"})}
                                label="Work Number"
                                fullWidth
                                margin="normal"
                                error={!!errors.work_number}
                                helperText={errors.work_number?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("project", {required: "project is required"})}
                                label="project"
                                fullWidth
                                margin="normal"
                                error={!!errors.project}
                                helperText={errors.project?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Classification</InputLabel>
                                <Select
                                    value={watchedClassification || ''}
                                    {...register("classification", {required: "Classification is required"})}
                                    label="Classification"
                                >
                                    <MenuItem value="FAULT">Fault</MenuItem>
                                    <MenuItem value="UPGRADE">Upgrade</MenuItem>
                                    <MenuItem value="WORK">Work</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal" error={!!errors.contractor}>
                                <InputLabel>Contractor</InputLabel>
                                <Select
                                    value={watchedContractor || ''}
                                    {...register("contractor", {required: "Contractor is required"})}
                                    label="Contractor"
                                >
                                    {contractors.map(contractor => (
                                        <MenuItem key={contractor.id} value={contractor.id}>
                                            {contractor.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal" error={!!errors.manager}>
                                <InputLabel>Manager</InputLabel>
                                <Select
                                    value={watchedManager || ''}
                                    {...register("manager", {required: "Manager is required"})}
                                    label="Manager"
                                >
                                    {managers.map(manager => (
                                        <MenuItem key={manager.id} value={manager.id}>
                                            {manager.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin="normal" error={!!errors.facility}>
                                <InputLabel>Facility</InputLabel>
                                <Select
                                    value={watchedFacility || ''}
                                    {...register("facility", {required: "Facility is required"})}
                                    label="Facility"
                                >
                                    {facilities.map(facility => (
                                        <MenuItem key={facility.id} value={facility.id}>
                                            {facility.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("start_date", {required: "Start Date is required"})}
                                label="Start Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true}}
                                error={!!errors.start_date}
                                helperText={errors.start_date?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("due_end_date", {required: "Due End Date is required"})}
                                label="Due End Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true}}
                                error={!!errors.due_end_date}
                                helperText={errors.due_end_date?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("end_date")}
                                label="End Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true}}
                                error={!!errors.due_end_date}
                                helperText={errors.due_end_date?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={watchedStatus || ''}
                                    {...register("status", {required: "Status is required"})}
                                    label="Status"
                                >
                                    <MenuItem value="PENDING_APPROVAL">Pending Approval</MenuItem>
                                    <MenuItem value="APPROVED">Approved</MenuItem>
                                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                    <MenuItem value="COMPLETED_BY_CONTRACTOR">Completed by Contractor</MenuItem>
                                    <MenuItem value="WAITING_MANAGER_APPROVAL">Waiting Manager Approval</MenuItem>
                                    <MenuItem value="FINISHED">Finished</MenuItem>
                                    <MenuItem value="WAITING_PAYMENT">Waiting Payment</MenuItem>
                                    <MenuItem value="PAID">Paid</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Rest of your form fields... */}
                        <Grid item xs={12}>
                            <TextField
                                {...register("location_name", {required: "Location is required"})}
                                label="Location"
                                fullWidth
                                margin="normal"
                                error={!!errors.location_name}
                                helperText={errors.location_name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("remarks")}
                                label="Remarks"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={4}> {/* Adjust xs as needed */}
                            <TextField
                                {...register("quality_score")}
                                label="Quality Score"
                                type="number"
                                fullWidth
                                inputProps={{ min: 1, max: 10 }} // Set min/max values
                                error={!!errors.quality_score}
                                helperText={errors.quality_score?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("time_score")}
                                label="Time Score"
                                type="number"
                                fullWidth
                                inputProps={{ min: 1, max: 10 }}
                                error={!!errors.time_score}
                                helperText={errors.time_score?.message}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                {...register("cost_score")}
                                label="Cost Score"
                                type="number"
                                fullWidth
                                inputProps={{ min: 1, max: 10 }}
                                error={!!errors.cost_score}
                                helperText={errors.cost_score?.message}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Work Items
                    </Typography>
                    {fields.map((item, index) => (
                        <Paper key={item.id} elevation={2} sx={{ padding: 2, mb: 2 }}>
                            <Grid container spacing={2}>
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
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.section`, { required: "Section is required" })}
                                        label="Section"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.section}
                                        helperText={errors.items?.[index]?.section?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.contract_amount`, { required: "Contract Amount is required" })}
                                        label="Contract Amount"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.contract_amount}
                                        helperText={errors.items?.[index]?.contract_amount?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.actual_amount`)}
                                        label="Actual Amount"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.actual_amount}
                                        helperText={errors.items?.[index]?.actual_amount?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.unit_cost`, { required: "Unit Cost is required" })}
                                        label="Unit Cost"
                                        fullWidth
                                        type="number" // Set type to "number" for numeric input
                                        error={!!errors.items?.[index]?.unit_cost}
                                        helperText={errors.items?.[index]?.unit_cost?.message}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            {...register(`items.${index}.status`, { required: "Status is required" })}
                                            label="Status"
                                            defaultValue={item.status || "PENDING"}
                                        >
                                            <MenuItem value="PENDING">Pending</MenuItem>
                                            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                            <MenuItem value="QUALITY_CONTROL">Quality Control</MenuItem>
                                            <MenuItem value="COMPLETED">Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register(`items.${index}.work_type`, { required: "Work Type is required" })}
                                        label="Work Type"
                                        fullWidth
                                        error={!!errors.items?.[index]?.work_type}
                                        helperText={errors.items?.[index]?.work_type?.message}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    <Button
                        type="button"
                        onClick={() => append({
                            section: 1,
                            description: '',
                            contract_amount: '',
                            actual_amount: '',
                            unit_cost: '',
                            status: 'PENDING',
                            work_type: ''
                        })}
                    >
                        Add Work Item
                    </Button>

                    <DialogActions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export {NewWorkModal};
