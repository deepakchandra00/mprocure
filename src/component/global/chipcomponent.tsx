import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CheckBox, Edit } from '@mui/icons-material';


export default function CustomDeleteIconChips() {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const style = {
        boxShadow: 'none', 
        "& .MuiChip-root": {
            borderRadius: 0
          }
    }

    return (
        <Stack direction="row" spacing={1} sx={style}>
            <Chip
                icon={<CheckBox />}
                label="Custom delete icon"
                onDelete={handleDelete}
                deleteIcon={<Edit />}
            />
        </Stack>
    );
}
