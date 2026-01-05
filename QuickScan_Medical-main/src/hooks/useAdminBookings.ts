// hooks/useAdminBookings.ts
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface UseBookingsOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function useAdminBookings(options: UseBookingsOptions = {}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: String(options.page || 1),
        limit: String(options.limit || 10),
        ...(options.search && { search: options.search }),
        ...(options.status && { status: options.status }),
        ...(options.dateFrom && { dateFrom: options.dateFrom }),
        ...(options.dateTo && { dateTo: options.dateTo }),
      });

      const response = await fetch(`/api/admin/bookings?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setPagination(result.pagination);
      } else {
        throw new Error(result.error || 'Failed to load bookings');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [options.page, options.search, options.status, options.dateFrom, options.dateTo]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { 
    data, 
    loading, 
    error, 
    pagination, 
    refetch: fetchBookings,
    setPage: (page: number) => {}, // You can implement this
  };
}