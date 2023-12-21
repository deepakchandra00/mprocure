import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Tooltip } from '@mui/material';
import { BusinessCenter, CircleNotificationsRounded, Comment, MyLocation } from '@mui/icons-material';

export default function Title(props) {
  return (
    <>
      <Grid direction="row" container boxShadow={5} style={{ position: "relative" }} justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid direction="row" alignItems="center" container justifyContent="space-between"  >
            <div>
              <Typography variant="h4" className='title'>{props.title}</Typography>
            </div>
            {props?.icon &&
              <div style={{ paddingTop: "32px", paddingLeft: "20px" }}>
                <Tooltip title="High" placement="top-start" arrow>
                  <CircleNotificationsRounded style={{ color: "#FD8900" }} />
                </Tooltip> &nbsp;
                <Tooltip title={
                  <>
                    <Typography variant="h5"> Business Unit </Typography>
                    Cargill B.V., Evert van de Beekstraat 378, 1118 CZ Schiphol, The Netherlands" placement="top-start" arrow
                  </>
                } >
                  <MyLocation style={{ color: "#007582" }} />
                </Tooltip>&nbsp;
                <Tooltip title={
                  <>
                    <Typography variant="h5"> Location </Typography>
                    FIBI (enterprise) CCC-Europe
                  </>
                } >
                  <BusinessCenter style={{ color: "#007582" }} />
                </Tooltip>&nbsp;
                <Tooltip title="High" placement="top-start" arrow>
                  <Comment style={{ color: "#007582" }} />
                </Tooltip>
              </div>
            }
          </Grid>
        </Grid>
        <Grid>
          {props.children}
        </Grid>
      </Grid>
    </>
  )
}
