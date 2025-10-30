import React from "react";
import Select from "@/components/atoms/Select";

const SortSelect = ({ sortBy, onSortChange, className }) => {
  const sortOptions = [
    { value: "priority", label: "Priority" },
    { value: "dueDate", label: "Due Date" },
    { value: "createdAt", label: "Created Date" }
  ];

  return (
    <Select
      value={sortBy}
      onChange={(e) => onSortChange("sortBy", e.target.value)}
      className={className}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          Sort by {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SortSelect;