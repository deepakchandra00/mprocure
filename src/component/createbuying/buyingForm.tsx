import { Button, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AutoCheckSearch from '../global/autoCheckSearch';
import AutoSearch from './../autoSearch';
import DatePickers from './../global/datePicker';
import { createBuyApi, getLocationData } from './../../api';
import axios from 'axios';
import moment from 'moment';
import { showSnackBar } from '../utils/utils';

export default function BuyingForm(props) {
    const [state, setState] = React.useState([]);
    const [comodity, setComodity] = React.useState([]);
    const [strategy, setStrategy] = React.useState([]);
    const [location, setLocation] = React.useState([]);
    const [locationName, setLocationName] = React.useState<any[]>([])

    const [price, setPrice] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [taxCode, setTaxCode] = React.useState("");


    const [errmsg, setErrmsg] = React.useState<any>({});

    const [orginator, setOrginator] = React.useState<string[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [qSpec, setQspec] = React.useState({ value: '1', children: 'Quality Specification' });

    console.log(moment(startDate).format("DD/MM/YYYY"), price, qSpec['value'])


    const handleQspec = (event) => {
        setQspec(event.target.value)
    };

    const handleState = (event, values) => {
        console.log(values)
        setState(values)
        locationData(props?.userDetail?.dsId, values?.stateCode)
    };


    const locationData = (id: any, statecode: any) => {
        axios
            .get(getLocationData(id, statecode), {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            })
            .then((resp) => {
                setLocationName(resp.data);
            });
    };

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
        setTaxCode(values?.taxCode)
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
        if (startDate?.length === 0 || startDate === undefined || startDate === "") {
            formIsValid = false;
            formErrors["startDateErr"] = "Start Date is required.";
        }
        if (endDate?.length === 0 || endDate === undefined || endDate === "") {
            formIsValid = false;
            formErrors["endDateErr"] = "End Date is required.";
        }
        if (orginator?.length === 0 || orginator === undefined) {
            formIsValid = false;
            formErrors["orginatorErr"] = "Originator is required.";
        }
        if (
            Object.keys(comodity).length > 0 && Object.keys(strategy).length > 0 && Object.keys(state).length > 0 && Object.keys(location).length > 0 && Object.keys(orginator).length > 0 && price !== "" && startDate !== "" && endDate !== "" && quantity !== ""
        ) {
            const data = {
                "bpCreateViewModel": {
                    "buyingPlanId": 0,
                    "traderId": props?.userDetail?.dsId,
                    "price": price,
                    "quantity": quantity,
                    "commodityVarianceId": comodity['commodityVarianceId'],
                    "stateId": state['stateId'],
                    "locationId": location['id'],
                    "location": location['description'],
                    "quantitySpecId": 1,
                    "quantitySpec": qSpec,
                    "fromDate": moment(startDate).format("MM/DD/YYYY"),
                    "toDate": moment(endDate).format("MM/DD/YYYY"),
                    "originators": orginator,
                    "strategyId": strategy['strategy_id']
                }
            }
            console.log(data, state, location, qSpec)
            await axios
                .post(createBuyApi(), data, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    console.log("successfully updated")
                    showSnackBar(props, "Buying Plan Succefully created!", 3000, "success")
                    props?.loadBuyingList();
                    props.close();
                })
                .catch((error) => {
                    console.log(error);
                    showSnackBar(
                        props,
                        "Failed - Create Buying Plan! " + error?.message,
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

    console.log(locationName)

    return (
        <Grid className='buyingForm' container spacing={2} padding={"10px"} mt={"9px"}>
            <Grid item xs={12}>
                <Table >
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="buyformcontrol"> <FormControl fullWidth sx={{ minWidth: 120 }}>
                                    <label>Commodity</label>
                                    <AutoSearch options={props?.data?.commodityVariants || []} handleChange={handleComodity} name={"commodityCode"} label={"Commodity"} setValue={setComodity} />
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
                                    <AutoSearch options={props?.data?.strategies || []} handleChange={handleStrategy} name={"strategy_name"} label={"Strategy"} setValue={setState} />
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
                                    <AutoSearch handleChange={handleState} options={props?.data?.states || []} name={"stateName"} label={"State"} setValue={setState} />
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
                                    <AutoSearch handleChange={handleLocation} options={locationName['originDestLocationList'] || []} name={"description"} label={"Location"} setValue={setLocation} />
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
                                    <AutoCheckSearch handleChange={handleOriginators} options={props?.data?.originators || []} name={"originatorName"} label={"Originators"} setValue={setState} />
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
