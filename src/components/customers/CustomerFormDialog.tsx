'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Customer, CustomerStatus } from '@/lib/types';
import { X, CheckCircle2, Loader2 } from 'lucide-react';

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  company: z.string().min(1, 'Company name is required'),
  status: z.enum(['Active', 'Inactive', 'Lead', 'Prospect', 'Archive']),
  lastContact: z.string().min(1, 'Last contact date is required'),
  dealValue: z.coerce.number().min(0, 'Deal value cannot be negative').optional(),
  title: z.string().optional(),
  initialNote: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerFormValues) => Promise<void> | void;
  initialData?: Customer | null;
  availableCompanies?: string[];
  isSubmitting?: boolean;
}

export function CustomerFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  availableCompanies = [],
  isSubmitting = false,
}: CustomerFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'Active',
      lastContact: new Date().toISOString().split('T')[0],
      dealValue: 0,
      title: '',
      initialNote: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        company: initialData.company,
        status: initialData.status,
        lastContact: initialData.lastContact,
        dealValue: initialData.dealValue || 0,
        title: initialData.title || '',
        initialNote: '',
      });
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        company: availableCompanies[0] || 'Acme Corp',
        status: 'Active',
        lastContact: new Date().toISOString().split('T')[0],
        dealValue: 25000,
        title: '',
        initialNote: '',
      });
    }
  }, [initialData, reset, availableCompanies]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-xl p-6 rounded-2xl bg-card border border-border shadow-2xl animate-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div>
            <h2 className="text-lg font-bold">
              {initialData ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {initialData ? 'Update customer profile and account information' : 'Fill in customer details below to create a new profile'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                {...register('name')}
                placeholder="John Doe"
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.name && (
                <p className="text-[11px] text-destructive mt-1 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                {...register('email')}
                placeholder="john.doe@example.com"
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.email && (
                <p className="text-[11px] text-destructive mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                Phone <span className="text-destructive">*</span>
              </label>
              <input
                {...register('phone')}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.phone && (
                <p className="text-[11px] text-destructive mt-1 font-medium">{errors.phone.message}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                Company <span className="text-destructive">*</span>
              </label>
              <input
                {...register('company')}
                placeholder="Acme Corp"
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.company && (
                <p className="text-[11px] text-destructive mt-1 font-medium">{errors.company.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold mb-1">Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Lead">Lead</option>
                <option value="Prospect">Prospect</option>
                <option value="Archive">Archive</option>
              </select>
            </div>

            {/* Last Contact Date */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                Last Contact Date <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                {...register('lastContact')}
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.lastContact && (
                <p className="text-[11px] text-destructive mt-1 font-medium">{errors.lastContact.message}</p>
              )}
            </div>

            {/* Deal Value */}
            <div>
              <label className="block text-xs font-semibold mb-1">Deal Value ($)</label>
              <input
                type="number"
                {...register('dealValue')}
                placeholder="50000"
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-xs font-semibold mb-1">Job Title</label>
              <input
                {...register('title')}
                placeholder="VP of Operations"
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Initial Note (Only for new customer) */}
          {!initialData && (
            <div>
              <label className="block text-xs font-semibold mb-1">Initial Interaction Notes</label>
              <textarea
                {...register('initialNote')}
                rows={3}
                placeholder="Meeting notes, follow-up requirements, or context..."
                className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-secondary transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{initialData ? 'Update Customer' : 'Add Customer'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
