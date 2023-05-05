import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import TablePaginationCustom from "./TablePaginationCustom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyToast from "./MyToast";
const headCells = [
    {
        id: "platform",
        numeric: false,
        disablePadding: false,
        label: "Platform",
    },
    {
        id: "address",
        numeric: false,
        disablePadding: false,
        label: "Address",
    },
    {
        id: "time",
        numeric: false,
        disablePadding: false,
        label: "Scan time",
    },
    {
        id: "findings",
        numeric: false,
        disablePadding: false,
        label: "Findings",
    },
];

function EnhancedTableHead() {
    return (
        <TableHead className="bg-light">
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function ContractTable() {
    const [showToast, setShowToast] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "right",
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [rows, setRows] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(() => {
        const getContracts = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/contract/public/:page/:size`
                );
                setRows(res.data?.data.results);
            } catch (err) {
                console.log(err);
            }
        };
        getContracts();
    }, []);
    const handleShowToast = (newShowToast) => {
        setShowToast({ open: true, ...newShowToast });
    };
    const handleCloseToast = () => {
        setShowToast({ ...showToast, open: false });
    };
    const handleClick = async (event, id) => {
        const contract = rows.find((contract) => contract.id === id);
        try {
            const scan = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/contract/${contract.platform.id}/${contract.address}`
            );

            const vul = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/contract/${contract.platform.id}/${contract.address}/vulnerability/:page/:size`
            );
            if (
                scan.data.data &&
                scan.data.data.scan.status.toLowerCase() === "completed"
            ) {
                localStorage.setItem(
                    "scan_summary",
                    JSON.stringify(scan.data.data)
                );
                localStorage.setItem(
                    "vul_summary",
                    JSON.stringify(vul.data.data)
                );
                navigate("/scan-result");
            } else {
                handleShowToast({ vertical: "top", horizontal: "right" });
                localStorage.removeItem("scan_summary");
                localStorage.removeItem("vul_summary");
            }
        } catch (err) {
            handleShowToast({ vertical: "top", horizontal: "right" });
            localStorage.removeItem("scan_summary");
            localStorage.removeItem("vul_summary");
            console.log(err);
        }
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
                style={{ fontSize: "3.5rem", fontWeight: "bold" }}
                className="my-4"
                id="market-cap"
            >
                Latest Scan
            </h1>
            <Box sx={{ width: "100%" }} className="mb-5">
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >
                            <EnhancedTableHead rowCount={rows.length} />
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                      )
                                    : rows
                                ).map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, row?.id)
                                            }
                                            tabIndex={-1}
                                            key={row?.id}
                                        >
                                            <TableCell align="left">
                                                {row?.platform.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row?.address}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row?.latest_scan_time.substring(
                                                    0,
                                                    10
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                className="d-flex flex-row gap-1"
                                            >
                                                {row?.vuln_overview.critical >
                                                    0 && (
                                                    <div
                                                        className="py-1 px-2 text-white font-bold rounded-2"
                                                        style={{
                                                            backgroundColor:
                                                                "#550808",
                                                        }}
                                                    >
                                                        {
                                                            row?.vuln_overview
                                                                .critical
                                                        }
                                                    </div>
                                                )}
                                                {row?.vuln_overview.high >
                                                    0 && (
                                                    <div
                                                        className="py-1 px-2 text-white font-bold rounded-2"
                                                        style={{
                                                            backgroundColor:
                                                                "#ec672c",
                                                        }}
                                                    >
                                                        {
                                                            row?.vuln_overview
                                                                .high
                                                        }
                                                    </div>
                                                )}
                                                {row?.vuln_overview.medium >
                                                    0 && (
                                                    <div
                                                        className="py-1 px-2 text-white font-bold rounded-2"
                                                        style={{
                                                            backgroundColor:
                                                                "#add832",
                                                        }}
                                                    >
                                                        {
                                                            row?.vuln_overview
                                                                .medium
                                                        }
                                                    </div>
                                                )}
                                                {row?.vuln_overview.low > 0 && (
                                                    <div
                                                        className="py-1 px-2 text-white font-bold rounded-2"
                                                        style={{
                                                            backgroundColor:
                                                                "#68c88e",
                                                        }}
                                                    >
                                                        {row?.vuln_overview.low}
                                                    </div>
                                                )}
                                                {row?.vuln_overview
                                                    .information > 0 && (
                                                    <div
                                                        className="py-1 px-2 text-white font-bold rounded-2"
                                                        style={{
                                                            backgroundColor:
                                                                "#b9c9dc",
                                                        }}
                                                    >
                                                        {
                                                            row?.vuln_overview
                                                                .information
                                                        }
                                                    </div>
                                                )}
                                                {/* {row?.vuln_overview.critical} */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {rows.length === 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="text-muted fs-4">
                                                    No data
                                                </span>
                                            </div>
                                        </TableCell>
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
            <MyToast
                {...showToast}
                handleClose={handleCloseToast}
                message="Scan is not completed yet!"
                severity="error"
            />
        </>
    );
}
