const base_url = (process.env.REACT_APP_IS_ACCESS_WITH_CAPI &&
    process.env.REACT_APP_IS_ACCESS_WITH_CAPI === "true") ? process.env.REACT_APP_API_CAPI : process.env.REACT_APP_API;

const createBuy = "BuyingPlan/Post";

const modifyBuy = "BuyingPlan/ModifyBuyingPlan"

const allBuyingplan = "BuyingPlan/ViewAllBuyingPlan";

const user = "User/GetUserDetails"

const masterData = 'BuyingPlan/GetBuyingPlanMasterData';

const locationData = "BuyingPlan/GetLocationData"

const refineBuy = "BuyingPlan/RefineBuyingPlan"

const refineBuyList = "BuyingPlan/ViewAllRefiningBuyingPlan"

const sites = "/sites/"

const approveRefine = "BuyingPlan/ApproveRefineToRequest"

const closeBuyPlan = "BuyingPlan/CloseBuyingPlan";

export const createBuyApi = () => `${base_url}${createBuy}`;

export const modifyBuyApi = () => `${base_url}${modifyBuy}`;

export const allBuyingList = () => `${base_url}${allBuyingplan}`;

export const refineBuyApi = () => `${base_url}${refineBuy}`;

export const approveRefineApi = () => `${base_url}${approveRefine}`;

export const refineBuyListApi = () => `${base_url}${refineBuyList}`;

export const getUserApi = () => `${base_url}${user}`;

export const getMasterData = (id) => `${base_url}${masterData}${"?loginId="}${id}`;

export const getLocationData = (id, statecode) => `${base_url}${locationData}${"?loginId="}${id}${"&&StateCode="}${statecode}`;

export const sitesUpdate = (id) => `${base_url}${sites}${id}`;

export const closeBuyingPlanApi = () => `${base_url}${closeBuyPlan}`;

