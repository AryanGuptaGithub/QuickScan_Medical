// hooks/admin/useLabs.ts
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useAdminLabs(options: any = {}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchLabs = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: String(options.page || 1),
        limit: String(options.limit || 10),
        ...(options.search && { search: options.search }),
        ...(options.city && { city: options.city }),
      });

      const response = await fetch(`/api/admin/labs?${params}`);
      
      if (!response.ok) throw new Error('Failed to fetch labs');
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setPagination(result.pagination);
      } else {
        throw new Error(result.error || 'Failed to load labs');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load labs');
    } finally {
      setLoading(false);
    }
  }, [options.page, options.search, options.city]);

  useEffect(() => {
    fetchLabs();
  }, [fetchLabs]);

  return { data, loading, pagination, refetch: fetchLabs };
}