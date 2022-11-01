import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
export default function TableToolbar() {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h2"
        className="fw-bold"
        id="tableTitle"
        component="div"
      >
        Coin market cap
      </Typography>
    </Toolbar>
  );
}
