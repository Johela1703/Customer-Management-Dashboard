'use client';

import React from 'react';
import { Customer, SortField, SortState, CustomerStatus } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import {
  GripVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserX,
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface CustomerTableProps {
  customers: Customer[];
  isLoading: boolean;
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  sort: SortState;
  onSortChange: (field: SortField) => void;
  page: number;
  pageSize: number;
  totalPages: number;
  totalCustomers: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  onViewCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function CustomerTable({
  customers,
  isLoading,
  selectedIds,
  onSelectAll,
  onSelectRow,
  sort,
  onSortChange,
  page,
  pageSize,
  totalPages,
  totalCustomers,
  onPageChange,
  onPageSizeChange,
  onViewCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onReorder,
}: CustomerTableProps) {
  const isAllSelected =
    customers.length > 0 && customers.every((c) => selectedIds.includes(c.id));

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  const renderSortIcon = (field: SortField) => {
    if (sort.field !== field) return <ArrowUpDown className="h-3 w-3 opacity-40 group-hover:opacity-100" />;
    return sort.order === 'asc' ? (
      <ArrowUp className="h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="h-3 w-3 text-primary" />
    );
  };

  return (
    <div className="w-full flex flex-col justify-between bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
      {/* Table Content */}
      <div className="overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-secondary/40 text-muted-foreground uppercase font-semibold text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="w-10 px-3 py-3 text-center">Reorder</th>
                <th className="w-10 px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/40"
                  />
                </th>
                <th
                  onClick={() => onSortChange('name')}
                  className="px-4 py-3 cursor-pointer select-none hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5 group">
                    <span>Name</span>
                    {renderSortIcon('name')}
                  </div>
                </th>
                <th
                  onClick={() => onSortChange('email')}
                  className="px-4 py-3 cursor-pointer select-none hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5 group">
                    <span>Email</span>
                    {renderSortIcon('email')}
                  </div>
                </th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th
                  onClick={() => onSortChange('company')}
                  className="px-4 py-3 cursor-pointer select-none hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5 group">
                    <span>Company</span>
                    {renderSortIcon('company')}
                  </div>
                </th>
                <th
                  onClick={() => onSortChange('status')}
                  className="px-4 py-3 cursor-pointer select-none hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5 group">
                    <span>Status</span>
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th
                  onClick={() => onSortChange('lastContact')}
                  className="px-4 py-3 cursor-pointer select-none hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1.5 group">
                    <span>Last Contact</span>
                    {renderSortIcon('lastContact')}
                  </div>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            {isLoading ? (
              <tbody>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-border/50 animate-pulse">
                    <td className="px-3 py-4 text-center">
                      <div className="h-4 w-4 bg-secondary/80 rounded mx-auto" />
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="h-4 w-4 bg-secondary/80 rounded mx-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-28 bg-secondary/80 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-36 bg-secondary/80 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 bg-secondary/80 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 bg-secondary/80 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-5 w-16 bg-secondary/80 rounded-full" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-20 bg-secondary/80 rounded" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="h-4 w-12 bg-secondary/80 rounded ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : customers.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={9} className="py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <UserX className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-semibold">No customers found</p>
                      <p className="text-xs text-muted-foreground">
                        Try adjusting your search query or clear active filters.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <Droppable droppableId="customer-table-body">
                {(provided) => (
                  <tbody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="divide-y divide-border/60"
                  >
                    {customers.map((c, index) => {
                      const isSelected = selectedIds.includes(c.id);
                      return (
                        <Draggable key={c.id} draggableId={c.id} index={index}>
                          {(dragProvided, dragSnapshot) => (
                            <tr
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              className={`group hover:bg-secondary/30 transition-colors ${
                                isSelected ? 'bg-primary/5' : ''
                              } ${dragSnapshot.isDragging ? 'bg-card shadow-2xl opacity-90 border border-primary' : ''}`}
                            >
                              {/* Drag Handle */}
                              <td className="px-3 py-3 text-center cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                                <div {...dragProvided.dragHandleProps} className="inline-block p-1">
                                  <GripVertical className="h-4 w-4" />
                                </div>
                              </td>

                              {/* Checkbox */}
                              <td className="px-3 py-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => onSelectRow(c.id, e.target.checked)}
                                  className="rounded border-border text-primary focus:ring-primary/40"
                                />
                              </td>

                              {/* Name */}
                              <td className="px-4 py-3 font-semibold text-foreground">
                                <button
                                  onClick={() => onViewCustomer(c)}
                                  className="hover:underline text-left"
                                >
                                  {c.name}
                                </button>
                              </td>

                              {/* Email */}
                              <td className="px-4 py-3 text-muted-foreground">{c.email}</td>

                              {/* Phone */}
                              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                                {c.phone}
                              </td>

                              {/* Company */}
                              <td className="px-4 py-3 text-foreground font-medium">{c.company}</td>

                              {/* Status */}
                              <td className="px-4 py-3">
                                <StatusBadge status={c.status} />
                              </td>

                              {/* Last Contact */}
                              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                                {c.lastContact}
                              </td>

                              {/* Actions */}
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => onViewCustomer(c)}
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                    title="View Details"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => onEditCustomer(c)}
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                    title="Edit Customer"
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => onDeleteCustomer(c.id)}
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    title="Delete Customer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            )}
          </table>
        </DragDropContext>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border bg-secondary/20">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{customers.length > 0 ? (page - 1) * pageSize + 1 : 0}</strong> to{' '}
            <strong className="text-foreground">
              {Math.min(page * pageSize, totalCustomers)}
            </strong>{' '}
            of <strong className="text-foreground">{totalCustomers}</strong> entries
          </span>

          <div className="flex items-center gap-2 border-l border-border pl-3">
            <span>Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-card border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground disabled:opacity-40 transition-opacity"
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  page === pageNum
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card border-border hover:bg-secondary text-foreground'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground disabled:opacity-40 transition-opacity"
            title="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
