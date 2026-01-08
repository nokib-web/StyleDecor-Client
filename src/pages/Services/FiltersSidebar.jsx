import React, { useState, useEffect } from "react";
import { FiX, FiDollarSign, FiTrendingUp, FiClock, FiCheck } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FiltersSidebar = ({
  category,
  setCategory,
  sort,
  setSort,
  priceRange,
  setPriceRange,
  onClose,
}) => {
  const axiosSecure = useAxiosSecure();

  // Fetch Categories with counts
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["service-categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services/categories");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const categories = [
    { value: "all", label: "All Categories", count: null },
    ...categoriesData.map(cat => ({
      value: cat.category,
      label: cat.category,
      count: cat.count
    }))
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
    <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-6 h-fit sticky top-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-base-content">Filters</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm lg:hidden"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Active Filters Header */}
      {hasActiveFilters && (
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-base-200">
          <span className="text-sm font-semibold text-primary">Active filters</span>
          <button onClick={clearAllFilters} className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
            Clear all
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-base-content uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <label
              key={cat.value}
              className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all duration-200
                ${category === cat.value
                  ? "bg-primary text-white shadow-md transform scale-[1.02]"
                  : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`}
            >
              <div className="flex items-center gap-3 w-full">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={category === cat.value}
                  onChange={(e) => setCategory(e.target.value)}
                  className="hidden" // Hide default radio
                />
                <span className={`font-medium text-sm ${category === cat.value ? 'text-white' : ''}`}>
                  {cat.label}
                </span>
              </div>

              {/* Count Badge */}
              {cat.count !== null && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${category === cat.value ? 'bg-white/20 text-white' : 'bg-base-200 text-base-content/60 group-hover:bg-base-300'
                  }`}>
                  {cat.count}
                </span>
              )}

              {/* Checkmark for 'All' or if requested */}
              {category === cat.value && cat.count === null && (
                <FiCheck className="w-4 h-4" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-base-content uppercase tracking-wider mb-4">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all duration-200
                ${sort === option.value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-transparent hover:bg-base-200 hover:border-base-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sort === option.value}
                  onChange={(e) => setSort(e.target.value)}
                  className="hidden"
                />
                <div className={`p-1.5 rounded-md ${sort === option.value ? 'bg-primary text-white' : 'bg-base-200 text-base-content/60'}`}>
                  {option.icon}
                </div>
                <span className={`text-sm font-medium ${sort === option.value ? 'text-base-content' : 'text-base-content/70'}`}>
                  {option.label}
                </span>
              </div>

              {sort === option.value && (
                <div className="bg-primary text-white rounded-full p-0.5">
                  <FiCheck className="w-3 h-3" />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-bold text-base-content uppercase tracking-wider">Price Range</h3>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              className="input input-bordered input-sm w-full pl-7 focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              className="input input-bordered input-sm w-full pl-7 focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {(priceRange.min || priceRange.max) && (
          <div className="flex justify-between items-center bg-base-200 p-2 rounded-lg border border-base-300">
            <span className="text-xs font-medium text-base-content/70">
              Selected: <span className="text-primary font-bold">${priceRange.min || 0} – ${priceRange.max || "Any"}</span>
            </span>
            <button
              onClick={() => setPriceRange({ min: "", max: "" })}
              className="text-xs text-red-500 hover:underline font-medium"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSidebar;
