'use client';

import React from 'react';
import { Users, Rocket, PhoneCall, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { CustomerApiResponse } from '@/lib/types';

interface DashboardStatsProps {
  data?: CustomerApiResponse;
}

export function DashboardStats({ data }: DashboardStatsProps) {
  const total = data?.total || 0;
  const activeCount = data?.statusCounts?.Active || 0;
  const leadCount = data?.statusCounts?.Lead || 0;
  const prospectCount = data?.statusCounts?.Prospect || 0;

  const stats = [
    {
      title: 'Total Customers',
      value: total.toLocaleString(),
      subtext: 'Trend +3.2% ↑ Green',
      isPositive: true,
      icon: Users,
      color: 'from-blue-500/20 to-blue-600/5 text-blue-500',
    },
    {
      title: 'Active Leads & Prospects',
      value: (leadCount + prospectCount).toLocaleString(),
      subtext: 'Trend +5.8% ↑ Green',
      isPositive: true,
      icon: Rocket,
      color: 'from-purple-500/20 to-purple-600/5 text-purple-500',
    },
    {
      title: 'Active Clients',
      value: activeCount.toLocaleString(),
      subtext: 'Trend -1.5% ↓ Red',
      isPositive: false,
      icon: PhoneCall,
      color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((st, i) => {
        const Icon = st.icon;
        return (
          <div
            key={i}
            className={`p-5 rounded-2xl bg-gradient-to-br ${st.color} border border-border shadow-xs hover:shadow-md transition-all flex items-center justify-between`}
          >
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {st.title}
              </p>
              <h3 className="text-2xl font-extrabold mt-1 tracking-tight">{st.value}</h3>
              <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                {st.isPositive ? (
                  <span className="text-emerald-500 flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    {st.subtext}
                  </span>
                ) : (
                  <span className="text-rose-500 flex items-center gap-0.5">
                    <TrendingDown className="h-3 w-3" />
                    {st.subtext}
                  </span>
                )}
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-xs">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
