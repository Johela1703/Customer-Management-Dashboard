import React from 'react';
import { CustomerStatus } from '@/lib/types';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: CustomerStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles: Record<CustomerStatus, string> = {
    Active: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    Inactive: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    Lead: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    Prospect: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    Archive: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        styles[status] || styles.Active,
        className
      )}
    >
      <span
        className={clsx(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          status === 'Active' && 'bg-emerald-500 animate-pulse',
          status === 'Inactive' && 'bg-amber-500',
          status === 'Lead' && 'bg-blue-500',
          status === 'Prospect' && 'bg-purple-500',
          status === 'Archive' && 'bg-slate-500'
        )}
      />
      {status}
    </span>
  );
}
