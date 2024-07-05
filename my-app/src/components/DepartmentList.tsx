import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const initialDepartments = [
  {
    department: "customer_service",
    sub_departments: [
      "support",
      "customer_success"
    ]
  },
  {
    department: "design",
    sub_departments: [
      "graphic_design",
      "product_design",
      "web_design"
    ]
  }
];

const DepartmentList: React.FC = () => {
  const [departments] = useState(initialDepartments);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setExpanded((prev) => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelect = (department: string, subDepartments: string[]) => {
    const isSelected = !selected[department];
    const newSelected: { [key: string]: boolean } = { ...selected };

    // Toggle selection for the main department and all sub-departments
    newSelected[department] = isSelected;
    subDepartments.forEach(sub => {
      newSelected[sub] = isSelected;
    });

    setSelected(newSelected);
  };

  const handleSubSelect = (sub: string, mainDepartment: string) => {
    const isSelected = !selected[sub];
    const newSelected: { [key: string]: boolean } = { ...selected, [sub]: isSelected };

    // Check if all sub-departments of the main department are selected
    const mainDept = departments.find(dept => dept.department === mainDepartment);
    if (mainDept) {
      const allSubsSelected = mainDept.sub_departments.every(sub => newSelected[sub]);
      newSelected[mainDepartment] = allSubsSelected;
    }

    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map(dept => (
        <div key={dept.department}>
          <ListItem>
            <Checkbox
              checked={selected[dept.department] || false}
              onChange={() => handleSelect(dept.department, dept.sub_departments)}
            />
            <ListItemText primary={`${dept.department} (${dept.sub_departments.length})`} />
            <IconButton onClick={() => handleToggle(dept.department)}>
              {expanded[dept.department] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          {expanded[dept.department] && (
            <List component="div" disablePadding>
              {dept.sub_departments.map(sub => (
                <ListItem key={sub} style={{ paddingLeft: 32 }}>
                  <Checkbox
                    checked={selected[sub] || false}
                    onChange={() => handleSubSelect(sub, dept.department)}
                  />
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
