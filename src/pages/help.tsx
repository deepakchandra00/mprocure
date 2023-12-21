import TableData from '../component/dashboard/tableData'
import Dropdown from '../component/global/dropdown';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Title from '../component/global/title/title';

export default function help() {
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  return (
    <>
    <Title />
      <div style={{backgroundColor:"#f4f4f4", padding:"15px"}}>
      <Grid direction="row" container justifyContent="space-between" >
        <Grid item>
          <Typography variant="h4">Site</Typography>
        </Grid>
        <Grid>
          <Stack spacing={2} direction="row">
            <Dropdown name={names} />
            <Button variant="contained">Address</Button>
            <Button variant="contained">Critical</Button>
          </Stack>
        </Grid>
      </Grid>
      <TableData />
      </div>
    </>
  )
}
