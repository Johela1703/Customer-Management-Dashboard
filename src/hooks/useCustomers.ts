import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../lib/mockApi';
import { Customer, CustomerApiResponse, CustomerStatus, FilterState, SavedFilter, SortState } from '../lib/types';
import { toast } from 'sonner';

export function useCustomersQuery(params: {
  search: string;
  filters: FilterState;
  sort: SortState;
  page: number;
  pageSize: number;
}) {
  return useQuery<CustomerApiResponse>({
    queryKey: ['customers', params],
    queryFn: () => mockApi.fetchCustomers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
}


export function useAddCustomerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomer: Omit<Customer, 'id' | 'createdAt'>) =>
      mockApi.addCustomer(newCustomer),
    onSuccess: (added) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success(`Customer ${added.name} created successfully!`);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to create customer');
    },
  });
}

export function useUpdateCustomerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Customer> }) =>
      mockApi.updateCustomer(id, updates),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success(`Customer ${updated.name} updated!`);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update customer');
    },
  });
}

export function useDeleteCustomerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mockApi.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer deleted successfully');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete customer');
    },
  });
}

export function useBulkUpdateStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: CustomerStatus }) =>
      mockApi.bulkUpdateStatus(ids, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success(`Updated status to ${variables.status} for ${variables.ids.length} customers`);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed bulk status update');
    },
  });
}

export function useBulkDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => mockApi.bulkDelete(ids),
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success(`Deleted ${ids.length} customers`);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed bulk delete');
    },
  });
}

export function useSavedFiltersQuery() {
  return useQuery({
    queryKey: ['savedFilters'],
    queryFn: () => mockApi.fetchSavedFilters(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useSaveFilterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, filters }: { name: string; filters: FilterState }) =>
      mockApi.saveFilter(name, filters),
    onSuccess: (newFilter) => {
      queryClient.invalidateQueries({ queryKey: ['savedFilters'] });
      toast.success(`Filter preset "${newFilter.name}" saved!`);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to save filter preset');
    },
  });
}

export function useDeleteFilterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mockApi.deleteFilter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedFilters'] });
      toast.success('Filter preset removed');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete filter preset');
    },
  });
}

export function useReorderFiltersMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reordered: SavedFilter[]) => mockApi.reorderFilters(reordered),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedFilters'] });
    },
  });
}
