import * as React from "react";
import {
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Close,
  ContentCopyOutlined,
  AutoFixHigh,
  Add,
  Visibility,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {
  IconButton,
  Collapse,
  Grid,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import DialogComponent from "../global/dialogComponent";
import Snackbars from "../global/snackbars";
import EditBuyingForm from "./editBuyingForm";
import ModifyBuying from "../orginator/modifyBuying";
import { closeBuyingPlanApi } from "../../api";
import { showSnackBar } from "../utils/utils";
import axios from "axios";
import CopyBuyingForm from "./copyBuyingForm";

export default function BuyingList(props) {
  const [open, setOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState({});
  const [modalData, setModalData] = React.useState<any>(null);
  const [buyStatus, setBuyStatus] = React.useState<any>("");

  const [openClosePlan, setOpenClosePlan] = React.useState(false);
  const [openCopyPlan, setOpenCopyPlan] = React.useState(false);
  const [currPlanId, setCurrPlanId] = React.useState("");

  console.log(collapse);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props?.data?.map((x, index, arr) =>
      setCollapse((prev) => ({
        ...prev,
        [index]: true,
      }))
    );
  }, [props?.data]);

  /**
   * Close
   */
  const handleClosePlan = (rowData: any) => {
    setOpenClosePlan(true);
    console.log("rowData->", rowData);
    setCurrPlanId(rowData.buyingPlanId);
  };

  const handleClosePlanDialog = () => {
    setOpenClosePlan(false);
  };

  // close buying plan
  const closeBuyingPlan = async () => {
    setOpenClosePlan(false);
    const data = {
      loginId: props.userDetail.dsId,
      buyingPlanId: currPlanId,
    };

    await axios
      .post(closeBuyingPlanApi(), data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        showSnackBar(props, "Buying Plan Succefully closed!", 3000, "success");
        props?.loadBuyingList();
      })
      .catch((error) => {
        showSnackBar(
          props,
          "Failed - Close Buying Plan! " + error?.message,
          9000,
          "error"
        );
      });
  };
  const handleAgreeClose = async (e) => {
    e.preventDefault();
    await closeBuyingPlan();
  };

  /**
   * Copy
   */
  const handleOpenCopyPlan = (row) => {
    setModalData(row);
    setOpenCopyPlan(true);
  };

  const handleCloseCopyPlan = () => {
    setOpenCopyPlan(false);
  };

  const resetStatus = (status) => {
    let showStatus = "";
    if (status === "OPN") {
      showStatus = "Open";
    } else if (status === "CLS") {
      showStatus = "Close";
    }
    return showStatus;
  };

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
          {props?.userDetail?.roleName === "Trader" && (
            <DialogComponent
              open={open}
              title={"Update Buying Plan"}
              close={handleClose}
            >
              <EditBuyingForm
                setSnack={props?.setSnack}
                message={props?.message}
                setDuration={props?.setDuration}
                setVariant={props?.setVariant}
                loadBuyingList={props?.loadBuyingList}
                close={handleClose}
                data={props?.createBuyPlans}
                editData={modalData}
                userDetail={props?.userDetail}
              />
            </DialogComponent>
          )}
          {props?.userDetail?.roleName === "Originator" && (
            <DialogComponent
              open={open}
              title={"Refine Buying Plan"}
              close={handleClose}
            >
              <>
                {buyStatus === "Modify" && (
                  <ModifyBuying
                    setSnack={props?.setSnack}
                    message={props?.message}
                    setDuration={props?.setDuration}
                    setVariant={props?.setVariant}
                    close={handleClose}
                    data={props?.createBuyPlans}
                    editData={modalData}
                    userDetail={props?.userDetail}
                  />
                )}
                {buyStatus === "View" && <ModifyBuying />}
                {buyStatus === "Create" && <ModifyBuying />}
              </>
            </DialogComponent>
          )}
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
            <Grid xs={1}>Price (INR)</Grid>
            <Grid xs={props?.userDetail?.roleName === "Trader" ? 1 : 4}>
              Progress (%)
            </Grid>
            {props?.userDetail?.roleName === "Trader" && (
              <Grid xs={2}>Trader</Grid>
            )}
            <Grid xs={2}>Achieved/Target (Mt)</Grid>
            <Grid xs={1}>Status</Grid>
            <Grid xs={1}></Grid>
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
                      <Grid xs={12} className="alignCenterBox">
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
                          {x?.buyingPlans[0]?.commodityVarianceName} -{" "}
                          {x?.buyingPlans[0]?.state}
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
                                x?.buyingPlans.map((row, index, arr) => (
                                  <Grid
                                    className="subcontainer"
                                    container
                                    item
                                    spacing={2}
                                    key={row.id}
                                  >
                                    <Grid
                                      xs={3}
                                      style={{ paddingLeft: "26px" }}
                                    >
                                      <IconButton
                                        aria-label="expand row"
                                        className="chevron"
                                        size="small"
                                      >
                                        {" "}
                                      </IconButton>
                                      <div className="statetitle">
                                        {row.location}
                                      </div>
                                    </Grid>
                                    <Grid className="score spanCenter" xs={1}>
                                      {row.quantity} Mt
                                    </Grid>
                                    <Grid xs={1} className="spanCenter">
                                      {row?.price}
                                    </Grid>
                                    <Grid
                                      className="spanCenter"
                                      xs={
                                        props?.userDetail?.roleName === "Trader"
                                          ? 1
                                          : 3
                                      }
                                    >
                                      {x?.buyingPlans[0]?.achivedPercentage}
                                    </Grid>
                                    {props?.userDetail?.roleName ===
                                      "Trader" && (
                                        <Grid className="spanCenter" xs={2}>
                                          {row?.trader}
                                        </Grid>
                                      )}
                                    <Grid className="spanCenter" xs={2}>
                                      {x?.buyingPlans[0]?.achivedQuantity} /{" "}
                                      {x?.buyingPlans[0]?.quantity}
                                    </Grid>
                                    <Grid className="spanCenter" xs={1}>
                                      <div className="common-tag-cls">
                                        {resetStatus(row.status)}
                                      </div>
                                    </Grid>
                                    <Grid className="editbutton" xs={1}>
                                      {props?.userDetail?.roleName ===
                                        "Trader" && (
                                          <>
                                            <Tooltip title={"Copy Buying Plan"}>
                                              <ContentCopyOutlined
                                                onClick={() =>
                                                  handleOpenCopyPlan(row)
                                                }
                                              />
                                            </Tooltip>
                                            <Tooltip title={"Edit Buy Plan"}>
                                              <Edit
                                                className="editIcon"
                                                onClick={() => {
                                                  setModalData(row);
                                                  setOpen(true);
                                                }}
                                              />
                                            </Tooltip>
                                            <Tooltip title={"Close"}>
                                              <Close
                                                onClick={() =>
                                                  handleClosePlan(row)
                                                }
                                              />
                                            </Tooltip>
                                          </>
                                        )}
                                      {props?.userDetail?.roleName ===
                                        "Originator" && (
                                          <>
                                            <Tooltip title={"Request to modify"}>
                                              <AutoFixHigh
                                                onClick={() => {
                                                  setModalData(row);
                                                  setOpen(true);
                                                  setBuyStatus("Modify");
                                                }}
                                              />
                                            </Tooltip>
                                            <Tooltip title={"View TIF"}>
                                              <Visibility
                                                onClick={() => {
                                                  setModalData(row);
                                                  setOpen(true);
                                                  setBuyStatus("View");
                                                }}
                                              />
                                            </Tooltip>
                                            <Tooltip title={"Create TIF"}>
                                              <Add
                                                className="editIcon"
                                                onClick={() => {
                                                  setModalData(row);
                                                  setOpen(true);
                                                  setBuyStatus("Create");
                                                }}
                                              />
                                            </Tooltip>
                                          </>
                                        )}
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
          <DialogComponent
            open={openCopyPlan}
            title={"Copy Buying Plan"}
            close={handleCloseCopyPlan}
          >
            <CopyBuyingForm
              setSnack={props?.setSnack}
              message={props?.message}
              setDuration={props?.setDuration}
              setVariant={props?.setVariant}
              loadBuyingList={props?.loadBuyingList}
              close={handleCloseCopyPlan}
              data={props?.createBuyPlans}
              editData={modalData}
              userDetail={props?.userDetail}
            />
          </DialogComponent>
          <Dialog
            open={openClosePlan}
            onClose={handleClosePlanDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to close this buying plan?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClosePlanDialog}>Disagree</Button>
              <Button onClick={handleAgreeClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
