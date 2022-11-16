import React from "react";

export default function Input({ setFilteredItem }) {
  const [string, setString] = React.useState("");

  function handleSearch(e) {
    setString(e.target.value);
    setFilteredItem(e.target.value);
  }
  return (
    <>
      <div className="input-box">
        <input
          type="text"
          className="input"
          onChange={handleSearch}
          value={string}
        />
      </div>
    </>
  );
}
