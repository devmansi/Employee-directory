import React from "react";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {renderTree(generateDataForTreeView("root", childEmployees)[0])}
        </TreeView>
    );
}
