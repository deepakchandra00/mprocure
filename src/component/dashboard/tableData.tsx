import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TableData() {
  return (
    <div>
      <TableContainer style={{ padding: "5px" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <Table aria-label="simple table" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableHead>
            <TableRow>
              <TableCell>Criteria/Category/Area</TableCell>
              <TableCell align="right">Domain</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Updated on</TableCell>
              <TableCell align="right">Recommendation</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {SampleData.map((row) => (
            <>
              <TableRow sx={{ boxShadow: 3, '&:last-child td, &:last-child th': { border: 0 } }}
                key={row.criteria}
                style={{ padding: "30px" }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant='h6'><strong> {row.criteria} </strong></Typography>
                  <Typography variant="caption"> {row.category}</Typography>
                </TableCell>
                <TableCell align="right">{row.domain}</TableCell>
                <TableCell align="right">{row.score < 3 ? <TrendingDown /> : <TrendingUp />} {row.score}</TableCell>
                <TableCell align="right">{row.updateon}</TableCell>
                <TableCell align="right"><Tooltip title={row.recommendation}>
                  {row.recommendation && row.recommendation.length > 1 ? <AddComment /> : <Chat />}
                </Tooltip></TableCell>
                <TableCell align="right">{row.status ? <HourglassEmptyOutlined /> : <HourglassFull />} </TableCell>
                <TableCell align="right"><Edit /></TableCell>
              </TableRow>
              <br />
            </>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
