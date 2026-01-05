// hooks/admin/usePatients.ts
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useAdminPatients(options: any = {}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: String(options.page || 1),
        limit: String(options.limit || 10),
        ...(options.search && { search: options.search }),
      });

      const response = await fetch(`/api/admin/patients?${params}`);
      
      if (!response.ok) throw new Error('Failed to fetch patients');
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setPagination(result.pagination);
      } else {
        throw new Error(result.error || 'Failed to load patients');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  }, [options.page, options.search]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { data, loading, pagination, refetch: fetchPatients };
}