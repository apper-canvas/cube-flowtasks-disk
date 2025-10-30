import React from "react";
import FilterTabs from "@/components/molecules/FilterTabs";
import SortSelect from "@/components/molecules/SortSelect";
import SearchBar from "@/components/molecules/SearchBar";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { useCategories } from "@/hooks/useCategories";

const FilterBar = ({ 
  filters, 
  onUpdateFilter, 
  taskStats,
  onClearSearch 
}) => {
  const { categories } = useCategories();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      {/* Filter Tabs */}
      <div className="mb-6">
        <FilterTabs
          activeFilter={filters.status}
          onFilterChange={onUpdateFilter}
          taskStats={taskStats}
        />
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchBar
          value={filters.searchQuery}
          onChange={(value) => onUpdateFilter("searchQuery", value)}
          onClear={onClearSearch}
          placeholder="Search tasks..."
          className="md:col-span-2"
        />
        
        <SortSelect
          sortBy={filters.sortBy}
          onSortChange={onUpdateFilter}
        />
      </div>

      {/* Category Filter */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <ApperIcon name="Tag" size={16} className="text-gray-400" />
          <Select
            value={filters.selectedCategory || ""}
            onChange={(e) => onUpdateFilter("selectedCategory", e.target.value || null)}
            className="w-48"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;