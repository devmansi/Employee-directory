import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NoResult from "./NoResult";

export default function EmployeesTable({ filteredData }) {
  const rows = filteredData;
  
  return (
      <TableContainer component={Paper}>
        <Table
          style={{
            tableLayout: "fixed",
            border: "1px solid #eee",
            borderCollapse: "collapse",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Date of Joining</TableCell>
              <TableCell>Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link to={`./${row.id}`}>{row.id}</Link>
                  </TableCell>
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.date_of_birth}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.salary}</TableCell>
                  <TableCell>{row.date_of_joining}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                </TableRow>
              ))
            ) : (
              <NoResult />
            )}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
