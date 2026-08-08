'use client';

import React, { useState } from 'react';
import { CustomerStatus, Customer } from '@/lib/types';
import { CheckSquare, Trash2, Download, RefreshCw, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface BulkActionsBarProps {
  selectedCount: number;
  selectedCustomers: Customer[];
  onClearSelection: () => void;
  onBulkStatusChange: (status: CustomerStatus) => void;
  onBulkDelete: () => void;
}

export function BulkActionsBar({
  selectedCount,
  selectedCustomers,
  onClearSelection,
  onBulkStatusChange,
  onBulkDelete,
}: BulkActionsBarProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (selectedCount === 0) return null;

  const handleExportCSV = () => {
    if (selectedCustomers.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Status', 'Last Contact', 'Deal Value'];
    const rows = selectedCustomers.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${c.company}"`,
      c.status,
      c.lastContact,
      c.dealValue || 0,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `customers_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${selectedCount} customers to CSV`);
  };

  const statuses: CustomerStatus[] = ['Active', 'Inactive', 'Lead', 'Prospect', 'Archive'];

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-2 pr-3 border-r border-border">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            {selectedCount}
          </span>
          <span className="text-xs font-semibold">Selected</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Change Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-secondary hover:bg-secondary/80 border border-border transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Change Status</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showStatusMenu && (
              <div className="absolute bottom-full mb-2 left-0 w-40 p-1 rounded-xl bg-card border border-border shadow-xl z-50">
                {statuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onBulkStatusChange(st);
                      setShowStatusMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-secondary transition-colors"
                  >
                    Set to {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-secondary hover:bg-secondary/80 border border-border transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Bulk Delete */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/30 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Selected</span>
          </button>
        </div>

        <button
          onClick={onClearSelection}
          className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-2"
          title="Deselect All"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold">Confirm Bulk Delete</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Are you sure you want to permanently delete <strong className="text-foreground">{selectedCount}</strong> customer records? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onBulkDelete();
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-md"
              >
                Delete {selectedCount} Records
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
