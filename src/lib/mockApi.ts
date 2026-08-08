import { Customer, CustomerApiResponse, FilterState, SavedFilter, SortState, CustomerStatus } from './types';
import { INITIAL_CUSTOMERS, PREBUILT_FILTERS } from './mockData';

const CUSTOMERS_KEY = 'crm_customers_v1';
const SAVED_FILTERS_KEY = 'crm_saved_filters_v1';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getStoredCustomers(): Customer[] {
  if (typeof window === 'undefined') return INITIAL_CUSTOMERS;
  const stored = localStorage.getItem(CUSTOMERS_KEY);
  if (!stored) {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(INITIAL_CUSTOMERS));
    return INITIAL_CUSTOMERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_CUSTOMERS;
  }
}

function setStoredCustomers(customers: Customer[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  }
}

function getStoredSavedFilters(): SavedFilter[] {
  if (typeof window === 'undefined') return PREBUILT_FILTERS;
  const stored = localStorage.getItem(SAVED_FILTERS_KEY);
  if (!stored) {
    localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(PREBUILT_FILTERS));
    return PREBUILT_FILTERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return PREBUILT_FILTERS;
  }
}

function setStoredSavedFilters(filters: SavedFilter[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(filters));
  }
}

export const mockApi = {
  async fetchCustomers(params: {
    search?: string;
    filters?: FilterState;
    sort?: SortState;
    page?: number;
    pageSize?: number;
  }): Promise<CustomerApiResponse> {
    await delay(300); // Simulate network latency

    let customers = getStoredCustomers();

    // Extract all unique company names for filter multi-select
    const availableCompanies = Array.from(new Set(customers.map((c) => c.company))).sort();

    // Compute status counts across all customers
    const statusCounts: Record<CustomerStatus, number> = {
      Active: 0,
      Inactive: 0,
      Lead: 0,
      Prospect: 0,
      Archive: 0,
    };
    customers.forEach((c) => {
      if (statusCounts[c.status] !== undefined) {
        statusCounts[c.status]++;
      }
    });

    // 1. Search Filter (Name, Email, Company)
    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
      );
    }

    // 2. Advanced Filters
    if (params.filters) {
      const f = params.filters;

      // Status Checkboxes
      if (f.statuses && f.statuses.length > 0) {
        customers = customers.filter((c) => f.statuses.includes(c.status));
      }

      // Company Multi-select
      if (f.companies && f.companies.length > 0) {
        customers = customers.filter((c) => f.companies.includes(c.company));
      }

      // Phone query
      if (f.phoneQuery && f.phoneQuery.trim() !== '') {
        const pq = f.phoneQuery.trim().toLowerCase();
        customers = customers.filter((c) => c.phone.toLowerCase().includes(pq));
      }

      // Email query
      if (f.emailQuery && f.emailQuery.trim() !== '') {
        const eq = f.emailQuery.trim().toLowerCase();
        customers = customers.filter((c) => c.email.toLowerCase().includes(eq));
      }

      // Date Range Filter
      if (f.dateRange?.from) {
        customers = customers.filter((c) => c.lastContact >= (f.dateRange.from as string));
      }
      if (f.dateRange?.to) {
        customers = customers.filter((c) => c.lastContact <= (f.dateRange.to as string));
      }
    }

    // 3. Sorting
    if (params.sort) {
      const { field, order } = params.sort;
      const mult = order === 'asc' ? 1 : -1;

      customers.sort((a, b) => {
        let valA = a[field] ?? '';
        let valB = b[field] ?? '';

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return -1 * mult;
        if (valA > valB) return 1 * mult;
        return 0;
      });
    }

    // 4. Pagination
    const total = customers.length;
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize) || 1;

    const startIndex = (page - 1) * pageSize;
    const paginatedCustomers = customers.slice(startIndex, startIndex + pageSize);

    return {
      customers: paginatedCustomers,
      total,
      page,
      pageSize,
      totalPages,
      availableCompanies,
      statusCounts,
    };
  },

  async addCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    await delay(350);
    const customers = getStoredCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      notes: customer.notes || [],
    };
    const updated = [newCustomer, ...customers];
    setStoredCustomers(updated);
    return newCustomer;
  },

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    await delay(300);
    const customers = getStoredCustomers();
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Customer not found');

    const updatedCustomer = { ...customers[index], ...updates };
    customers[index] = updatedCustomer;
    setStoredCustomers(customers);
    return updatedCustomer;
  },

  async deleteCustomer(id: string): Promise<string> {
    await delay(300);
    const customers = getStoredCustomers();
    const filtered = customers.filter((c) => c.id !== id);
    setStoredCustomers(filtered);
    return id;
  },

  async bulkUpdateStatus(ids: string[], status: CustomerStatus): Promise<void> {
    await delay(400);
    const customers = getStoredCustomers();
    const updated = customers.map((c) => (ids.includes(c.id) ? { ...c, status } : c));
    setStoredCustomers(updated);
  },

  async bulkDelete(ids: string[]): Promise<void> {
    await delay(400);
    const customers = getStoredCustomers();
    const filtered = customers.filter((c) => !ids.includes(c.id));
    setStoredCustomers(filtered);
  },

  async reorderCustomers(startIndex: number, endIndex: number): Promise<Customer[]> {
    await delay(200);
    const customers = getStoredCustomers();
    const result = Array.from(customers);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setStoredCustomers(result);
    return result;
  },

  // Saved Filters CRUD
  async fetchSavedFilters(): Promise<SavedFilter[]> {
    await delay(150);
    return getStoredSavedFilters();
  },

  async saveFilter(name: string, filters: FilterState): Promise<SavedFilter> {
    await delay(250);
    const saved = getStoredSavedFilters();
    const newFilter: SavedFilter = {
      id: `filter-${Date.now()}`,
      name,
      filters,
      isPrebuilt: false,
    };
    const updated = [...saved, newFilter];
    setStoredSavedFilters(updated);
    return newFilter;
  },

  async deleteFilter(id: string): Promise<string> {
    await delay(200);
    const saved = getStoredSavedFilters();
    const updated = saved.filter((f) => f.id !== id);
    setStoredSavedFilters(updated);
    return id;
  },

  async reorderFilters(reorderedFilters: SavedFilter[]): Promise<SavedFilter[]> {
    await delay(150);
    setStoredSavedFilters(reorderedFilters);
    return reorderedFilters;
  },
};
