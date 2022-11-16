import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Input from "./components/Input";
import EmployeesTable from "./components/EmployeeTable";
import EmployeeDetails from "./components/EmployeeDetail";
import Filter from "./components/Filter";

export default function App() {
  const [filteredItem, setFilteredItem] = React.useState();
  const [data, setData] = React.useState([]);
  const [filteringSubject, setFilteringSubject] = React.useState({
    Address: [],
    Designation: [],
  });

  let filteredItemData = data.filter((item) => {
    return (
      item.first_name.includes(filteredItem) ||
      item.first_name.toLowerCase().includes(filteredItem) ||
      item.last_name.toLowerCase().includes(filteredItem) ||
      item.last_name.includes(filteredItem)
    );
  });

  let filteredData = [...data];

  filteredDataFunc();

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
      <Routes>
        <Route
          path="/employees"
          element={
            <>
              <Input setFilteredItem={setFilteredItem} />
              <div className="container">
                <Filter data={data} setFilteringSubject={setFilteringSubject} />
                <EmployeesTable
                  filteredItemData={filteredItemData}
                  filteredData={filteredData}
                />
              </div>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/employees" replace />} />
        <Route
          path="/employees/:id"
          element={data.length > 0 && <EmployeeDetails data={filteredData} />}
        />
      </Routes>
    </>
  );
}
