import {
    Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AutoCheckSearch from "../global/autoCheckSearch";
import AutoSearch from "../autoSearch";
import DatePickers from "../global/datePicker";
import { createBuyApi, getLocationData } from "../../api";
import axios from "axios";
import moment from "moment";
import { showSnackBar } from "../utils/utils";

export default function CopyBuyingForm(props) {

  const [state, setState] = React.useState(props?.editData?.state || []);
  const [comodity, setComodity] = React.useState(
    props?.editData?.commodityVarianceName || []
  );
  const [strategy, setStrategy] = React.useState(
    props?.editData?.strategyName || []
  );
  const [location, setLocation] = React.useState(
    props?.editData?.location || []
  );
  const [locationName, setLocationName] = React.useState<any[]>([]);

  const [price, setPrice] = React.useState(props?.editData?.price || []);
  const [quantity, setQuantity] = React.useState(
    props?.editData?.quantity || []
  );
  const [taxCode, setTaxCode] = React.useState(props?.editData?.taxCode);

  const [errmsg, setErrmsg] = React.useState<any>({});

  const [orginator, setOrginator] = React.useState(
    props?.editData?.originators || []
  );

  const [startDate, setStartDate] = useState(
    new Date(props?.editData?.fromDate)
  );
  const [endDate, setEndDate] = useState(new Date(props?.editData?.toDate));
  const [qSpec, setQspec] = React.useState(props?.editData?.quantitySpec);
  
  const [openCopyDialog, setOpenCopyDialog] = React.useState(false);

  const handleQspec = (event) => {
    setQspec(event.target.value);
  };

  const handleState = (event, values) => {
    setState(values);
  };

  const locationData = (id: any, statecode: any) => {
    axios
      .get(getLocationData(id, statecode), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((resp) => {
        setLocationName(resp.data);
      })
      .catch((error) => {
        console.error(error, "responsedatawa");
      });
  };

  React.useEffect(() => {
      locationData(props?.userDetail?.dsId, props?.editData?.stateCode)
      console.log("useeffect", props?.userDetail?.dsId, props?.editData?.stateCode)
  }, [props?.editData?.stateCode, props?.userDetail?.dsId]);

  const handleLocation = (event, values) => {
    setLocation(values);
  };

  const handleStrategy = (event, values) => {
    setStrategy(values);
  };

  const handleComodity = (event, values) => {
    setComodity(values);
    setTaxCode(values.TaxCode);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleOriginators = (event, values) => {
    setOrginator(values);
  };

  const createBuyingPlan = async () => {
    let formErrors = {};
    let formIsValid = true;
    if (comodity?.length === 0) {
      formIsValid = false;
      formErrors["comodityErr"] = "Comodity is required.";
    }
    if (strategy?.length === 0) {
      formIsValid = false;
      formErrors["strategyErr"] = "Strategy is required.";
    }
    if (state?.length === 0) {
      formIsValid = false;
      formErrors["stateErr"] = "State is required.";
    }
    if (location?.length === 0) {
      formIsValid = false;
      formErrors["locationErr"] = "Location is required.";
    }
    if (price?.length === 0 || price === undefined || price === "") {
      formIsValid = false;
      formErrors["priceErr"] = "Price is required.";
    }
    if (quantity?.length === 0) {
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
    if (orginator?.length === 0) {
      formIsValid = false;
      formErrors["orginatorErr"] = "Originator is required.";
    }
    if (
      Object.keys(comodity).length > 0 &&
      Object.keys(strategy).length > 0 &&
      Object.keys(state).length > 0 &&
      Object.keys(location).length > 0 &&
      Object.keys(orginator).length > 0 &&
      price !== "" &&
      startDate !== null &&
      endDate !== null &&
      quantity !== ""
    ) {
      const data = {
        bpCreateViewModel: {
          buyingPlanId: 0,
          traderId: props?.userDetail?.dsId,
          price: price,
          quantity: quantity,
          commodityVarianceId: comodity["commodityVarianceId"],
          stateId: state["stateId"],
          locationId: props?.editData?.locationId,
          location: location["description"],
          quantitySpecId: 1,
          quantitySpec: qSpec["children"],
          fromDate: moment(startDate).format("MM/DD/YYYY"),
          toDate: moment(endDate).format("MM/DD/YYYY"),
          originators: orginator,
          strategyId: strategy["strategy_id"],
        },
      };

      await axios
        .post(createBuyApi(), data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          showSnackBar(
            props,
            "Buying Plan Succefully Created!",
            3000,
            "success"
          );
          props?.loadBuyingList();
          props.close();
        })
        .catch((error) => {
          showSnackBar(
            props,
            "Failed - Created Buying Plan! " + error?.message,
            9000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  const handleSubmits = (e) => {
    setOpenCopyDialog(true);
  };

  const closeCopyDialog = (e) => {
    setOpenCopyDialog(false);
  };

  const handleCopyPlan = (e) => {
   createBuyingPlan();
  };

  return (
    <Grid
      className="buyingForm"
      container
      spacing={2}
      padding={"10px"}
      mt={"9px"}
    >
      <Grid item xs={12}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <label>Commodity</label>
                    <Autocomplete
                      disableClearable
                      onChange={handleComodity}
                      options={props?.data?.commodityVariants}
                      autoHighlight
                      isOptionEqualToValue={(option:any, value:any) => value.commodityVarianceDesc === option.commodityVarianceDesc}
                      defaultValue={{ commodityVarianceDesc: props?.editData?.commodityVarianceName }}
                      getOptionLabel={(option) => option.commodityVarianceDesc}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={props.label} />
                      )}
                    />
                  </FormControl>
                  {errmsg?.comodityErr && (
                    <Typography className="error">
                      {errmsg?.comodityErr}
                    </Typography>
                  )}
                </div>{" "}
              </TableCell>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
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
                </div>{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <label>Strategy</label>
                    <Autocomplete
                      disableClearable
                      onChange={handleStrategy}
                      options={props?.data?.strategies}
                      autoHighlight
                      getOptionLabel={(option) => option.strategy_name}
                      isOptionEqualToValue={(option:any, value:any) => value.strategy_id === option.strategy_id}
                      defaultValue={{ strategy_name: props?.editData?.strategyName, strategy_id: props?.editData?.strategyId }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={props.label} />
                      )}
                    />
                  </FormControl>
                  {errmsg?.strategyErr && (
                    <Typography className="error">
                      {errmsg?.strategyErr}
                    </Typography>
                  )}
                </div>{" "}
              </TableCell>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <label>Quantity</label>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      placeholder="Quantity"
                      size="small"
                      fullWidth
                      type="number"
                      onChange={handleQuantity}
                      value={quantity}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">MT</InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  {errmsg?.quantityErr && (
                    <Typography className="error">
                      {errmsg?.quantityErr}
                    </Typography>
                  )}
                </div>{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <label>State</label>
                    <Autocomplete
                      disableClearable
                      onChange={handleState}
                      options={props?.data?.states}
                      autoHighlight
                      getOptionLabel={(option) => option.stateName}
                      isOptionEqualToValue={(option:any, value:any) => value.stateId === option.stateId}
                      defaultValue={{ stateId: props?.editData?.stateId, stateName: props?.editData?.state }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={props.label} />
                      )}
                    />
                  </FormControl>
                  {errmsg?.stateErr && (
                    <Typography className="error">
                      {errmsg?.stateErr}
                    </Typography>
                  )}
                </div>{" "}
              </TableCell>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
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
                </div>{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <label>Location</label>
                    <AutoSearch
                      defaultValue={location}
                      handleChange={handleLocation}
                      options={locationName["originDestLocationList"] || []}
                      name={"description"}
                      label={"Location"}
                      setValue={setLocation}
                    />
                  </FormControl>
                  {errmsg?.locationErr && (
                    <Typography className="error">
                      {errmsg?.locationErr}
                    </Typography>
                  )}
                </div>{" "}
              </TableCell>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl sx={{ minWidth: 60 }}>
                    <label>Shipment Period</label>
                    <DatePickers
                      startDate={startDate}
                      startErr={errmsg?.startDateErr}
                      endErr={errmsg?.endDateErr}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                    />
                  </FormControl>
                </div>{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 60 }}>
                    <label>Price</label>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      placeholder="Price"
                      size="small"
                      fullWidth
                      type="number"
                      onChange={handlePrice}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">INR</InputAdornment>
                        ),
                      }}
                      value={price}
                    />
                  </FormControl>
                  {errmsg?.priceErr && (
                    <Typography className="error">
                      {errmsg?.priceErr}
                    </Typography>
                  )}
                </div>{" "}
              </TableCell>
              <TableCell>
                <div className="buyformcontrol">
                  {" "}
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <label>Originators</label>
                    <AutoCheckSearch
                      defaultValue={orginator}
                      handleChange={handleOriginators}
                      options={props?.data?.originators}
                      name={"originatorName"}
                      label={"Originators"}
                      setValue={setOrginator}
                    />
                  </FormControl>
                  {errmsg?.orginatorErr && (
                    <Typography className="error">
                      {errmsg?.orginatorErr}
                    </Typography>
                  )}
                </div>{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid container justifyContent="flex-end" pr={"10px"}>
        <Button
          className="primary btnColor"
          onClick={handleSubmits}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Grid>
      <Dialog
            open={openCopyDialog}
            onClose={closeCopyDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to copy this buying plan?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={closeCopyDialog}>Disagree</Button>
              <Button onClick={handleCopyPlan} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
    </Grid>
  );
}
