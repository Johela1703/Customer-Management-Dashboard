Modern CRM & Customer Management Dashboard

Modern CRM & Customer Management Dashboard is a modern, responsive CRM application built with Next.js 16, React 19, TypeScript, Tailwind CSS, and TanStack Query v5.

The application provides a complete customer relationship management workflow with CRUD operations, advanced search, filtering, sorting, pagination, bulk actions, saved filter views, customer details, interaction timelines, dashboard analytics, optimistic UI updates, and dark/light theme support.

Tech Stack

Category

Technology

Frontend

Next.js 16 + React 19

Language

TypeScript

Styling

Tailwind CSS v3

State & Data Management

TanStack Query v5

Forms

React Hook Form

Validation

Zod

Drag & Drop

@hello-pangea/dnd

Icons

Lucide React

Notifications

Sonner

Theme

next-themes

Date Utilities

date-fns

Utilities

clsx, tailwind-merge

Version Control

Git & GitHub

Installation

Clone repository

git clone https://github.com/yourusername/greentiq-assessment.git

Move into project

cd "Greentiq Assesment"

Install dependencies

npm install

Run development server

npm run dev

Visit

http://localhost:3000

Production Build

npm run build

Start production server

npm run start

Visit

http://localhost:3000

Project Structure

Greentiq Assesment
│
├── screenshots
│   ├── Add Customer details.png
│   ├── Customer Details.png
│   ├── Dashboard.png
│   ├── Search Functionalty.png
│   └── White Toggle.png
│
├── src
│   ├── app
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components
│   ├── hooks
│   └── lib
│
├── AGENTS.md
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json

🚀 Features

Dashboard Analytics: Displays Total Customers, Active Leads & Prospects, Active Clients, and customer trend indicators.

Customer Management:

Add, view, edit, and delete customers.

Manage customer status.

View complete customer profiles.

Advanced Search:

Search by customer name.

Search by email.

Search by company.

Search by phone.

Debounced search.

Advanced Filtering:

Filter by Status.

Filter by Company.

Filter by Email and Phone.

Date-based filtering.

Reset filters.

Sorting:

Sort by customer name, company, status, and dates.

Ascending and descending order.

Works together with search and filters.

Pagination:

Page size options.

Previous and next navigation.

Dynamic record count.

Bulk Actions:

Select individual customers.

Select all customers.

Bulk status update.

Bulk delete.

Saved Filter Views:

Save filter configurations.

Restore saved filters.

Reorder saved views using drag and drop.

Customer Details:

Contact information.

Company and job title.

Deal value.

Account owner.

Created and last-contact dates.

Interaction timeline.

Theme Support:

Dark/night mode.

Light mode.

Theme persistence.

Global Command Palette:

Ctrl + K on Windows/Linux.

Cmd + K on macOS.

Quick customer search and actions.

Optimistic UI:

Immediate UI feedback.

Background synchronization through TanStack Query.

Dashboard Overview

The dashboard provides quick insights into the CRM and current customer activity.

Features include:

Total Customers.

Active Leads & Prospects.

Active Clients.

Customer trend indicators.

Global search.

Customer search.

Filters.

Add Customer action.

Customer table.

Sorting and pagination.

Dashboard



Customer Directory

The Customers page provides a centralized table for managing customer records.

The table displays:

Customer Name.

Email.

Phone.

Company.

Status.

Last Contact Date.

Available actions.

Each record provides actions for viewing, editing, and deleting customers.

The table also supports:

Search.

Filtering.

Sorting.

Pagination.

Multi-selection.

Search Functionality

Users can instantly search customer records using:

Customer Name.

Email.

Company.

Phone.

Search results update dynamically while typing.

The search field uses debouncing to reduce unnecessary processing.

Search Example

Search: Dia

Result:

Diana Prince
diana@themyscira.com
Innovate Solutions Inc.

Search Screenshot



Advanced Filtering

The application provides an advanced filtering system.

Available filters include:

Status.

Company.

Email.

Phone.

Date ranges.

Features include:

Multiple filtering conditions.

Search + filter combination.

Dynamic result updates.

Reset filters.

Example:

Status: Active
Company: Siemens

The customer table updates immediately based on the selected filters.

Saved Filter Views

Frequently used filters can be saved as reusable views.

Example:

Active Customers
Prospects
Recently Contacted
High Value Customers

Saved views allow users to quickly restore previously configured filters.

Saved views can also be reordered using:

@hello-pangea/dnd

Sorting

Customer records can be sorted in ascending or descending order.

Supported sorting includes:

Customer Name.

Company.

Status.

Last Contact Date.

Created Date.

Sorting works together with search, filters, and pagination.

The processing flow is:

Customer Data
      ↓
Filters
      ↓
Search
      ↓
Sort
      ↓
Pagination
      ↓
Customer Table

Add Customer

Users can create a new customer using the Add Customer modal.

Fields include:

Name.

Email.

Phone.

Company.

Status.

Last Contact Date.

Deal Value.

Job Title.

Initial Interaction Notes.

Add Customer Modal



Form Validation

The customer form uses React Hook Form and Zod for type-safe validation.

Validation rules include:

Name

Required.

Valid customer name.

Email

Required.

Valid email format.

Phone

Required.

Company

Required.

Last Contact Date

Required.

Optional fields include:

Deal Value.

Job Title.

Initial Interaction Notes.

Customer Details

The customer details panel provides complete information about the selected customer.

Features include:

Customer name.

Customer initials/avatar.

Job title.

Company.

Status.

Email address.

Phone number.

Deal value.

Last contact date.

Account owner.

Created date.

Interaction timeline.

Customer Details



Interaction Timeline

The customer profile includes an interaction timeline for maintaining account history.

Users can record:

Meetings.

Follow-ups.

Customer requirements.

Technical discussions.

Sales conversations.

Important account notes.

Example:

Sarah Chen

12/20/2023

Integrating custom AI pipelines with our API.

Edit Customer

Existing customer records can be updated using the edit workflow.

Features include:

Prefilled customer information.

Form validation.

Customer information updates.

Status updates.

Deal value updates.

Job title updates.

Notes updates.

After saving, the updated information is reflected in the customer table and details view.

Delete Customer

Customers can be deleted from the customer table or details view.

The application provides toast feedback after deletion.

Where supported, the undo workflow can restore a deleted record.

Bulk Actions

Multiple customer records can be selected using checkboxes.

Supported actions include:

Select individual customers.

Select all customers.

Bulk status update.

Bulk delete.

Bulk actions make it easier to manage multiple records efficiently.

Pagination

The customer table supports configurable pagination.

Page size options include:

5
10
20
50

Features include:

Previous button.

Next button.

Current page indicator.

Dynamic record count.

Search-aware pagination.

Filter-aware pagination.

Example:

Showing 1 to 10 of 21 entries

Notifications

The application uses Sonner for toast notifications.

Notifications provide feedback for:

Customer creation.

Customer updates.

Customer deletion.

Bulk actions.

Validation errors.

Failed operations.

Example:

Customer added successfully

Theme Toggle

The CRM supports both Dark/Night Mode and Light Mode using next-themes.

Dark / Night Mode

The dark interface provides:

Dark navigation.

Dark customer table.

High-contrast cards.

Colored status badges.

Blue, purple, and green dashboard accents.

Dark Dashboard



Light Mode

The light interface provides:

White navigation.

Light customer table.

Soft dashboard cards.

Clear borders.

High readability.

Light Dashboard



State Management

The application uses TanStack Query v5 for data fetching and server-state management.

The data flow is:

UI
 ↓
Custom Hooks
 ↓
TanStack Query
 ↓
Customer Data
 ↓
UI

TanStack Query provides:

Query caching.

Background refetching.

Mutation handling.

Query invalidation.

Loading states.

Error handling.

Optimistic updates.

Optimistic UI

Supported customer mutations can update the interface immediately while the background request is processed.

User Action
      ↓
Optimistic UI Update
      ↓
Background Request
      ↓
Success
      ↓
Cache Synchronization

This improves perceived application performance and provides a smoother user experience.

Challenges Faced

Managing Search, Filters, Sorting & Pagination

The customer table needs to handle several operations simultaneously.

Solution

A predictable data-processing pipeline is used:

Customer Data
      ↓
Filters
      ↓
Search
      ↓
Sort
      ↓
Pagination
      ↓
Render

CRUD State Synchronization

Customer operations involve the table, forms, details panel, and data layer.

Solution

TanStack Query and reusable hooks keep customer-related state synchronized.

Form Validation

The customer form contains multiple required and optional fields.

Solution

React Hook Form manages form state while Zod provides centralized schema validation.

Assumptions

Customer Status

Supported customer lifecycle statuses include:

Active
Lead
Prospect
Inactive

Customer Record

Customer
│
├── Name
├── Email
├── Phone
├── Company
├── Status
├── Last Contact
├── Deal Value
├── Job Title
├── Account Owner
├── Created Date
└── Notes / Interactions

Future Improvements

Backend Integration

Connect the CRM to a production backend using Node.js, Express, PostgreSQL, or MongoDB.

Authentication

Add authentication using Auth.js, JWT, or OAuth.

Role-Based Access Control

Introduce roles such as:

Admin
Sales Manager
Sales Representative
Viewer

Testing

Add Jest, React Testing Library, and Playwright tests for CRUD, search, filtering, sorting, pagination, validation, and bulk actions.

CI/CD

Add GitHub Actions for:

Install
 ↓
Lint
 ↓
Type Check
 ↓
Test
 ↓
Build
 ↓
Deploy

Advanced Analytics

Add revenue analytics, lead conversion, sales pipeline, customer retention, and sales performance reports.