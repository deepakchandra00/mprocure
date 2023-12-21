import { Button, Grid, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material'
import axios from 'axios';
import moment from 'moment';
import React from 'react'
import { approveRefineApi, refineBuyApi } from '../../api';
import { showSnackBar } from '../utils/utils';

export default function Refine(props) {
    const [price, setPrice] = React.useState(props?.editData?.price || []);
    const [quantity, setQuantity] = React.useState(props?.editData?.quantity || []);
    const [qSpec, setQspec] = React.useState("");

    const endDate = "";
    const [orgComment, setOrgComment] = React.useState("");

    const handleOrgComment = (event) => {
        setOrgComment(event.target.value)
    }

    const approveRefine = async (value) => {
        console.log(value)
        const data = {
            "buyingPlanId": props?.editData?.buyingPlanId,
            "refineRequestId": 0,
            "traderId": props?.userDetail?.dsId,
            "originatorId": props?.editData?.originators[0]?.OriginatorId,
            "isApproved": value,
            "traderComment": "string"
        }

        await axios
            .post(approveRefineApi(), data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log("successfully updated")
                showSnackBar(props, value ? "Refine Approved!" : "Refine Reject", 3000, "success")
                // props?.loadBuyingList();
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


    console.log(props)

    const handleSubmits = async (e) => {
        e.preventDefault();
        await approveRefine(true);
    };

    const handleRejects = async (e) => {
        await approveRefine(false);
    }

    return (
        <Grid className='buyingForm' container spacing={2} padding={"10px"} mt={"10px"}>
            <Grid item xs={8}>
                {Object.keys(props?.editData).length > 0 &&
                    <>
                        <Grid item xs={12}>
                            <Table className='modifyBuy'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            1. Commodity
                                        </TableCell>
                                        <TableCell>
                                            {props?.editData?.buyingPlanId}
                                        </TableCell>
                                        <TableCell>
                                            Applicable GST for commodity-
                                        </TableCell>
                                        <TableCell>
                                            {props?.editData?.taxCode}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            2. Strategy
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
                                            3. State
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
                                            4. Location
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
                                            5.  Price
                                        </TableCell>
                                        <TableCell>
                                            {props?.editData?.requestedPrice}
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            6. Quantity
                                        </TableCell>
                                        <TableCell>
                                            {props?.editData?.requestedQuantity}
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            7. Quality Spec
                                        </TableCell>
                                        <TableCell>
                                            {props?.editData?.requestedQuantitySpec}
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            8. Valid
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            {moment(props?.editData?.fromDate).format("MM/DD/YYYY")} - {moment(props?.editData?.requestedToDate).format("MM/DD/YYYY")}
                                        </TableCell>
                                        <TableCell >
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            9. Originators
                                        </TableCell>
                                        <TableCell>
                                            {/* {props?.editData?.quantitySpec} */}
                                        </TableCell>
                                        <TableCell>
                                        </TableCell>
                                        <TableCell>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            10. Originator Comment
                                        </TableCell>
                                        <TableCell colSpan={3}>

                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            11. Comments
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                id="filled-hidden-label-small"
                                                fullWidth
                                                label="Comments"
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
                            <Button className='btnColor' onClick={handleSubmits} type="submit" variant="contained">
                                Approve
                            </Button> &nbsp;
                            <Button className='btnHeight' color="error" onClick={handleRejects} type="submit" variant="contained">
                                Reject
                            </Button>
                        </Grid>
                    </>
                }
            </Grid>
            <Grid item xs={4} style={{ borderLeft: "1px solid #cacaca61" }}>
                <div className="originaBuying">
                    <h4 style={{ margin: "0px", paddingLeft: "10px" }}> Original Buying Plan </h4>
                    <Table style={{ marginTop: "10px" }}>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Commodity
                                </TableCell>
                                <TableCell>
                                    {props?.editData?.buyingPlanId}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    State
                                </TableCell>
                                <TableCell>
                                    {props?.editData?.state}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Location
                                </TableCell>
                                <TableCell>
                                    {props?.editData?.location}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Price
                                </TableCell>
                                <TableCell>
                                    {props?.editData?.price}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Quantity
                                </TableCell>
                                <TableCell>
                                    {props?.editData?.quantity}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Quality Spec
                                </TableCell>
                                <TableCell>
                                    {props?.editData?.quantitySpec}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Valid
                                </TableCell>
                                <TableCell colSpan={2}>
                                    {moment(props?.editData?.fromDate).format("MM/DD/YYYY")} - {moment(props?.editData?.toDate).format("MM/DD/YYYY")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Grid>
        </Grid>
    )
}
