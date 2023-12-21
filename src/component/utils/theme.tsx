import { alpha, createTheme } from "@mui/material";
import { Constants } from "../constants/constants";
import * as React from 'react';
import { lightBlue } from "@mui/material/colors";

// export const mainTheme = (mode, type?) => createTheme({
//     palette: {
//         mode,
//     },
// })

// export const mainTheme = React.useMemo((mode, type?) => createTheme({
//     palette: {
//         mode,
//     },
// }), 
//     [mode]
// );

export const mainTheme = () => createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    // Some CSS
                    // fontSize: '16px',
                },
            },
            variants: [
                {
                    props: { variant: 'subtitle1' },
                    style: {
                        fontSize: '18px',
                        lineHeight: '22px'
                    }
                },
                {
                    props: { variant: 'subtitle2' },
                    style: {
                        fontSize: '13px'
                    }
                }
            ],
        }
    },
    palette: {
        mode: "dark",
        background: {
            default: Constants.DEFAULT_BLACK,
            paper: Constants.DEFAULT_BLACK
        },
        action: {
            active: "#fff",
            hoverOpacity: 0.7,
            focus: "#fff",
            focusOpacity: 1,
            selected: "#fff",
            selectedOpacity: 1,
        },

        // text: {
        //     primary: Constants.DEFAULT_WHITE,
        //   },
        // primary: {
        //     main: alpha(Constants.DEFAULT_BLACK, 1)
        // },
        // success: {
        //     main: alpha(Constants.CARGILL_GREEN_COLOR, 0.7)
        // },
        // warning: {
        //     main: alpha(Constants.CARGILL_YELLOW_COLOR, 0.7),
        // },
        // error: {
        //     main: alpha(Constants.CARGILL_RED_COLOR, 0.7),
        // }
    }
});