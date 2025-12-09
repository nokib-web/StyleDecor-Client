import React from "react";
import { FiX, FiDollarSign, FiTrendingUp, FiClock } from "react-icons/fi";

const FiltersSidebar = ({
  category,
  setCategory,
  sort,
  setSort,
  priceRange,
  setPriceRange,
  onClose,
}) => {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "design", label: "Interior Design" },
    { value: "renovation", label: "Home Renovation" },
    { value: "furniture", label: "Furniture Setup" },
    { value: "lighting", label: "Lighting Decoration" },
    { value: "painting", label: "Painting" },
  ];

  const sortOptions = [
    { value: "", label: "Default Order", icon: <FiTrendingUp className="w-4 h-4" /> },
    { value: "price-asc", label: "Price: Low to High", icon: <FiDollarSign className="w-4 h-4" /> },
    { value: "price-desc", label: "Price: High to Low", icon: <FiDollarSign className="w-4 h-4" /> },
    { value: "newest", label: "Newest First", icon: <FiClock className="w-4 h-4" /> },
  ];

  const hasActiveFilters =
    category !== "all" || sort !== "" || priceRange.min || priceRange.max;

  const clearAllFilters = () => {
    setCategory("all");
    setSort("");
    setPriceRange({ min: "", max: "" });
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value === "" ? "" : Math.max(0, Number(value)),
    }));
  };

  return (
    <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6 h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle lg:hidden"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <span className="text-sm font-medium text-primary">Active filters</span>
          <button onClick={clearAllFilters} className="text-sm text-error hover:underline">
            Clear all
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label
              key={cat.value}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                ${
                  category === cat.value
                    ? "bg-primary/10 border border-primary shadow-sm"
                    : "hover:bg-base-200 border border-transparent"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={category === cat.value}
                  onChange={(e) => setCategory(e.target.value)}
                  className="radio radio-primary radio-sm"
                />
                <span className="font-medium text-gray-700">{cat.label}</span>
              </div>
              {category === cat.value && (
                <span className="badge badge-primary badge-sm">Selected</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-4">Sort By</h3>
        <div className="space-y-3">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                ${
                  sort === option.value
                    ? "bg-primary/10 border border-primary shadow-sm"
                    : "hover:bg-base-200 border border-transparent"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sort === option.value}
                  onChange={(e) => setSort(e.target.value)}
                  className="radio radio-primary radio-sm"
                />
                <span className="flex items-center gap-2 text-gray-700">
                  {option.icon}
                  <span className="font-medium">{option.label}</span>
                </span>
              </div>
              {sort === option.value && (
                <span className="badge badge-primary badge-sm">Active</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FiDollarSign className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-700">Price Range</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className="input input-bordered input-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className="input input-bordered input-sm"
          />
        </div>

        {(priceRange.min || priceRange.max) && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-primary">
              ${priceRange.min || 0} – ${priceRange.max || "Any"}
            </span>
            <button
              onClick={() => setPriceRange({ min: "", max: "" })}
              className="text-xs text-error hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSidebar;
