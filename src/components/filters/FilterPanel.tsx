'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CustomerStatus, FilterState, SavedFilter } from '@/lib/types';
import {
  Filter,
  X,
  Bookmark,
  Plus,
  Trash2,
  GripVertical,
  Check,
  RotateCcw,
  Calendar,
  Search,
  ChevronDown,
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearFilters: () => void;
  availableCompanies: string[];
  savedFilters: SavedFilter[];
  onApplySavedFilter: (sf: SavedFilter) => void;
  onSaveCurrentFilter: (name: string) => void;
  onDeleteSavedFilter: (id: string) => void;
  onReorderSavedFilters: (reordered: SavedFilter[]) => void;
  activeFiltersCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  availableCompanies,
  savedFilters,
  onApplySavedFilter,
  onSaveCurrentFilter,
  onDeleteSavedFilter,
  onReorderSavedFilters,
  activeFiltersCount,
  isOpen,
  onClose,
}: FilterPanelProps) {
  const [saveFilterName, setSaveFilterName] = useState('');
  const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !isSavingModalOpen
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, isSavingModalOpen]);

  if (!isOpen) return null;

  const statuses: { label: string; value: CustomerStatus }[] = [
    { label: 'Active Customer', value: 'Active' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Lead', value: 'Lead' },
    { label: 'Inactive Customer', value: 'Inactive' },
    { label: 'Archive', value: 'Archive' },
  ];

  const handleStatusToggle = (status: CustomerStatus) => {
    const current = filters.statuses || [];
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    onFilterChange({ ...filters, statuses: next });
  };

  const handleCompanyToggle = (company: string) => {
    const current = filters.companies || [];
    const next = current.includes(company)
      ? current.filter((c) => c !== company)
      : [...current, company];
    onFilterChange({ ...filters, companies: next });
  };

  const handleDateChange = (field: 'from' | 'to', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value || null,
      },
    });
  };

  const handleSavedFilterDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(savedFilters);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onReorderSavedFilters(reordered);
  };

  const handleSaveModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveFilterName.trim()) return;
    onSaveCurrentFilter(saveFilterName.trim());
    setSaveFilterName('');
    setIsSavingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs p-2 sm:p-4">
      <div
        ref={panelRef}
        className="w-full max-w-sm bg-card border border-border shadow-2xl rounded-2xl flex flex-col justify-between h-full max-h-[92vh] overflow-hidden animate-in slide-in-from-right-5 duration-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Top Save Filter Button */}
          <button
            onClick={() => setIsSavingModalOpen(true)}
            className="w-full py-2 px-3 rounded-xl border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Save Filter</span>
          </button>

          {/* Status Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-foreground">Status</label>
              {activeFiltersCount > 0 && (
                <button
                  onClick={onClearFilters}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="space-y-2">
              {statuses.map((st) => {
                const isChecked = filters.statuses?.includes(st.value);
                return (
                  <label
                    key={st.value}
                    onClick={() => handleStatusToggle(st.value)}
                    className="flex items-center gap-2.5 cursor-pointer select-none py-1 hover:text-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
                    />
                    <span className={isChecked ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                      {st.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Company Section */}
          <div>
            <label className="font-bold text-foreground block mb-2">Company</label>
            <div className="flex flex-wrap gap-1.5">
              {availableCompanies.map((comp) => {
                const isChecked = filters.companies?.includes(comp);
                return (
                  <button
                    key={comp}
                    onClick={() => handleCompanyToggle(comp)}
                    className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${
                      isChecked
                        ? 'bg-primary text-primary-foreground border-primary font-bold shadow-xs'
                        : 'bg-secondary/60 border-border hover:bg-secondary text-foreground'
                    }`}
                  >
                    {comp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range (Last Contact) */}
          <div>
            <label className="font-bold text-foreground block mb-2">
              Date Range (Last Contact)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-muted-foreground mb-1 block">From</span>
                <div className="relative">
                  <input
                    type="date"
                    value={filters.dateRange?.from || ''}
                    onChange={(e) => handleDateChange('from', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground mb-1 block">To</span>
                <div className="relative">
                  <input
                    type="date"
                    value={filters.dateRange?.to || ''}
                    onChange={(e) => handleDateChange('to', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="font-bold text-foreground block mb-1.5">Phone Number</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={filters.phoneQuery || ''}
                onChange={(e) => onFilterChange({ ...filters, phoneQuery: e.target.value })}
                placeholder="(555) 123-4567"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Email Contains */}
          <div>
            <label className="font-bold text-foreground block mb-1.5">Email Contains</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                @
              </span>
              <input
                type="text"
                value={filters.emailQuery || ''}
                onChange={(e) => onFilterChange({ ...filters, emailQuery: e.target.value })}
                placeholder="e.g., @gmail.com"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 transition-colors text-xs"
          >
            Apply Filters
          </button>

          {/* Saved Filters List */}
          <div className="pt-3 border-t border-border">
            <h4 className="font-bold text-foreground mb-2">Saved Filters</h4>
            <DragDropContext onDragEnd={handleSavedFilterDragEnd}>
              <Droppable droppableId="saved-filters-list-popover">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-1.5 max-h-36 overflow-y-auto pr-1"
                  >
                    {savedFilters.map((sf, index) => (
                      <Draggable key={sf.id} draggableId={sf.id} index={index}>
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            className="flex items-center justify-between p-2 rounded-xl bg-secondary/50 border border-border/60 hover:bg-secondary transition-colors group"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <span
                                {...dragProvided.dragHandleProps}
                                className="cursor-grab text-muted-foreground hover:text-foreground"
                              >
                                <GripVertical className="h-3.5 w-3.5" />
                              </span>
                              <button
                                onClick={() => {
                                  onApplySavedFilter(sf);
                                  onClose();
                                }}
                                className="text-xs font-medium text-left hover:text-primary transition-colors flex-1"
                              >
                                {sf.name}
                              </button>
                            </div>

                            {!sf.isPrebuilt && (
                              <button
                                onClick={() => onDeleteSavedFilter(sf.id)}
                                className="p-1 rounded text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete preset"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>

      {/* Save Filter Modal */}
      {isSavingModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form
            onSubmit={handleSaveModalSubmit}
            className="w-full max-w-sm p-5 rounded-2xl bg-card border border-border shadow-2xl space-y-4"
          >
            <h3 className="text-sm font-bold">Save Current Filter Preset</h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                Preset Name
              </label>
              <input
                type="text"
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e.target.value)}
                placeholder="e.g. Active Enterprise Leads"
                className="w-full px-3 py-2 text-xs bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSavingModalOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-border hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
              >
                Save Preset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
