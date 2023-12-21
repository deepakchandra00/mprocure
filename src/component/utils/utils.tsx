import { intersection } from "lodash";
import { CircularProgress, Grid } from "@mui/material";
import Snackbars from "../global/snackbars";

export function hasChildren(item: any) {
  const { children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children?.length === 0) {
    return false;
  }

  return true;
}

export const flattenArr = (arr) => {
  const result: any[] = [];
  arr.forEach((item) => {
    const { path, component, children } = item;
    result.push({ path, component });
    if (children) result.push(...flattenArr(children));
  });
  return result;
};

function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}

export function getAllowedRoutes(routes, roles) {
  return routes.filter(({ permission }) => {
    if (!permission) return true;
    else if (!isArrayWithLength(permission)) return true;
    else return intersection(permission, roles.split()).length;
  });
}

export const getColor = (score) => {
  let color = "";
  switch(score) {
    case "-1":
    case "-2":
      color = "#000";
      break;
    case "1":
      color = "#BC080D";
      break;
    case "2":
      color = "#FFB100";
      break;
    default:
      color = "#007582";
    
  }
  // score === "-1" || score === "-2" ? color = "#000" : score === "1" ? color = "#BC080D" : score === "2" ? color = "#FFB100" : color = "#007582"
  return color;
};


export function showSnackBar(
  props,
  message: string,
  duration: number,
  variant: "error" | "warning" | "info" | "success"
) {
  props?.setSnack(true);
  props?.message(message);
  props?.setDuration(duration);
  props?.setVariant(variant);
}

export function loadingError(status, error, setSnack) {
  if (status === "loading") {
    return (
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
    );
  }
  if (status === "failed") {
    return (
      <>
        <Snackbars
          setSnack={setSnack}
          message={error?.message}
          duration={9000}
          variant={"error"}
        />
      </>
    );
  }
}
