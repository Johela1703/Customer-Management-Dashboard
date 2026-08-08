'use client';

import React, { useState, useMemo } from 'react';
import { AppProviders } from '@/components/providers/AppProviders';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { BulkActionsBar } from '@/components/customers/BulkActionsBar';
import { CustomerFormDialog } from '@/components/customers/CustomerFormDialog';
import { CustomerDetailsDrawer } from '@/components/customers/CustomerDetailsDrawer';
import { CommandPalette } from '@/components/search/CommandPalette';
import { useDebounce } from '@/hooks/useDebounce';
import {
  useCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useBulkUpdateStatusMutation,
  useBulkDeleteMutation,
  useSavedFiltersQuery,
  useSaveFilterMutation,
  useDeleteFilterMutation,
  useReorderFiltersMutation,
} from '@/hooks/useCustomers';
import { Customer, CustomerStatus, FilterState, SavedFilter, SortField, SortState } from '@/lib/types';
import { Plus, UserPlus, Filter as FilterIcon, Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';

function CRMDashboardContent() {
  const [activeTab, setActiveTab] = useState('customers');

  // Search state & debouncing
  const [rawSearchQuery, setRawSearchQuery] = useState('');
  const debouncedSearch = useDebounce(rawSearchQuery, 300);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    statuses: [],
    companies: [],
    dateRange: { from: null, to: null },
    phoneQuery: '',
    emailQuery: '',
  });

  // Sort state
  const [sort, setSort] = useState<SortState>({
    field: 'lastContact',
    order: 'desc',
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Bulk Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Dialog & Drawer UI states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // TanStack Queries & Mutations
  const { data, isLoading } = useCustomersQuery({
    search: debouncedSearch,
    filters,
    sort,
    page,
    pageSize,
  });

  const { data: savedFilters = [] } = useSavedFiltersQuery();

  const addCustomerMutation = useAddCustomerMutation();
  const updateCustomerMutation = useUpdateCustomerMutation();
  const deleteCustomerMutation = useDeleteCustomerMutation();
  const bulkStatusMutation = useBulkUpdateStatusMutation();
  const bulkDeleteMutation = useBulkDeleteMutation();
  const saveFilterMutation = useSaveFilterMutation();
  const deleteFilterMutation = useDeleteFilterMutation();
  const reorderFiltersMutation = useReorderFiltersMutation();

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.statuses && filters.statuses.length > 0) count += filters.statuses.length;
    if (filters.companies && filters.companies.length > 0) count += filters.companies.length;
    if (filters.dateRange?.from || filters.dateRange?.to) count += 1;
    if (filters.phoneQuery) count += 1;
    if (filters.emailQuery) count += 1;
    return count;
  }, [filters]);

  // Table selections
  const handleSelectAll = (checked: boolean) => {
    if (checked && data?.customers) {
      setSelectedIds(data.customers.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Sorting handler
  const handleSortChange = (field: SortField) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Reordering customers locally
  const handleReorderCustomers = (startIndex: number, endIndex: number) => {
    if (!data?.customers) return;
    const reordered = Array.from(data.customers);
    const [removed] = reordered.splice(startIndex, 1);
    reordered.splice(endIndex, 0, removed);
    toast.info('Reordered list view layout');
  };

  // Add / Edit submission
  const handleFormSubmit = async (formData: any) => {
    if (editingCustomer) {
      await updateCustomerMutation.mutateAsync({
        id: editingCustomer.id,
        updates: formData,
      });
    } else {
      await addCustomerMutation.mutateAsync({
        ...formData,
        notes: formData.initialNote
          ? [
              {
                id: `note-${Date.now()}`,
                text: formData.initialNote,
                createdAt: new Date().toISOString(),
                author: 'Alex Rivera',
              },
            ]
          : [],
      });
    }
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  // Customer Notes addition
  const handleAddNote = async (customerId: string, noteText: string) => {
    if (!selectedCustomer) return;
    const existingNotes = selectedCustomer.notes || [];
    const newNoteObj = {
      id: `note-${Date.now()}`,
      text: noteText,
      createdAt: new Date().toISOString(),
      author: 'Alex Rivera',
    };
    const updatedNotes = [newNoteObj, ...existingNotes];
    const updated = await updateCustomerMutation.mutateAsync({
      id: customerId,
      updates: { notes: updatedNotes },
    });
    setSelectedCustomer(updated);
    toast.success('Note added to timeline');
  };

  // Selected customers object array for bulk CSV export
  const selectedCustomerObjects = useMemo(() => {
    if (!data?.customers) return [];
    return data.customers.filter((c) => selectedIds.includes(c.id));
  }, [data?.customers, selectedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Header */}
      <Header
        searchQuery={rawSearchQuery}
        onSearchChange={(q) => {
          setRawSearchQuery(q);
          setPage(1);
        }}
        onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
        onToggleMobileFilters={() => setIsFilterPanelOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalCustomersCount={data?.total || 0}
        />

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Dashboard Analytics Header */}
            <DashboardStats data={data} />

            {/* Customers Top Toolbar (Matching exact PDF Screenshot Page 2 & Page 4 layout) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-xs">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-extrabold tracking-tight">Customers</h1>
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={rawSearchQuery}
                    onChange={(e) => {
                      setRawSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search customers..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-secondary/60 border border-border/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Action Controls & Filter Button */}
              <div className="flex items-center flex-wrap gap-2">
                {/* Status Quick Select */}
                <div className="relative">
                  <select
                    value={filters.statuses?.[0] || 'All'}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        statuses: val === 'All' ? [] : [val as CustomerStatus],
                      }));
                      setPage(1);
                    }}
                    className="appearance-none bg-secondary/60 hover:bg-secondary border border-border rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="All">Status: All</option>
                    <option value="Active">Status: Active</option>
                    <option value="Prospect">Status: Prospect</option>
                    <option value="Lead">Status: Lead</option>
                    <option value="Inactive">Status: Inactive</option>
                    <option value="Archive">Status: Archive</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>

                {/* Company Quick Select */}
                <div className="relative">
                  <select
                    value={filters.companies?.[0] || 'All'}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        companies: val === 'All' ? [] : [val],
                      }));
                      setPage(1);
                    }}
                    className="appearance-none bg-secondary/60 hover:bg-secondary border border-border rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="All">Company: All</option>
                    {(data?.availableCompanies || []).map((comp) => (
                      <option key={comp} value={comp}>
                        Company: {comp}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>

                {/* Advanced Filters Button (Matches Screenshot Popover trigger) */}
                <button
                  onClick={() => setIsFilterPanelOpen(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    activeFiltersCount > 0
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-secondary/60 hover:bg-secondary border-border text-foreground'
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Add Customer Button */}
                <button
                  onClick={() => {
                    setEditingCustomer(null);
                    setIsFormOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-md hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Customer</span>
                </button>
              </div>
            </div>

            {/* Customers Table View (Full width) */}
            <div className="w-full">
              <CustomerTable
                customers={data?.customers || []}
                isLoading={isLoading}
                selectedIds={selectedIds}
                onSelectAll={handleSelectAll}
                onSelectRow={handleSelectRow}
                sort={sort}
                onSortChange={handleSortChange}
                page={page}
                pageSize={pageSize}
                totalPages={data?.totalPages || 1}
                totalCustomers={data?.total || 0}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(sz) => {
                  setPageSize(sz);
                  setPage(1);
                }}
                onViewCustomer={(c) => {
                  setSelectedCustomer(c);
                  setIsDetailsOpen(true);
                }}
                onEditCustomer={(c) => {
                  setEditingCustomer(c);
                  setIsFormOpen(true);
                }}
                onDeleteCustomer={(id) => deleteCustomerMutation.mutate(id)}
                onReorder={handleReorderCustomers}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Advanced Filters Popover Drawer (Matches Screenshot 4) */}
      <FilterPanel
        filters={filters}
        onFilterChange={(newF) => {
          setFilters(newF);
          setPage(1);
        }}
        onClearFilters={() => {
          setFilters({
            statuses: [],
            companies: [],
            dateRange: { from: null, to: null },
            phoneQuery: '',
            emailQuery: '',
          });
          setPage(1);
        }}
        availableCompanies={data?.availableCompanies || []}
        savedFilters={savedFilters}
        onApplySavedFilter={(sf) => {
          setFilters(sf.filters);
          setPage(1);
          toast.info(`Applied filter template: "${sf.name}"`);
        }}
        onSaveCurrentFilter={(name) => saveFilterMutation.mutate({ name, filters })}
        onDeleteSavedFilter={(id) => deleteFilterMutation.mutate(id)}
        onReorderSavedFilters={(reordered) => reorderFiltersMutation.mutate(reordered)}
        activeFiltersCount={activeFiltersCount}
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
      />

      {/* Bulk Actions Floating Bar */}
      <BulkActionsBar
        selectedCount={selectedIds.length}
        selectedCustomers={selectedCustomerObjects}
        onClearSelection={() => setSelectedIds([])}
        onBulkStatusChange={(st) => {
          bulkStatusMutation.mutate({ ids: selectedIds, status: st });
          setSelectedIds([]);
        }}
        onBulkDelete={() => {
          bulkDeleteMutation.mutate(selectedIds);
          setSelectedIds([]);
        }}
      />

      {/* Customer Form Modal (Add / Edit) */}
      <CustomerFormDialog
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingCustomer}
        availableCompanies={data?.availableCompanies || []}
        isSubmitting={addCustomerMutation.isPending || updateCustomerMutation.isPending}
      />

      {/* Customer Details Profile Drawer */}
      <CustomerDetailsDrawer
        customer={selectedCustomer}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedCustomer(null);
        }}
        onEdit={(c) => {
          setIsDetailsOpen(false);
          setEditingCustomer(c);
          setIsFormOpen(true);
        }}
        onDelete={(id) => {
          deleteCustomerMutation.mutate(id);
          setIsDetailsOpen(false);
        }}
        onAddNote={handleAddNote}
      />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        customers={data?.customers || []}
        savedFilters={savedFilters}
        onSelectCustomer={(c) => {
          setSelectedCustomer(c);
          setIsDetailsOpen(true);
        }}
        onSelectFilter={(sf) => {
          setFilters(sf.filters);
          setPage(1);
          toast.info(`Applied filter: "${sf.name}"`);
        }}
        onAddNewCustomer={() => {
          setEditingCustomer(null);
          setIsFormOpen(true);
        }}
      />
    </div>
  );
}

export default function CRMDashboardPage() {
  return (
    <AppProviders>
      <CRMDashboardContent />
    </AppProviders>
  );
}
