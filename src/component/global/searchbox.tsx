import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBox(props) {
    return (
        <Paper
            component="form"
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type Keyword To Search"
                inputProps={{ 'aria-label': "Type Keyword To Search" }}
                onChange={props?.handleChange}
                value={props?.value}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
