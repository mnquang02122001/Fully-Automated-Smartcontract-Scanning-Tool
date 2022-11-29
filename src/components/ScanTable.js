import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationCustom from './TablePaginationCustom';
import { useNavigate } from 'react-router-dom';
import vul_details from '../fakedata/vul_details.json';
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'severity',
    numeric: false,
    disablePadding: false,
    label: 'Severity',
  },
  {
    id: 'location',
    numeric: false,
    disablePadding: false,
    label: 'Location',
  },
];

function EnhancedTableHead() {
  return (
    <TableHead className="bg-light">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ScanTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const vul_summary = JSON.parse(localStorage.getItem('vul_summary')) || [];
  const [rows, setRows] = React.useState([...vul_summary]);
  const navigate = useNavigate();
  const handleClick = (event, id) => {
    //call API
    console.log(id);
    localStorage.setItem('vul_details', JSON.stringify(vul_details));
    navigate('detail');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }} className="mb-5">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            id="scan-table"
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead rowCount={rows.length} />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      <div className="d-flex align-items-center">
                        {row.severity === 'critical' ? (
                          <span
                            className="square rounded-pill me-3"
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#550808',
                            }}
                          ></span>
                        ) : row.severity === 'high' ? (
                          <span
                            className="square rounded-pill me-3"
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#ec672c',
                            }}
                          ></span>
                        ) : row.severity === 'medium' ? (
                          <span
                            className="square rounded-pill me-3"
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#add832',
                            }}
                          ></span>
                        ) : row.severity === 'low' ? (
                          <span
                            className="square rounded-pill me-3"
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#68c88e',
                            }}
                          ></span>
                        ) : (
                          <span
                            className="square rounded-pill me-3"
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#b9c9dc',
                            }}
                          ></span>
                        )}
                        <span className="text-capitalize">{row.severity}</span>
                      </div>
                    </TableCell>
                    <TableCell align="left">{row.location}</TableCell>
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationCustom}
        />
      </Paper>
    </Box>
  );
}
