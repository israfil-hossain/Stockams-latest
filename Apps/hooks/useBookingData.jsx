import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "../../api"; // Replace with your actual API import

const useBookingData = (initialFilters = {}, endpoint = "api/SpaceForRent/GetAll") => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 10,
    filters: initialFilters,
  });

  // Build URL with query params
  const buildUrl = (queryParams) => {
    const { page, pageSize, filters } = queryParams;
    const urlParams = new URLSearchParams({
      Page: page,
      PageSize: pageSize,
    });

    // Conditionally add filters to the URL if present
    if (filters.BookingStatus) {
      urlParams.append("BookingStatus", filters.BookingStatus);
    }

    return `${endpoint}?${urlParams.toString()}`;
  };

  // Fetch function with dynamic query params
  const fetchBookingStore = async (queryParams) => {
    try {
      const response = await adminAPI.get(buildUrl(queryParams));
      if (!response) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching booking data:", error);
      throw error;
    }
  };

  // UseQuery from react-query
  const { data: bookingData, isLoading, isError, error, isFetching, refetch, isPlaceholderData } = useQuery({
    queryKey: ["bookingData", queryParams], // Ensure query key contains filters
    queryFn: () => fetchBookingStore(queryParams),
    onError: (error) => {
      console.error("Error fetching booking data:", error);
    },
    keepPreviousData: true, // Optionally keep previous data while fetching new data
  });

  // Function to load the next page
  const loadNextPage = () => {
    if (bookingData?.hasNextPage) {
      setQueryParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
    refetch();
  };

  // Function to load the previous page
  const loadPreviousPage = () => {
    if (bookingData?.hasPreviousPage) {
      setQueryParams((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
    refetch();
  };

  // Function to update filters and reset pagination
  const updateFilters = (newFilters) => {
    setQueryParams((prev) => ({
      page: 1, // Reset to first page when filters are updated
      pageSize: prev.pageSize,
      filters: newFilters,
    }));
    refetch();
  };

  return {
    bookingData: bookingData?.data || [], // Provide data fallback
    isLoading,
    isError,
    error,
    isFetching,
    hasNextPage: bookingData?.hasNextPage,
    hasPreviousPage: bookingData?.hasPreviousPage,
    loadNextPage,
    loadPreviousPage,
    updateFilters,
    refetch, // Expose refetch for manual trigger if necessary
  };
};

export default useBookingData;
