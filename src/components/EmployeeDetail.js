import React from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NoResult from "./NoResult";

export default function EmployeeDetails({ data }) {
  const { id } = useParams();
  const [state, setState] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const employee = data.find((item) => item.id === id);

    if (!employee.details) {
      setIsLoading(false);
      return;
    }

    function reqListener() {
      const employeeDetail = JSON.parse(this.responseText)[0];
      setIsLoading(false);
      setState([
        ["First Name", employeeDetail.first_name],
        ["Last Name", employeeDetail.last_name],
        ["Date Of Birth", employeeDetail.date_of_birth],
        ["Address", employeeDetail.address],
        ["Date Of Joining", employeeDetail.date_of_joining],
        ["Salary", employeeDetail.salary],
        ["Designation", employeeDetail.designation],
      ]);
    }

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", employee.details);
    req.send();
  }, [id, data]);

  return (
    <TableContainer
      component={Paper}
      style={{ width: "50%", margin: "4.8rem auto" }}
    >
      <Table
        style={{
          tableLayout: "fixed",
          border: "1px solid #eee",
          borderCollapse: "collapse",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            state.length > 0 ? (
              state.map((detail) => {
                return (
                  <TableRow key={detail[0]}>
                    <TableCell>{detail[0]}</TableCell>
                    <TableCell>{detail[1]}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <NoResult />
            )
          ) : (
            <TableRow>
              <TableCell colSpan={2} align="center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
