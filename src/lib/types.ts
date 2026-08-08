export type CustomerStatus = 'Active' | 'Inactive' | 'Lead' | 'Prospect' | 'Archive';

export interface CustomerNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  lastContact: string; // ISO date string (YYYY-MM-DD)
  dealValue?: number;
  accountOwner?: string;
  title?: string;
  notes?: CustomerNote[];
  createdAt: string;
}

export interface FilterState {
  statuses: CustomerStatus[];
  companies: string[];
  dateRange: {
    from: string | null;
    to: string | null;
  };
  phoneQuery: string;
  emailQuery: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: FilterState;
  isPrebuilt?: boolean;
}

export type SortField = 'name' | 'email' | 'company' | 'status' | 'lastContact' | 'dealValue';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface PaginationState {
  page: number;
  pageSize: number;
}

export interface CustomerApiResponse {
  customers: Customer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  availableCompanies: string[];
  statusCounts: Record<CustomerStatus, number>;
}
