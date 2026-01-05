// hooks/admin/useServices.ts
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useAdminServices(options: any = {}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: String(options.page || 1),
        limit: String(options.limit || 10),
        ...(options.search && { search: options.search }),
        ...(options.category && { category: options.category }),
      });

      const response = await fetch(`/api/admin/services?${params}`);
      
      if (!response.ok) throw new Error('Failed to fetch services');
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setPagination(result.pagination);
      } else {
        throw new Error(result.error || 'Failed to load services');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  }, [options.page, options.search, options.category]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { data, loading, pagination, refetch: fetchServices };
}