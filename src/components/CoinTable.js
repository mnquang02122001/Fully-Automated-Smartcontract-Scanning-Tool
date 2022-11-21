import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MDBIcon } from 'mdb-react-ui-kit';
import TableHeader from './TableHeader';
import TablePaginationCustom from './TablePaginationCustom';
import axios from 'axios';
function createData(
  id,
  name,
  symbol,
  price,
  percent_change_1h,
  percent_change_24h,
  percent_change_7d,
  market_cap,
  volume_24h
) {
  return {
    id,
    name,
    price,
    symbol,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    market_cap,
    volume_24h,
  };
}

const rows = [
  createData(
    1,
    'Bitcoin',
    'BTC',
    20382.13416764692,
    -1.52378653,
    -1.31299634,
    5.32151105,
    391222183839.18866,
    36631176587.557365
  ),
  createData(
    1027,
    'Ethereum',
    'ETH',
    20382.13416764692,
    -1.52378653,
    -1.31299634,
    5.32151105,
    391222183839.18866,
    36631176587.557365
  ),
  createData(
    825,
    'Tether',
    'USDT',
    20382.13416764692,
    -1.52378653,
    -1.31299634,
    5.32151105,
    391222183839.18866,
    36631176587.557365
  ),
  createData(
    1839,
    'BNB',
    'BNB',
    20382.13416764692,
    -1.52378653,
    -1.31299634,
    5.32151105,
    391222183839.18866,
    36631176587.557365
  ),
  createData(
    52,
    'XRP',
    'XRP',
    20382.13416764692,
    -1.52378653,
    -1.31299634,
    5.32151105,
    391222183839.18866,
    36631176587.557365
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function getBeautyNumber(number, decimals = 2) {
  return parseFloat(number.toFixed(decimals)).toLocaleString();
}
export default function CoinTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('price');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  //       {
  //         headers: {
  //           'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <>
      <h1
        style={{ fontSize: '3.5rem', fontWeight: 'bold' }}
        className="my-4"
        id="market-cap"
      >
        Coin market
      </h1>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {/* <TableToolbar /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow tabIndex={-1} key={labelId}>
                        <TableCell align="right">{index + 1}</TableCell>
                        <TableCell align="left">
                          <img
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png`}
                            alt={row.name}
                            className="img-fluid"
                            width="35px"
                          />
                          <span className="ms-2">{`${row.name} (${row.symbol})`}</span>
                        </TableCell>
                        <TableCell align="right">
                          {`$${getBeautyNumber(row.price)}`}
                        </TableCell>
                        <TableCell align="right">
                          {row.percent_change_1h > 0 ? (
                            <span className="text-success">
                              <MDBIcon className="me-1" fas icon="caret-up" />
                              {`${getBeautyNumber(row.percent_change_1h)}%`}
                            </span>
                          ) : (
                            <span className="text-danger">
                              <MDBIcon className="me-1" fas icon="caret-down" />
                              {`${getBeautyNumber(row.percent_change_1h)}%`}
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.percent_change_24h > 0 ? (
                            <span className="text-success">
                              <MDBIcon className="me-1" fas icon="caret-up" />
                              {`${getBeautyNumber(row.percent_change_24h)}%`}
                            </span>
                          ) : (
                            <span className="text-danger">
                              <MDBIcon className="me-1" fas icon="caret-down" />
                              {`${getBeautyNumber(row.percent_change_24h)}%`}
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.percent_change_7d > 0 ? (
                            <span className="text-success">
                              <MDBIcon className="me-1" fas icon="caret-up" />
                              {`${getBeautyNumber(row.percent_change_7d)}%`}
                            </span>
                          ) : (
                            <span className="text-danger">
                              <MDBIcon className="me-1" fas icon="caret-down" />
                              {`${getBeautyNumber(row.percent_change_7d)}%`}
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {`$${getBeautyNumber(row.market_cap, 0)}`}
                        </TableCell>
                        <TableCell align="right">
                          {`$${getBeautyNumber(row.volume_24h, 0)}`}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationCustom}
          />
        </Paper>
      </Box>
    </>
  );
}
