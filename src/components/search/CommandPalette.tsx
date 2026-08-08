'use client';

import React, { useEffect, useState } from 'react';
import { Customer, SavedFilter } from '@/lib/types';
import { Search, Users, Bookmark, Sparkles, X, ChevronRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  savedFilters: SavedFilter[];
  onSelectCustomer: (customer: Customer) => void;
  onSelectFilter: (filter: SavedFilter) => void;
  onAddNewCustomer: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  customers,
  savedFilters,
  onSelectCustomer,
  onSelectFilter,
  onAddNewCustomer,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCustomers = customers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()) ||
        c.company.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  const filteredFilters = savedFilters
    .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/30">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, customer name, email, or filter preset..."
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 space-y-4 max-h-96 overflow-y-auto">
          {/* Action item: Add new customer */}
          <div>
            <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Quick Actions
            </p>
            <button
              onClick={() => {
                onAddNewCustomer();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Add New Customer</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
            </button>
          </div>

          {/* Customers section */}
          {filteredCustomers.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Customers ({filteredCustomers.length})
              </p>
              {filteredCustomers.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCustomer(c);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.email} • {c.company}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-semibold">
                    {c.status}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Filter Templates section */}
          {filteredFilters.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Filter Templates ({filteredFilters.length})
              </p>
              {filteredFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    onSelectFilter(f);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Bookmark className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">{f.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Apply Filter</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-secondary/20 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            Use <kbd className="px-1 py-0.5 bg-secondary rounded border border-border">ESC</kbd> to exit
          </span>
          <span>CRM Quick Command Palette</span>
        </div>
      </div>
    </div>
  );
}
