'use client';

import React from 'react';
import { Search, Bell, Command, User, Sparkles, Filter } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCmdPalette: () => void;
  onToggleMobileFilters?: () => void;
  activeFiltersCount?: number;
}

export function Header({
  searchQuery,
  onSearchChange,
  onOpenCmdPalette,
  onToggleMobileFilters,
  activeFiltersCount = 0,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 md:px-6 backdrop-blur-md">
      {/* Search Input */}
      <div className="flex items-center flex-1 max-w-xl gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search CRM by name, email, company..."
            className="w-full pl-9 pr-14 py-2 text-sm bg-secondary/50 border border-border/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
          />
          <button
            onClick={onOpenCmdPalette}
            className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground bg-background border border-border rounded shadow-xs hover:text-foreground"
          >
            <Command className="h-3 w-3" />
            <span>K</span>
          </button>
        </div>

        {/* Mobile Filter Toggle */}
        {onToggleMobileFilters && (
          <button
            onClick={onToggleMobileFilters}
            className="md:hidden relative p-2.5 bg-secondary border border-border rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <Filter className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Stats pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>TanStack Query Active</span>
        </div>

        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-lg transition-colors border border-border/50">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-primary/20">
            AR
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold leading-none">Alex Rivera</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Admin Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}
