import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Input from "./components/Input";
import NavBar from "./components/NavBar";
import EmployeesTable from "./components/EmployeeTable";
import EmployeeDetails from "./components/EmployeeDetail";
import EmployeeHierarchy from "./components/EmployeeHierarchy";
import Filter from "./components/Filter";

export default function App () {
  const [filteredItem, setFilteredItem] = React.useState('');
  const [data, setData] = React.useState([]);
  const [filteringSubject, setFilteringSubject] = React.useState({
    Address: [],
    Designation: [],
  });

  let filteredData = [...data];

  filteredDataFunc();

  /**
   * Filtering using filters.
   */
  function filteredDataFunc() {
    for (const [key, value] of Object.entries(filteringSubject)) {
      if (value.length === 0) {
        continue;
      } else {
        filteredData = filteredData.filter((item) => {
          return value.includes(item[key.toLowerCase()]);
        });
      }
    }
  }

  /**
   * Further filtering using typed string.
   */
  filteredData = filteredData.filter((item) => {
    return (
      item.first_name.includes(filteredItem) ||
      item.first_name.toLowerCase().includes(filteredItem) ||
      item.last_name.toLowerCase().includes(filteredItem) ||
      item.last_name.includes(filteredItem)
    );
  });

  React.useEffect(() => {
    function reqListener() {
      setData(JSON.parse(this.responseText));
    }

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open(
      "GET",
      " https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees"
    );
    req.send();
  }, []);

  return (
    <>
      <NavBar/>
      <Routes>
        <Route
          path="/employees"
          element={
            <>
              <h1>Employee Table</h1>
              <main>
                <Input setFilteredItem={setFilteredItem} />
                <div className="table-container">
                  <Filter data={data} setFilteringSubject={setFilteringSubject} />
                  <EmployeesTable
                    filteredData={filteredData}
                  />
                </div>
              </main>
            </>
          }
        />
        <Route
          path="/employees/:id"
          element={data.length > 0 && (
            <>
              <h1>Employee Details</h1>
              <main>
                <EmployeeDetails data={data} />
              </main>
            </>
          )
        }
        />
        <Route
          path="/employees-hierarchy"
          element={data.length > 0 && (
            <>
            <h1>Employee Hierarchy</h1>
            <main>
              <EmployeeHierarchy data={data} />
            </main>
          </>
          )}
        />        
        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Routes>
    </>
  );
}
