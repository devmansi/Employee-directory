import React from "react";

export default function FilterItem({ name, add, remove }) {
  function handleChange(e) {
    if (e.target.checked) {
      add(e.target.value);
    }

    if (!e.target.checked) {
      remove(e.target.value);
    }
  }

  return (
    <div className="filterItem">
      <input type="checkbox" value={name} onChange={handleChange} />
      <p>{name}</p>
    </div>
  );
}
