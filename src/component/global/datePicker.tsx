import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Typography } from '@mui/material';

export default function DatePickers(props) {

  return (
    <>
      <Grid container justifyContent="end">
        <Grid item xs={6}>
          <DatePicker
            selected={props.startDate}
            onChange={(date) => props.setStartDate(date)}
            selectsStart
            startDate={props.startDate}
            endDate={props.endDate}
          />
          {props.startErr && (
            <Typography className='error'>
              {props.startErr}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            selected={props.endDate}
            onChange={(date) => props.setEndDate(date)}
            selectsEnd
            startDate={props.startDate}
            endDate={props.endDate}
            minDate={props.startDate}
          />
          {props.endErr && (
            <Typography className='error'>
              {props.endErr}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}
