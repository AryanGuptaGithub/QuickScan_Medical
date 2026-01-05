// hooks/admin/usePayments.ts
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useAdminPayments(options: any = {}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: String(options.page || 1),
        limit: String(options.limit || 10),
        ...(options.search && { search: options.search }),
        ...(options.status && { status: options.status }),
        ...(options.method && { method: options.method }),
      });

      const response = await fetch(`/api/admin/payments?${params}`);
      
      if (!response.ok) throw new Error('Failed to fetch payments');
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setPagination(result.pagination);
      } else {
        throw new Error(result.error || 'Failed to load payments');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  }, [options.page, options.search, options.status, options.method]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { data, loading, pagination, refetch: fetchPayments };
}