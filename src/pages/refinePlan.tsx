import React, { useEffect, useCallback } from 'react'
import { Grid } from '@mui/material';
import Title from '../component/global/title/title';
import BuyingForm from '../component/createbuying/buyingForm';
import { getCreateBuyPlan } from '../redux/store/createBuy/createbuyplan.action';
import { useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import DialogComponent from '../component/global/dialogComponent';
import FilterSite from './../component/createbuying/filterList';
import Snackbars from '../component/global/snackbars';
import { getRefineList } from './../redux/store/refinelist/refinelist.action';
import RefineList from './../component/createbuying/refineList';

export default function RefinePlan() {

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
        dispatch(getRefineList(userDetail?.dsId));
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

    const resetFilter = () => {
        setBuyingListData(refineList['allBuyingPlan'])
    }

    const getRefine = (state) => state?.getRefineList;
    const { refineList, status, error } = useSelector(getRefine);
    console.log(useSelector(getRefine))
    useEffect(() => {
        setBuyingListData(refineList?.allBuyingPlan)
    }, [refineList])


    const createBuyPlanlist = (state) => state?.createBuyPlanAPI;
    const { create_buy_plans } = useSelector(createBuyPlanlist);

    console.log(refineList?.allBuyingPlan, buyingListData)

    return (
        <>
            {snack && <Snackbars setSnack={setSnack} duration={duration} message={message} variant={variant} />}
            <DialogComponent open={open} title={"Create Buying Plan"} close={handleClose}>
                <BuyingForm userDetail={userDetail} loadBuyingList={loadBuyingList} setSnack={setSnack} message={setMessage} setDuration={setDuration} setVariant={setVariant} close={handleClose} data={create_buy_plans} />
            </DialogComponent>
            <Title title="Refine Buying Plan">
                <Grid direction="row" container justifyContent="flex-end" alignItems="center" >
                    {userDetail.roleName === "Trader" &&
                        <>
                            <Grid>
                                <FilterSite siteList={refineList || []} buyingList={buyingListData} resetFilter={resetFilter} setBuyingList={setBuyingListData} />
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
                <RefineList userDetail={userDetail} loadBuyingList={loadBuyingList} setSnack={setSnack} message={setMessage} setDuration={setDuration} setVariant={setVariant} createBuyPlans={create_buy_plans} status={status} error={error} data={buyingListData} />
            </div>

        </>
    )
}