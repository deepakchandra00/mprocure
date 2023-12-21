import { flattenArr, getAllowedRoutes } from "./component/utils/utils";
import React, { Suspense, useCallback } from "react";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import { PageLayout } from './component/utils/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
import { ProfileContent } from "./component/msal/ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from './redux/store/store';
import { getUser } from './redux/store/user/user.action';
import { CircularProgress, Grid } from "@mui/material";
import { SideDrawer } from "./component/custom/navbar/sideDrawer";
import Login from './pages/login';

export default function ClippedDrawer() {

  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useIsAuthenticated();

  const loadUser = useCallback(() => {
    dispatch(getUser());
  }, [dispatch]);

  const getAuth = (state) => state?.eventReducer;
  const { authDetail } = useSelector(getAuth);

  React.useEffect(() => {
    if (Object.keys(authDetail).length > 0) {
      loadUser();
    }
  }, [dispatch, authDetail, loadUser]);

  console.log(authDetail)

  const getUserDetail = (state) => state?.getUser;
  const { userDetail, status, error } = useSelector(getUserDetail);

  console.log(userDetail, status, error)

  return (
    <React.Fragment>
      <>
        <Box sx={{ display: "flex" }}>
          <PageLayout>
            <AuthenticatedTemplate>
              <ProfileContent />
              {status === "loading" && (
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
              {status === "succeeded" && isAuthenticated && (
                <>
                  <SideDrawer />
                  <Box component="main" sx={{ flexGrow: 1 }} style={{ marginTop: "40px" }}>
                    <Routes>
                      {flattenArr(getAllowedRoutes(routes, userDetail?.roleName)).map((route) => {
                        return (
                          <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                          />
                        );
                      })}
                    </Routes>
                  </Box>
                </>
              )}
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Suspense fallback={null}>
                  <Routes>
                    <Route path="*" element={<Login />} />
                  </Routes>
                </Suspense>
              </Box>
            </UnauthenticatedTemplate>
          </PageLayout>
        </Box>
      </>
    </React.Fragment>
  );
}
