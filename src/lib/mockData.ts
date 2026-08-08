import { Customer, SavedFilter } from './types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Alice Green',
    email: 'alicegreen@gmail.com',
    phone: '874-748-8877',
    company: 'Acme Corp',
    status: 'Active',
    lastContact: '2023-11-12',
    dealValue: 45000,
    accountOwner: 'Sarah Chen',
    title: 'Marketing Director',
    createdAt: '2022-01-10',
    notes: [
      { id: 'n1', text: 'Interested in expanding seats for Q4.', createdAt: '2023-11-12T14:30:00Z', author: 'Sarah Chen' }
    ]
  },
  {
    id: 'cust-2',
    name: 'Bob Ross',
    email: 'bobross.coh@email.com',
    phone: '874-855-2469',
    company: 'Globex',
    status: 'Active',
    lastContact: '2023-11-03',
    dealValue: 28000,
    accountOwner: 'Alex Rivera',
    title: 'Head of Ops',
    createdAt: '2022-03-15',
    notes: [
      { id: 'n2', text: 'Requested demo for new analytics feature.', createdAt: '2023-11-03T10:15:00Z', author: 'Alex Rivera' }
    ]
  },
  {
    id: 'cust-3',
    name: 'Charlie Davis',
    email: 'charliedavis@gmail.com',
    phone: '873-844-9576',
    company: 'Stark Industries',
    status: 'Prospect',
    lastContact: '2023-11-03',
    dealValue: 125000,
    accountOwner: 'Sarah Chen',
    title: 'VP Engineering',
    createdAt: '2023-05-20',
    notes: []
  },
  {
    id: 'cust-4',
    name: 'Charlie Baves',
    email: 'charlie.davis@email.com',
    phone: '873-858-8466',
    company: 'Stark Industries',
    status: 'Lead',
    lastContact: '2023-11-03',
    dealValue: 62000,
    accountOwner: 'David Miller',
    title: 'Product Lead',
    createdAt: '2023-06-11',
    notes: []
  },
  {
    id: 'cust-5',
    name: 'Eoron Ross',
    email: 'bobiribonen@gmail.com',
    phone: '874-883-2621',
    company: 'Acme Corp',
    status: 'Archive',
    lastContact: '2023-11-03',
    dealValue: 15000,
    accountOwner: 'Alex Rivera',
    title: 'Procurement Specialist',
    createdAt: '2021-08-01',
    notes: []
  },
  {
    id: 'cust-6',
    name: 'John Ross',
    email: 'alicextflob@jemail.com',
    phone: '879-833-9228',
    company: 'Globex',
    status: 'Inactive',
    lastContact: '2023-11-03',
    dealValue: 34000,
    accountOwner: 'Sarah Chen',
    title: 'CTO',
    createdAt: '2022-09-12',
    notes: []
  },
  {
    id: 'cust-7',
    name: 'Alice Green',
    email: 'bobo@eme@email.com',
    phone: '973-507-7836',
    company: 'Acme Corp',
    status: 'Prospect',
    lastContact: '2023-11-03',
    dealValue: 88000,
    accountOwner: 'David Miller',
    title: 'Operations Director',
    createdAt: '2023-01-14',
    notes: []
  },
  {
    id: 'cust-8',
    name: 'Bob Ross',
    email: 'charlie.aavs@gmail.com',
    phone: '874-656-8831',
    company: 'Stark Industries',
    status: 'Inactive',
    lastContact: '2023-11-03',
    dealValue: 19000,
    accountOwner: 'Alex Rivera',
    title: 'IT Lead',
    createdAt: '2022-11-30',
    notes: []
  },
  {
    id: 'cust-9',
    name: 'Bolo Ross',
    email: 'allicendavis@gmail.com',
    phone: '873-632-2837',
    company: 'Stark Industries',
    status: 'Inactive',
    lastContact: '2023-11-03',
    dealValue: 95000,
    accountOwner: 'Sarah Chen',
    title: 'Managing Director',
    createdAt: '2023-02-18',
    notes: []
  },
  {
    id: 'cust-10',
    name: 'Charlie Davis',
    email: 'charliedastes@gmail.com',
    phone: '878-697-2556',
    company: 'Acme Corp',
    status: 'Lead',
    lastContact: '2023-11-03',
    dealValue: 52000,
    accountOwner: 'David Miller',
    title: 'Strategy Analyst',
    createdAt: '2023-04-05',
    notes: []
  },
  {
    id: 'cust-11',
    name: 'Eleanor Henderson',
    email: 'eleanor.h@innovate.io',
    phone: '555-234-5678',
    company: 'Innovate Solutions Inc.',
    status: 'Active',
    lastContact: '2023-10-14',
    dealValue: 45000,
    accountOwner: 'Sarah Chen',
    title: 'Marketing Director',
    createdAt: '2022-01-10',
    notes: [
      { id: 'n11', text: 'Met at TechCrunch Disrupt. Discussed Q4 marketing campaign.', createdAt: '2023-10-14T14:30:00Z', author: 'Sarah Chen' }
    ]
  },
  {
    id: 'cust-12',
    name: 'Marcus Vance',
    email: 'mvance@apex.co',
    phone: '555-891-2345',
    company: 'Apex Tech',
    status: 'Prospect',
    lastContact: '2023-12-01',
    dealValue: 110000,
    accountOwner: 'Alex Rivera',
    title: 'VP Product',
    createdAt: '2023-07-22',
    notes: [
      { id: 'n12', text: 'Sent custom pricing breakdown for 250 enterprise seats.', createdAt: '2023-12-01T09:00:00Z', author: 'Alex Rivera' }
    ]
  },
  {
    id: 'cust-13',
    name: 'Sophia Martinez',
    email: 'smartinez@nexus.com',
    phone: '555-345-6789',
    company: 'Nexus Systems',
    status: 'Active',
    lastContact: '2023-11-28',
    dealValue: 75000,
    accountOwner: 'David Miller',
    title: 'Chief Revenue Officer',
    createdAt: '2022-05-19',
    notes: []
  },
  {
    id: 'cust-14',
    name: 'Liam O\'Connor',
    email: 'loconnor@quantum.net',
    phone: '555-678-9012',
    company: 'Quantum Dynamics',
    status: 'Lead',
    lastContact: '2023-11-15',
    dealValue: 38000,
    accountOwner: 'Sarah Chen',
    title: 'Security Lead',
    createdAt: '2023-09-02',
    notes: []
  },
  {
    id: 'cust-15',
    name: 'Diana Prince',
    email: 'diana@themyscira.com',
    phone: '555-901-2345',
    company: 'Innovate Solutions Inc.',
    status: 'Active',
    lastContact: '2023-12-10',
    dealValue: 210000,
    accountOwner: 'Alex Rivera',
    title: 'Global Director',
    createdAt: '2021-11-05',
    notes: [
      { id: 'n15', text: 'Contract renewal finalized for another 3 years.', createdAt: '2023-12-10T16:00:00Z', author: 'Alex Rivera' }
    ]
  },
  {
    id: 'cust-16',
    name: 'Bruce Wayne',
    email: 'bruce@wayneenterprises.org',
    phone: '555-019-2837',
    company: 'Wayne Enterprises',
    status: 'Active',
    lastContact: '2023-12-15',
    dealValue: 500000,
    accountOwner: 'Sarah Chen',
    title: 'CEO',
    createdAt: '2020-04-12',
    notes: [
      { id: 'n16', text: 'Requested high-security deployment options.', createdAt: '2023-12-15T11:20:00Z', author: 'Sarah Chen' }
    ]
  },
  {
    id: 'cust-17',
    name: 'Clark Kent',
    email: 'ckent@dailyplanet.com',
    phone: '555-432-1098',
    company: 'Daily Planet',
    status: 'Prospect',
    lastContact: '2023-10-25',
    dealValue: 18000,
    accountOwner: 'David Miller',
    title: 'Senior Reporter',
    createdAt: '2023-08-14',
    notes: []
  },
  {
    id: 'cust-18',
    name: 'Natasha Romanoff',
    email: 'natasha@shield.gov',
    phone: '555-765-4321',
    company: 'Shield Global',
    status: 'Active',
    lastContact: '2023-11-30',
    dealValue: 140000,
    accountOwner: 'Alex Rivera',
    title: 'Operations Manager',
    createdAt: '2022-02-28',
    notes: []
  },
  {
    id: 'cust-19',
    name: 'Peter Parker',
    email: 'peter.parker@midtown.edu',
    phone: '555-654-3210',
    company: 'Apex Tech',
    status: 'Lead',
    lastContact: '2023-09-18',
    dealValue: 12000,
    accountOwner: 'Sarah Chen',
    title: 'Research Assistant',
    createdAt: '2023-09-01',
    notes: []
  },
  {
    id: 'cust-20',
    name: 'Tony Stark',
    email: 'tony@starkindustries.io',
    phone: '555-300-3000',
    company: 'Stark Industries',
    status: 'Active',
    lastContact: '2023-12-20',
    dealValue: 750000,
    accountOwner: 'Sarah Chen',
    title: 'Chairman & CTO',
    createdAt: '2019-10-10',
    notes: [
      { id: 'n20', text: 'Integrating custom AI pipelines with our API.', createdAt: '2023-12-20T18:00:00Z', author: 'Sarah Chen' }
    ]
  }
];

export const PREBUILT_FILTERS: SavedFilter[] = [
  {
    id: 'preset-1',
    name: 'Active Customers',
    isPrebuilt: true,
    filters: {
      statuses: ['Active'],
      companies: [],
      dateRange: { from: null, to: null },
      phoneQuery: '',
      emailQuery: ''
    }
  },
  {
    id: 'preset-2',
    name: 'Recent Contacts',
    isPrebuilt: true,
    filters: {
      statuses: [],
      companies: [],
      dateRange: { from: '2023-11-01', to: '2023-12-31' },
      phoneQuery: '',
      emailQuery: ''
    }
  },
  {
    id: 'preset-3',
    name: 'Inactive Leads',
    isPrebuilt: true,
    filters: {
      statuses: ['Inactive', 'Lead'],
      companies: [],
      dateRange: { from: null, to: null },
      phoneQuery: '',
      emailQuery: ''
    }
  },
  {
    id: 'preset-4',
    name: 'High-value prospects',
    isPrebuilt: true,
    filters: {
      statuses: ['Prospect'],
      companies: [],
      dateRange: { from: null, to: null },
      phoneQuery: '',
      emailQuery: ''
    }
  }
];
