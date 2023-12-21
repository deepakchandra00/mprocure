import axios from "axios";
import { SampleData } from "../../../sample/sampleData";
import { getMasterData } from "./../../../api";
import { getToken } from "./../../../component/utils/getToken";
import { setErrorStatus } from "./../../../component/utils/setErrorMessage";

export const getCreateBuyPlan = (id) => async (dispatch) => {
  console.log(process.env.REACT_APP_NODE_ENV, SampleData);
  dispatch({
    type: "SET_CREATE_BUY_PLAN",
    payload: { status: "loading", error: { hasError: false, message: "" } },
  });
  try {
    const accessToken = await getToken().then((token) => {
      return token;
    });

    await axios
      .get(getMasterData(id), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({
          type: "SET_CREATE_BUY_PLAN",
          payload: {
            create_buy_plans: response.data,
            status: "succeeded",
            error: { hasError: false, message: "" },
          },
        });
      })
      .catch((error) => {
        const errorDetails = setErrorStatus(error);
        dispatch({
          type: "SET_CREATE_BUY_PLAN",
          payload: {
            create_buy_plans: [],
            status: "failed",
            error: errorDetails,
          },
        });
      });
  } catch (error) {
    const errorDetails = setErrorStatus(error);
    dispatch({
      type: "SET_CREATE_BUY_PLAN",
      payload: { create_buy_plans: [], status: "failed", error: errorDetails },
    });
  }
  // }
};
