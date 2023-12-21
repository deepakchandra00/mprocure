import axios from "axios";
import { getToken } from "../../../component/utils/getToken";
import { setErrorStatus } from '../../../component/utils/setErrorMessage';
import { getUserApi } from './../../../api';

export const getUser = () => async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      payload: { status: "loading", error: { hasError: false, message: "" } },
    });
    try {
      const accessToken = await getToken().then((token) => {
        return token;
      });

      await axios
        .get(getUserApi(),{
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          dispatch({
            type: 'SET_USER',
            payload: {
              userDetail: response.data,
              status: "succeeded",
              error: { hasError: false, message: "" },
            },
          });
        })
        .catch((error) => {
          console.log(error)
          const errorDetails = setErrorStatus(error);
          dispatch({
            type: 'SET_USER',
            payload: { userDetail: [], status: "failed", error: errorDetails },
          });
        });
    } catch (error) {
      const errorDetails = setErrorStatus(error);
      dispatch({
        type: 'SET_USER',
        payload: { userDetail: [], status: "failed", error: errorDetails },
      });
    }
};
