import { Button, Grid, InputAdornment, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material'
import axios from 'axios';
import moment from 'moment';
import React from 'react'
import DatePicker from "react-datepicker";
import { refineBuyApi } from '../../api';
import { showSnackBar } from '../utils/utils';

export default function ModifyBuying(props) {
    const [price, setPrice] = React.useState(props?.editData?.price || []);
    const [quantity, setQuantity] = React.useState(props?.editData?.quantity || []);
    const [qSpec, setQspec] = React.useState("");

    const [endDate, setEndDate] = React.useState("");
    const [orgComment, setOrgComment] = React.useState("");

    const handleOrgComment = (event) => {
        setOrgComment(event.target.value)
    }

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    }

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleQspec = (event) => {
        setQspec(event.target.value)
    }

    const modifyBuyingPlan = async () => {
        let formErrors = {};
        let formIsValid = true;
        if (price?.length === 0 || price === undefined || price === "") {
            formIsValid = false;
            formErrors["priceErr"] = "Price is required.";
        }
        if (quantity?.length === 0 || quantity === undefined || quantity === "") {
            formIsValid = false;
            formErrors["quantityErr"] = "Quantity is required.";
        }
        if (endDate === null) {
            formIsValid = false;
            formErrors["endDateErr"] = "End Date is required.";
        }
        if (
            price !== "" && endDate !== null && quantity !== ""
        ) {
            const data = {
                "bpRefineBOViewModel": {
                    "buyingPlanId": props?.editData?.buyingPlanId,
                    "originatorId": props?.userDetail?.dsId,
                    "requestedChangePrice": price,
                    "originatorComment": orgComment,
                    "requestedQuantity": quantity,
                    "qualiitySpec": qSpec['children'],
                    "toDate": moment(endDate).format("MM/DD/YYYY"),
                    "strategyId": 0
                }
            }

            await axios
                .post(refineBuyApi(), data, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    console.log("successfully updated")
                    showSnackBar(props, "Refine Buying Plan Succefully updated!", 3000, "success")
                    props.close();
                })
                .catch((error) => {
                    console.log(error);
                    showSnackBar(
                        props,
                        "Failed - Refine Buying Plan! " + error?.message,
                        9000,
                        "error"
                    );
                });
        }
        return formIsValid;
    };

    console.log(props)

    const handleSubmits = async (e) => {
        e.preventDefault();
        await modifyBuyingPlan();
    };

    return (
        <Grid className='buyingForm' container spacing={2} padding={"10px"} mt={"9px"}>
            {Object.keys(props?.editData).length > 0 &&
                <>
                    <Grid item xs={12}>
                        <Table className='modifyBuy'>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Plan ID
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.buyingPlanId}
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Commodity
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.commodityVarianceName}
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Strategy
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.strategyName}
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        State
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.state}
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Location
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.location}
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Price
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.price}
                                    </TableCell>
                                    <TableCell colSpan={2}>
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
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Quantity
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.quantity}
                                    </TableCell>
                                    <TableCell colSpan={2}>
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
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Quality Spec
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.quantitySpec}
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <TextField
                                            hiddenLabel
                                            id="filled-hidden-label-small"
                                            // placeholder='Quantity'
                                            size="small"
                                            fullWidth
                                            onChange={handleQspec}
                                            value={qSpec}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Epires on
                                    </TableCell>
                                    <TableCell>
                                        {props?.editData?.toDate}
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            endDate={endDate}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Trader Comment
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Originator Comment
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="filled-hidden-label-small"
                                            fullWidth
                                            label="Comment"
                                            multiline
                                            onChange={handleOrgComment}
                                            value={orgComment}
                                            maxRows={3}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid container justifyContent="flex-end" pr={"10px"}>
                        <Button className='primary btnColor' onClick={handleSubmits} type="submit" variant="contained">
                            Request to Modify
                        </Button>
                    </Grid>
                </>
            }
        </Grid>
    )
}
