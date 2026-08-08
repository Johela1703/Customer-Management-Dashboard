'use client';

import React, { useState } from 'react';
import { Customer, CustomerNote } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import {
  X,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  User,
  Plus,
  Send,
  Copy,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

interface CustomerDetailsDrawerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onAddNote: (customerId: string, noteText: string) => void;
}

export function CustomerDetailsDrawer({
  customer,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onAddNote,
}: CustomerDetailsDrawerProps) {
  const [newNote, setNewNote] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen || !customer) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`Copied ${label} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(customer.id, newNote.trim());
    setNewNote('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-card h-full border-l border-border shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-y-auto">
        {/* Header */}
        <div>
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-base font-bold">Customer Details</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Profile Overview */}
          <div className="p-6 border-b border-border bg-secondary/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg ring-4 ring-primary/20">
                  {getInitials(customer.name)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{customer.name}</h3>
                  <p className="text-xs text-muted-foreground">{customer.title || 'Key Stakeholder'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <StatusBadge status={customer.status} />
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {customer.company}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(customer)}
                  className="p-2 rounded-xl bg-secondary border border-border hover:bg-secondary/80 text-foreground transition-colors"
                  title="Edit Customer"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-xl bg-destructive/15 border border-destructive/30 hover:bg-destructive/25 text-destructive transition-colors"
                  title="Delete Customer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Contact Information
              </h4>
              <div className="space-y-2.5">
                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/60">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium">Email Address</p>
                      <p className="text-xs font-semibold">{customer.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(customer.email, 'Email')}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    {copiedField === 'Email' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/60">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium">Phone Number</p>
                      <p className="text-xs font-semibold">{customer.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(customer.phone, 'Phone')}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    {copiedField === 'Phone' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Deal & Timelines */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Account Details & Timeline
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-[10px] font-medium">Deal Value</span>
                  </div>
                  <p className="text-sm font-bold">${(customer.dealValue || 0).toLocaleString()}</p>
                </div>

                <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-medium">Last Contact</span>
                  </div>
                  <p className="text-xs font-bold">{customer.lastContact}</p>
                </div>

                <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <User className="h-3.5 w-3.5 text-purple-500" />
                    <span className="text-[10px] font-medium">Account Owner</span>
                  </div>
                  <p className="text-xs font-bold">{customer.accountOwner || 'Sarah Chen'}</p>
                </div>

                <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-[10px] font-medium">Created Date</span>
                  </div>
                  <p className="text-xs font-bold">{customer.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Notes & Interactions Timeline */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Notes & Interactions Timeline
              </h4>

              {/* Add Note Input */}
              <form onSubmit={handleAddNoteSubmit} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note or interaction..."
                    className="w-full pl-3 pr-10 py-2 text-xs bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="submit"
                    disabled={!newNote.trim()}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {customer.notes && customer.notes.length > 0 ? (
                  customer.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-secondary/40 border border-border/40 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="font-semibold text-foreground">{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic text-center py-4">
                    No notes recorded yet. Add one above!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold">Delete Customer</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Are you sure you want to delete <strong className="text-foreground">{customer.name}</strong>? This action cannot be undone.
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
                  onDelete(customer.id);
                  setShowDeleteConfirm(false);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-md"
              >
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
