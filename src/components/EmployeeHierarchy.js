import React from "react";
import TreeView from '@mui/lab/TreeView';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TreeItem from '@mui/lab/TreeItem';

function generateDataForTreeView (parent, data) {
    if (!data[parent] || data[parent].length === 0) { return []; }

    let children = [];

    data[parent].forEach((child) => {
        children.push({
            id: child.id,
            name: child.name,
            children: generateDataForTreeView(child.id, data)
        });
    });

    return children;
};

const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
    </TreeItem>
);

export default function EmployeeHierarchy({ data: employeeData }) {
    /**
     * Formatting data in the form of { parent: [child1, child2] }
     */
    let childEmployees = { root: [] };

    employeeData.forEach((data) => {
        if (data.manager_id === "") {
            childEmployees["root"].push({
                id: data.id,
                name: `${data.first_name} ${data.last_name}`
            });

            return;
        }
 
        !childEmployees[data.manager_id] && (childEmployees[data.manager_id] = []);

        childEmployees[data.manager_id].push({
            id: data.id,
            name: `${data.first_name} ${data.last_name}`
        });
    });

    return (
        <TreeView
            aria-label="rich object"
            defaultExpanded={['root']}
            defaultExpandIcon={
                <AddCircleOutlineIcon
                  sx={{ color: "rgb(12, 160, 169)", fontSize: "2rem" }}
                />
              }
              defaultCollapseIcon={
                <RemoveCircleOutlineIcon
                  sx={{ color: "rgb(12, 160, 180)", fontSize: "2rem" }}
                />
              }
        >
            {renderTree(generateDataForTreeView("root", childEmployees)[0])}
        </TreeView>
    );
}
