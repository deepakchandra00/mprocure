import * as React from "react";
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {
    IconButton,
    Collapse,
    Grid,
    CircularProgress,
    Button,
} from "@mui/material";
import { useEffect } from "react";
import DialogComponent from "../global/dialogComponent";
import Snackbars from "../global/snackbars";
import Refine from "./refine";

export default function RefineList(props) {

    const [open, setOpen] = React.useState(false);
    const [collapse, setCollapse] = React.useState({});
    const [modalData, setModalData] = React.useState<any>(null);

    console.log(collapse)

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        props?.data?.map((x, index, arr) => (
            setCollapse((prev) => ({
                ...prev,
                [index]: true,
            }))
        ))
    }, [props?.data])


    console.log(props)
    return (
        <>
            {props?.status === "loading" && (
                <>
                    <div style={{ paddingTop: "1rem" }}>
                        <Grid container direction="row" justifyContent="center">
                            <div style={{ position: "relative" }}>
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Loading
                                </span>
                                <CircularProgress disableShrink />
                            </div>
                        </Grid>
                    </div>
                </>
            )}
            {props?.status === "failed" && (
                <>
                    <Snackbars message={props?.error?.message} variant={"error"} />
                </>
            )}
            {props.status !== "loading" && (
                <>
                    <DialogComponent open={open} title={"Refine Buying Plan"} close={handleClose}>
                        <Refine
                            setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} loadBuyingList={props?.loadBuyingList} close={handleClose} data={props?.createBuyPlans} editData={modalData} userDetail={props?.userDetail}
                        />
                    </DialogComponent>
                    <Grid
                        className="header-container"
                        style={{ marginTop: "0px !important" }}
                        container
                        item
                        spacing={2}
                    >
                        <Grid style={{ paddingLeft: "25px" }} xs={3}>
                            Location (Mt)
                        </Grid>
                        <Grid xs={1}> Quantity </Grid>
                        <Grid xs={1}>
                            Price (INR)
                        </Grid>
                        <Grid xs={props?.userDetail?.roleName === "Trader" ? 1 : 4}>
                            Status (%)
                        </Grid>
                        {props?.userDetail?.roleName === "Trader" &&
                            <Grid xs={3}>
                                Originator
                            </Grid>
                        }
                        <Grid xs={2}>
                            Achieved/Target (Mt)
                        </Grid>
                        <Grid xs={1}>
                        </Grid>
                    </Grid>
                    <>
                        {props?.data?.length > 0 &&
                            props?.data?.map((x, index, arr) => (
                                <>
                                    {x?.buyingPlans?.length > 0 && (
                                        <Grid
                                            className={
                                                collapse[index]
                                                    ? "main-container withcollapse"
                                                    : "main-container withoutcollapse"
                                            }
                                            container
                                            item
                                            spacing={2}
                                        >
                                            <Grid
                                                xs={12}
                                                className="alignCenterBox"
                                            >
                                                <Typography className="listTitle">
                                                    {/* {x?.BuyingPlans?.length > 1 && ( */}
                                                    <IconButton
                                                        aria-label="expand row"
                                                        className="chevron"
                                                        size="small"
                                                        onClick={() =>
                                                            setCollapse((prev) => ({
                                                                ...prev,
                                                                [index]: !prev[index],
                                                            }))
                                                        }
                                                    >
                                                        {collapse[index] ? (
                                                            <KeyboardArrowUp />
                                                        ) : (
                                                            <KeyboardArrowDown />
                                                        )}
                                                    </IconButton>
                                                    {x?.buyingPlans[0]?.commodityVarianceName} - {x?.buyingPlans[0]?.state}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                className="inner-container"
                                                container
                                                item
                                                spacing={2}
                                            >
                                                <React.Fragment key={props}>

                                                    {/* collapse */}
                                                    <div
                                                        className="collapseContainer"
                                                        style={{ display: "block", width: "100%" }}
                                                    >
                                                        <Collapse
                                                            in={collapse[index]}
                                                            timeout="auto"
                                                            unmountOnExit
                                                        >
                                                            {collapse[index] &&
                                                                x?.buyingPlans
                                                                    .map((row, index, arr) => (
                                                                        <Grid
                                                                            className="subcontainer"
                                                                            container
                                                                            item
                                                                            spacing={2}
                                                                            key={row.id}
                                                                        >
                                                                            <Grid xs={3} style={{ paddingLeft: "26px" }}>
                                                                                <IconButton
                                                                                    aria-label="expand row"
                                                                                    className="chevron"
                                                                                    size="small"
                                                                                > </IconButton>
                                                                                <div className="statetitle">
                                                                                    {row.location}
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid
                                                                                className="score spanCenter"
                                                                                xs={1}
                                                                            >
                                                                                {row.quantity} Mt
                                                                            </Grid>
                                                                            <Grid xs={1} className="spanCenter">
                                                                                {row?.price}
                                                                            </Grid>
                                                                            <Grid className="spanCenter" xs={props?.userDetail?.roleName === "Trader" ? 1 : 4}>
                                                                                {x?.buyingPlans[0]?.achivedPercentage}
                                                                            </Grid>
                                                                            {props?.userDetail?.roleName === "Trader" &&
                                                                                <Grid
                                                                                    className="spanCenter"
                                                                                    xs={3}
                                                                                >
                                                                                    {row?.originators[0]?.originatorName}
                                                                                </Grid>
                                                                            }
                                                                            <Grid className="spanCenter" xs={2}>
                                                                                {x?.buyingPlans[0]?.achivedQuantity} / {x?.buyingPlans[0]?.quantity}
                                                                            </Grid>

                                                                            <Grid
                                                                                className="editbutton"
                                                                                xs={1}
                                                                            >
                                                                                {props?.userDetail?.roleName === "Trader" &&
                                                                                    <>
                                                                                        <Button className='btnColor' onClick={() => {
                                                                                            setModalData(row);
                                                                                            setOpen(true);
                                                                                        }} type="submit" variant="contained">
                                                                                            Refine
                                                                                        </Button>
                                                                                    </>}
                                                                            </Grid>
                                                                        </Grid>
                                                                    ))}
                                                        </Collapse>
                                                    </div>
                                                    {/* end collapse */}
                                                </React.Fragment>
                                            </Grid>
                                        </Grid>
                                    )}
                                </>
                            ))}
                    </>
                </>
            )}
        </>
    );
}
