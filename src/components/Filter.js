import React from "react";
import FilterItem from "./FilterItem";

export default function Filter({ data, setFilteringSubject }) {
  let addressArray = [];
  let designationArray = [];

  data.forEach((item) => {
    if (item.address) {
      addressArray.push(item.address);
    }
    if (item.designation) {
      designationArray.push(item.designation);
    }
  });

  addressArray = [...new Set(addressArray)];
  designationArray = [...new Set(designationArray)];

  let filteringArray = [
    ["Address", [...addressArray]],
    ["Designation", [...designationArray]],
  ];

  function add(name) {
    filteringArray.forEach((itemArray) => {
      if (!itemArray[1].includes(name)) {
        return;
      }

      let typeName = itemArray[0];
      setFilteringSubject((prev) => {
        return {
          ...prev,
          [typeName]: [...prev[typeName], name],
        };
      });
    });
  }

  function remove(name) {
    filteringArray.forEach((itemArray) => {
      if (!itemArray[1].includes(name)) {
        return;
      }

      let typeName = itemArray[0];
      setFilteringSubject((prev) => {
        let newThing = prev[itemArray[0]].filter((item) => item !== name);
        return {
          ...prev,
          [typeName]: [...newThing],
        };
      });
    });
  }

  return (
    <div className="filter">
      {filteringArray.map((itemArray) => {
        return (
          <div key={itemArray[0]}>
            <h2>{itemArray[0]}</h2>
            <ul>
              {itemArray[1].map((item) => {
                return (
                  <FilterItem
                    name={item}
                    key={item}
                    add={add}
                    remove={remove}
                  />
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
