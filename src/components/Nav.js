import React from "react";

export default function Nav({ data }) {
  const b = [];
  data.map((item) => {
    b.push([item.id, item.manager_id]);
  });

  const c = {};

  b.map((item) => {
    if (item[1] && c[item[1]]) {
      c[item[1]].push(item[0]);
    }
    if (item[1] && !c[item[1]]) {
      c[item[1]] = [item[0]];
    }
    if (!item[1]) {
      c[item[0]] = [];
    }
  });

  let g = [];

  for (const [k, v] of Object.entries(c)) {
    g.push(
      <>
        <h2>{k}</h2>
        {v.map((item) => {
          return <li>{item}</li>;
        })}
      </>
    );
  }

  return <div>{g}</div>;
}
