import React, { useEffect, useCallback } from 'react';
import { Grid } from '@mui/material';
import Title from '../component/global/title/title';
import Button from '@mui/material/Button';
import BuyingForm from '../component/createbuying/buyingForm';
import { getCreateBuyPlan } from '../redux/store/createBuy/createbuyplan.action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import BuyingList from './../component/createbuying/buyingList';
import DialogComponent from '../component/global/dialogComponent';
import FilterSite from './../component/createbuying/filterList';
import { getBuyingList } from './../redux/store/buyinglist/buyinglist.action';
import Snackbars from '../component/global/snackbars';

export default function BuyingPlan() {

  const [open, setOpen] = React.useState(false);

  const [buyingListData, setBuyingListData] = React.useState<any>([]);

  const [snack, setSnack] = React.useState(false);
  const [variant, setVariant] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [duration, setDuration] = React.useState(null);

  const dispatch = useDispatch<AppDispatch>();

  const getUserDetail = (state) => state?.getUser;
  const { userDetail } = useSelector(getUserDetail);

  const loadBuyingList = useCallback(() => {
    dispatch(getBuyingList(userDetail?.dsId));
  }, [dispatch, userDetail?.dsId]);

  console.log(userDetail)

  const loadBuying = useCallback(() => {
    dispatch(getCreateBuyPlan(userDetail?.dsId));
  }, [dispatch, userDetail?.dsId]);

  useEffect(() => {
    loadBuying();
    loadBuyingList();
  }, [dispatch, loadBuying, loadBuyingList]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (val: any) => {
    setOpen(true);
  };

  const resetFilter = () => {
    setBuyingListData(buyingList?.allBuyingPlan)
  }

  const buyList = (state) => state?.getBuyList;
  const { buyingList, status, error } = useSelector(buyList);
  console.log(useSelector(buyList))
  useEffect(() => {
    setBuyingListData(buyingList?.allBuyingPlan)
  }, [buyingList])


  const createBuyPlanlist = (state) => state?.createBuyPlanAPI;
  const { create_buy_plans } = useSelector(createBuyPlanlist);

  console.log(buyingList?.allBuyingPlan, buyingListData)

  return (
    <>
      {snack && <Snackbars setSnack={setSnack} duration={duration} message={message} variant={variant} />}
      <DialogComponent open={open} title={"Create Buying Plan"} close={handleClose}>
        <BuyingForm userDetail={userDetail} loadBuyingList={loadBuyingList} setSnack={setSnack} message={setMessage} setDuration={setDuration} setVariant={setVariant} close={handleClose} data={create_buy_plans} />
      </DialogComponent>
      <Title title={userDetail.roleName == "Trader" ? "Buying Plan" : "Refine Buying Plan"}>
        <Grid direction="row" container justifyContent="flex-end" alignItems="center" >
          {userDetail.roleName === "Trader" &&
            <>
              <Grid item>
                <Button className='btnColor btnwidth' onClick={handleClickOpen} variant="contained" color="success">
                  Create New
                </Button>
              </Grid>

              <Grid>
                <FilterSite siteList={buyingList || []} buyingList={buyingListData} resetFilter={resetFilter} setBuyingList={setBuyingListData} />
              </Grid>
            </>
          }
        </Grid>
      </Title>
      <div className="dashboard_grid"
        style={{
          backgroundColor: "#f4f4f4",
          padding: "1px 0px 15px 15px",
          height: "calc(100vh - 93px)",
          overflowY: "scroll",
          overflowX: "hidden"
        }}
      >
        <BuyingList userDetail={userDetail} loadBuyingList={loadBuyingList} setSnack={setSnack} message={setMessage} setDuration={setDuration} setVariant={setVariant} createBuyPlans={create_buy_plans} status={status} error={error} data={buyingListData} />
      </div>

    </>
  )
}