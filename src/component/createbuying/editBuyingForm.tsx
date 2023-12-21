import { Button, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AutoCheckSearch from '../global/autoCheckSearch';
import AutoSearch from '../autoSearch';
import DatePickers from '../global/datePicker';
import { getLocationData, modifyBuyApi } from '../../api';
import axios from 'axios';
import moment from 'moment';
import { showSnackBar } from '../utils/utils';

export default function EditBuyingForm(props) {
    const [state, setState] = React.useState(props?.editData?.state || []);
    const [comodity, setComodity] = React.useState(props?.editData?.commodityVarianceName || []);
    const [strategy, setStrategy] = React.useState(props?.editData?.strategyName || []);
    const [location, setLocation] = React.useState(props?.editData?.location || []);
    const [locationName, setLocationName] = React.useState<any[]>([])

    const [price, setPrice] = React.useState(props?.editData?.price || []);
    const [quantity, setQuantity] = React.useState(props?.editData?.quantity || []);
    const [taxCode, setTaxCode] = React.useState(props?.editData?.taxCode);


    const [errmsg, setErrmsg] = React.useState<any>({});

    const [orginator, setOrginator] = React.useState((props?.editData?.originators || []));

    const [startDate, setStartDate] = useState(new Date(props?.editData?.fromDate));
    const [endDate, setEndDate] = useState(new Date(props?.editData?.toDate));
    const [qSpec, setQspec] = React.useState(props?.editData?.quantitySpec);

    console.log(new Date(props?.editData?.fromDate), startDate, props?.data?.strategies)


    const handleQspec = (event) => {
        setQspec(event.target.value);
    };

    const handleState = (event, values) => {
        console.log(values)
        setState(values)
    };

    const locationData = (id: any, statecode: any) => {
        console.log("locationdata")
        axios
            .get(getLocationData(id, statecode), {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            })
            .then((resp) => {
                console.log(resp)
                setLocationName(resp.data);
            })
            .catch((error) => {
                console.error(error, "responsedatawa");
            });
    };

    React.useEffect(() => {
        locationData(props?.userDetail?.dsId, props?.editData?.stateCode)
        console.log("useeffect", props?.userDetail?.dsId, props?.editData?.stateCode)
    }, [props?.editData?.stateCode, props?.editData.stateId, props?.userDetail?.dsId]);

    console.log(locationName, props)

    const handleLocation = (event, values) => {
        setLocation(values)
    };

    const handleStrategy = (event, values) => {
        console.log(values)
        setStrategy(values)
    };

    const handleComodity = (event, values) => {
        console.log(values)
        setComodity(values)
        setTaxCode(values.TaxCode)
    };

    const handlePrice = (event) => {
        setPrice(event.target.value)
    };

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    };

    const handleOriginators = (event, values) => {
        console.log(values)
        setOrginator(values)
    };

    console.log(props)

    const createBuyingPlan = async () => {
        let formErrors = {};
        let formIsValid = true;
        if (comodity?.length === 0 || comodity === undefined) {
            formIsValid = false;
            formErrors["comodityErr"] = "Comodity is required.";
        }
        if (strategy?.length === 0 || strategy === undefined) {
            formIsValid = false;
            formErrors["strategyErr"] = "Strategy is required.";
        }
        if (state?.length === 0 || state === undefined) {
            formIsValid = false;
            formErrors["stateErr"] = "State is required.";
        }
        if (location?.length === 0 || location === undefined) {
            formIsValid = false;
            formErrors["locationErr"] = "Location is required.";
        }
        if (price?.length === 0 || price === undefined || price === "") {
            formIsValid = false;
            formErrors["priceErr"] = "Price is required.";
        }
        if (quantity?.length === 0 || quantity === undefined || quantity === "") {
            formIsValid = false;
            formErrors["quantityErr"] = "Quantity is required.";
        }
        if (startDate === null) {
            formIsValid = false;
            formErrors["startDateErr"] = "Start Date is required.";
        }
        if (endDate === null) {
            formIsValid = false;
            formErrors["endDateErr"] = "End Date is required.";
        }
        if (orginator?.length === 0 || orginator === undefined) {
            formIsValid = false;
            formErrors["orginatorErr"] = "Originator is required.";
        }
        if (
            Object.keys(comodity).length > 0 && Object.keys(strategy).length > 0 && Object.keys(state).length > 0 && Object.keys(location).length > 0 && Object.keys(orginator).length > 0 && price !== "" && startDate !== null && endDate !== null && quantity !== ""
        ) {
            const data = {
                "bpModifyViewModel": {
                    "buyingPlanId": props?.editData?.buyingPlanId,
                    "traderId": props?.userDetail?.dsId,
                    "price": price,
                    "quantity": quantity,
                    "location": location,
                    "locationId": props?.editData?.locationId,
                    "quantitySpecId": 0,
                    "quantitySpec": qSpec['children'],
                    "fromDate": moment(startDate).format("MM/DD/YYYY"),
                    "toDate": moment(endDate).format("MM/DD/YYYY"),
                }
            }

            await axios
                .post(modifyBuyApi(), data, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    console.log("successfully updated")
                    showSnackBar(props, "Buying Plan Succefully updated!", 3000, "success")
                    props?.loadBuyingList();
                    props.close();
                })
                .catch((error) => {
                    console.log(error);
                    showSnackBar(
                        props,
                        "Failed - Update Buying Plan! " + error?.message,
                        9000,
                        "error"
                    );
                });
        }
        setErrmsg(formErrors);
        return formIsValid;
    };

    const handleSubmits = async (e) => {
        e.preventDefault();
        await createBuyingPlan();
    };

    return (
        <Grid className='buyingForm' container spacing={2} padding={"10px"} mt={"9px"}>
            <Grid item xs={12}>
                <Table >
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Commodity</label>
                                    <AutoSearch disabled={true} options={props?.data[0]?.AllVarCommodities || []} handleChange={handleComodity} defaultValue={comodity} name={"CommodityCode"} label={"Commodity"} setValue={setComodity} />
                                </FormControl>
                                    {errmsg?.comodityErr && (
                                        <Typography className='error'>
                                            {errmsg?.comodityErr}
                                        </Typography>
                                    )}
                                </div> </TableCell>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Tax Code</label>
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        size="small"
                                        value={taxCode}
                                        fullWidth
                                        disabled
                                    />
                                </FormControl>
                                </div> </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Strategy</label>
                                    <AutoSearch defaultValue={strategy} options={props?.data?.strategies || []} handleChange={handleStrategy} name={"strategy_name"} label={"Strategy"} setValue={setState} />
                                </FormControl>
                                    {errmsg?.strategyErr && (
                                        <Typography className='error'>
                                            {errmsg?.strategyErr}
                                        </Typography>
                                    )}
                                </div> </TableCell>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Quantity</label>
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        placeholder='Quantity'
                                        size="small"
                                        fullWidth
                                        type="number"
                                        onChange={handleQuantity}
                                        value={quantity}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">MT</InputAdornment>,
                                        }}
                                    />
                                </FormControl>
                                    {errmsg?.quantityErr && (
                                        <Typography className='error'>
                                            {errmsg?.quantityErr}
                                        </Typography>
                                    )}
                                </div> </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>State</label>
                                    <AutoSearch disabled={true} defaultValue={state} handleChange={handleState} options={props?.data[0]?.AllStates || []} name={"StateName"} label={"State"} setValue={setState} />
                                </FormControl>
                                    {errmsg?.stateErr && (
                                        <Typography className='error'>
                                            {errmsg?.stateErr}
                                        </Typography>
                                    )}
                                </div> </TableCell>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Quality specification</label>
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        placeholder="Quality Specification"
                                        size="small"
                                        fullWidth
                                        onChange={handleQspec}
                                    />
                                </FormControl>
                                </div> </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Location</label>
                                    <AutoSearch defaultValue={location} handleChange={handleLocation} options={locationName['originDestLocationList'] || []} name={"description"} label={"Location"} setValue={setLocation} />
                                </FormControl>
                                    {errmsg?.locationErr && (
                                        <Typography className='error'>
                                            {errmsg?.locationErr}
                                        </Typography>
                                    )}
                                </div> </TableCell>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl sx={{ minWidth: 60 }}>
                                    <label>Shipment Period</label>
                                    <DatePickers startDate={startDate} startErr={errmsg?.startDateErr} endErr={errmsg?.endDateErr} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                                </FormControl>
                                </div> </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 60 }}>
                                    <label>Price</label>
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        placeholder='Price'
                                        size="small"
                                        fullWidth
                                        type="number"
                                        onChange={handlePrice}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">INR</InputAdornment>,
                                        }}
                                        value={price}
                                    />
                                </FormControl>
                                    {errmsg?.priceErr && (
                                        <Typography className='error'>
                                            {errmsg?.priceErr}
                                        </Typography>
                                    )}
                                </div> </TableCell>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Originators</label>
                                    <AutoCheckSearch defaultValue={orginator} handleChange={handleOriginators} options={props?.data?.originators || []} name={"originatorName"} label={"Originators"} setValue={setState} />
                                </FormControl>
                                    {errmsg?.orginatorErr && (
                                        <Typography className='error'>
                                            {errmsg?.orginatorErr}
                                        </Typography>
                                    )}
                                </div> </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button className='primary btnColor frm-btn' onClick={handleSubmits} type="submit" variant="contained">
                    Submit
                </Button>
            </Grid>
        </Grid>
    )
}
