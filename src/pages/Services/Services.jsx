import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { Link } from "react-router";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import FiltersSidebar from "./FiltersSidebar";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";

const Services = () => {
  const axiosSecure = useAxiosSecure();

  // STATES
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for backend
  const itemsPerPage = 12;

  const [priceRange, setPriceRange] = useState({
    min: "",
    max: ""
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);

  const toggleCompare = (service) => {
    const exists = selectedForComparison.find(s => s._id === service._id);
    if (exists) {
      setSelectedForComparison(prev => prev.filter(s => s._id !== service._id));
    } else {
      if (selectedForComparison.length >= 3) {
        Swal.fire({
          icon: 'warning',
          title: 'Limit Reached',
          text: 'You can compare up to 3 services at a time.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }
      setSelectedForComparison(prev => [...prev, service]);
    }
  };

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // QUERY
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "services",
      debouncedSearch,
      category,
      sort,
      priceRange.min,
      priceRange.max,
      currentPage // Add currentPage to queryKey
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/services?search=${debouncedSearch}&category=${category}&sort=${sort}&min=${priceRange.min}&max=${priceRange.max}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data; // Return the whole response object to access 'total'
    },
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  const services = data?.data || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch, category, sort, priceRange]);

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Find Your Service
          </h1>
          <p className="text-gray-600 mt-2">
            Browse from {isLoading ? "..." : totalItems} available services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* =============== DESKTOP SIDEBAR =============== */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <FiltersSidebar
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </aside>

          {/* =============== MAIN CONTENT =============== */}
          <main className="lg:col-span-3 space-y-8">

            {/* Search + Mobile Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-12 pr-4 py-3"
                  placeholder="Search services..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <button
                onClick={toggleSidebar}
                className="btn btn-outline btn-primary flex items-center gap-2 sm:hidden"
              >
                <FiFilter className="w-5 h-5" />
                Filters
                {(category !== "all" || sort || priceRange.min || priceRange.max) && (
                  <span className="badge badge-sm badge-primary">Active</span>
                )}
              </button>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {isLoading ? "Loading..." : `${totalItems} services found`}
              </p>
            </div>

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-red-800 mb-3">Error</h3>
                <p className="text-red-600 mb-4">{error?.message}</p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && services.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No services found
                </h3>
                <p className="text-gray-600">
                  Adjust your search or filters.
                </p>
              </div>
            )}

            {/* Grid */}
            {!isLoading && services.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service._id}
                      service={service}
                      onToggleCompare={toggleCompare}
                      isSelected={selectedForComparison.some(s => s._id === service._id)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-12">
                  <div className="join">
                    <button
                      className="join-item btn"
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                    >
                      «
                    </button>

                    {/* 
                         Simple Array.from map might be too many buttons if many pages. 
                         For now, displaying all page numbers as requested or simple list.
                         Since we want 12 items/page, assuming reasonable total count.
                     */}
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`join-item btn ${currentPage === index ? "btn-active" : ""}`}
                        onClick={() => setCurrentPage(index)}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      className="join-item btn"
                      disabled={currentPage >= totalPages - 1}
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                    >
                      »
                    </button>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* =============== MOBILE SIDEBAR =============== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity ${isSidebarOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />

        {/* Drawer */}
        <div
          className={`absolute inset-y-0 left-0 w-80 bg-base-100 shadow-2xl transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={toggleSidebar} className="btn btn-ghost btn-circle">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar actual content */}
          <div className="p-6 overflow-y-auto h-full pb-32">
            <FiltersSidebar
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onClose={toggleSidebar}
            />
          </div>
        </div>
      </div>

      {/* =============== COMPARISON FLOATING BAR =============== */}
      {
        selectedForComparison.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 animate-slide-up transition-transform duration-300">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

              <div className="flex items-center gap-4 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
                <span className="font-bold text-gray-700 whitespace-nowrap hidden sm:block">Compare ({selectedForComparison.length}/3):</span>
                {selectedForComparison.map(service => (
                  <div key={service._id} className="relative group shrink-0">
                    <img src={service.image} alt={service.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    <button
                      onClick={() => toggleCompare(service)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedForComparison([])}
                  className="btn btn-ghost btn-sm text-gray-500"
                >
                  Clear All
                </button>
                <button
                  onClick={() => document.getElementById('comparison_modal').showModal()}
                  className="btn btn-primary btn-sm px-6"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* =============== COMPARISON MODAL =============== */}
      <dialog id="comparison_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-2xl mb-6 text-center">Service Comparison</h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              <thead>
                <tr>
                  <th className="text-left w-32">Feature</th>
                  {selectedForComparison.map(service => (
                    <th key={service._id} className="min-w-[200px] text-lg text-primary">{service.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Image Row */}
                <tr>
                  <td className="font-bold text-left">Preview</td>
                  {selectedForComparison.map(service => (
                    <td key={service._id}>
                      <img src={service.image} alt={service.title} className="w-32 h-20 object-cover rounded mx-auto" />
                    </td>
                  ))}
                </tr>

                {/* Price Row */}
                <tr>
                  <td className="font-bold text-left">Price</td>
                  {selectedForComparison.map(service => (
                    <td key={service._id} className="font-semibold text-gray-700">${service.price}</td>
                  ))}
                </tr>

                {/* Delivery Time */}
                <tr>
                  <td className="font-bold text-left">Duration</td>
                  {selectedForComparison.map(service => (
                    <td key={service._id}>{service.deliveryTime} Days</td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="font-bold text-left">Rating</td>
                  {selectedForComparison.map(service => (
                    <td key={service._id}>⭐ {service.rating || 'N/A'}</td>
                  ))}
                </tr>

                {/* Provider */}
                <tr>
                  <td className="font-bold text-left">Provider</td>
                  {selectedForComparison.map(service => (
                    <td key={service._id}>{service.serviceProvider}</td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="font-bold text-left">Action</td>
                  {selectedForComparison.map(service => (
                    <td key={service._id}>
                      <Link to={`/services/${service._id}`} className="btn btn-sm btn-outline btn-primary">View Details</Link>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

    </div >
  );
};

export default Services;
