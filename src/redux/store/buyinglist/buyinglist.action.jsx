import axios from "axios";
import { allBuyingList } from "../../../api";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from './../../../component/utils/setErrorMessage';

export const getBuyingList = (traderid) => async (dispatch) => {
    dispatch({
      type: 'SET_BUYINGLIST',
      payload: { status: "loading", error: { hasError: false, message: "" } },
    });
    try {
      let data = {
        traderId: traderid
      };

      const accessToken = await getToken().then((token) => {
        return token;
      });

      console.log(accessToken)

      await axios
        .post(allBuyingList(), data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          dispatch({
            type: 'SET_BUYINGLIST',
            payload: {
              buyingList: response.data,
              status: "succeeded",
              error: { hasError: false, message: "" },
            },
          });
        })
        .catch((error) => {
          console.log(error)
          const errorDetails = setErrorStatus(error);
          dispatch({
            type: 'SET_BUYINGLIST',
            payload: { buyingList: [], status: "failed", error: errorDetails },
          });
        });
    } catch (error) {
      const errorDetails = setErrorStatus(error);
      dispatch({
        type: 'SET_BUYINGLIST',
        payload: { buyingList: [], status: "failed", error: errorDetails },
      });
    }
};
