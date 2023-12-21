import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { Select } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            maxWidth: 270,
            zIndex: 999,
        },
    },
};
export default function Dropdown(props) {
    return (
        <>
            <FormControl sx={{ width: props?.width }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    SelectDisplayProps={{ style: { padding: "2px 10px", fontSize: "13px" } }}
                    id="demo-simple-select-standard"
                    value={props?.value}
                    defaultValue={props?.value}
                    onChange={props?.handleChange}
                    MenuProps={MenuProps}
                    displayEmpty
                >
                    {props?.defaultValue &&
                        <MenuItem className={"menuItem"} value={""}>
                            <ListItemText primary={props?.defaultValue} />
                        </MenuItem>
                    }
                    {props?.name.map((name) => (
                        <MenuItem className={"menuItem"} key={name} value={name}>
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}