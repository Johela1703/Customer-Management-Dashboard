'use client';

import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  ListFilter,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalCustomersCount?: number;
}

export function Sidebar({ activeTab, setActiveTab, totalCustomersCount = 0 }: SidebarProps) {
  const navItems = [
    { id: 'customers', label: 'Customers', icon: Users, count: totalCustomersCount },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'saved-filters', label: 'Saved Filters', icon: ListFilter },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card/60 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="p-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-2 mb-6">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight leading-none bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              CRM Engine
            </h1>
            <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Enterprise Suite</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={clsx(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={clsx('h-4 w-4 transition-transform group-hover:scale-110', isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={clsx(
                      'px-2 py-0.5 text-xs font-semibold rounded-full',
                      isActive
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent border border-primary/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold">Real-Time Caching</span>
        </div>
        <p className="text-[11px] text-muted-foreground">Powered by TanStack Query with optimistic UI updates.</p>
      </div>
    </aside>
  );
}
