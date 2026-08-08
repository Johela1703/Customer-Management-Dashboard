Modern CRM & Customer Management Dashboard

Modern CRM & Customer Management Dashboard is a modern, high-performance CRM application built with Next.js 16, React 19, TypeScript, Tailwind CSS, and TanStack Query v5.

The application provides a complete customer management experience with CRUD operations, advanced search, filtering, sorting, pagination, bulk actions, saved filter views, drag-and-drop saved views, customer details, interaction timelines, dashboard analytics, optimistic UI updates, and dark/light theme support.

Tech Stack

Category

Technology

Framework

Next.js 16

Frontend

React 19

Language

TypeScript

Styling

Tailwind CSS v3

Data Management

TanStack Query v5

Forms

React Hook Form

Validation

Zod

Form Resolver

@hookform/resolvers

Drag & Drop

@hello-pangea/dnd

Icons

Lucide React

Notifications

Sonner

Theme Management

next-themes

Date Utilities

date-fns

Utilities

clsx, tailwind-merge

Component Variants

class-variance-authority

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

Build the application

npm run build

Start the production server

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
│   │
│   ├── hooks
│   │
│   └── lib
│
├── AGENTS.md
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json

🛠 Features

CRM Dashboard: Displays important customer metrics including total customers, active leads & prospects, active clients, and trend indicators.

Customer Management Table:

Displays customer name, email, phone, company, status, and last contact date.

View customer details.

Edit existing customers.

Delete customers.

Select individual customers.

Select multiple customers.

Bulk customer actions.

Advanced Search:

Search customers by name.

Search by email.

Search by company.

Search by phone.

Debounced search for better performance.

Search results update dynamically.

Advanced Filtering:

Filter by customer status.

Filter by company.

Filter by email.

Filter by phone.

Filter by date ranges.

Reset filters.

Combine search and filtering.

Saved Filter Views:

Save frequently used filter configurations.

Quickly restore saved filters.

Manage multiple saved views.

Reorder saved views using drag-and-drop.

Customer Details:

Customer profile information.

Customer initials/avatar.

Job title.

Company.

Status.

Email.

Phone.

Deal value.

Last contact date.

Account owner.

Created date.

Interaction timeline.

Customer notes.

Customer CRUD Operations:

Add customer.

View customer.

Edit customer.

Delete customer.

Update customer status.

Manage customer information.

Bulk Actions:

Select individual customers.

Select all customers.

Bulk status update.

Bulk delete.

Undo support for supported delete actions.

Pagination:

Configurable page sizes.

Previous and next navigation.

Dynamic record count.

Pagination works with search and filters.

Sorting:

Sort by customer name.

Sort by company.

Sort by status.

Sort by last contact date.

Sort by other supported customer fields.

Ascending and descending order.

Dark and Light Theme:

Professional dark/night CRM interface.

Clean light interface.

Theme toggle in the header.

Theme persistence using next-themes.

Global Command Palette:

Keyboard-driven CRM search and actions.

Ctrl + K on Windows/Linux.

Cmd + K on macOS.

Quickly search customers and access common actions.

Optimistic UI:

Immediate UI feedback for supported mutations.

Background data synchronization.

Cache updates through TanStack Query.

Improved perceived application performance.

Responsive Enterprise UI:

Responsive dashboard.

Sidebar navigation.

Responsive controls.

Modal-based forms.

Customer details drawer.

Light and dark visual themes.

Dashboard Overview

The CRM dashboard provides an overview of customer activity and important business metrics.

Features include:

Total Customers

Active Leads & Prospects

Active Clients

Customer trends

Global search

Customer search

Status filtering

Company filtering

Advanced filters

Add Customer action

Customer table

Sorting

Pagination

Dashboard



Search Functionality

Users can quickly search customer records from the customer management page.

Search supports:

Customer Name

Email

Company

Phone

Search results update dynamically as the user enters a search term.

The search functionality uses debouncing to prevent unnecessary operations while typing.

Search Example

For example:

Search: Dia

The application displays:

Diana Prince
diana@themyscira.com
Innovate Solutions Inc.

Search Screenshot



Global Command Palette

The application provides a keyboard-driven command palette for quick CRM actions.

Keyboard shortcuts:

Windows / Linux

Ctrl + K

macOS

Cmd + K

The command palette can be used to:

Search customers.

Access CRM records.

Create a new customer.

Trigger common actions.

Quickly navigate CRM functionality.

This improves productivity for users who prefer keyboard-driven workflows.

Advanced Filtering

The CRM includes an advanced filtering system.

Available filters include:

Status

Company

Email

Phone

Date ranges

Other supported customer attributes

Features include:

Multiple filter conditions.

Dynamic result updates.

Reset filters.

Search + filter combination.

Saved filter configurations.

Example:

Status: Active

Company: Siemens

The customer table updates automatically based on the selected criteria.

Saved Filter Views

Users can save commonly used filter configurations.

Example saved views:

Active Customers

Prospects

Enterprise Customers

Recently Contacted

High Value Customers

Saved views allow users to quickly restore previously configured filters.

Drag & Drop Saved Views

Saved filter presets can be reordered using drag-and-drop functionality.

The project uses:

@hello-pangea/dnd

Users can arrange saved views according to their workflow and frequently used filters.

Sorting

The customer table supports ascending and descending sorting.

Sortable information includes:

Customer Name

Company

Status

Last Contact Date

Created Date

Sorting works together with:

Search

Filters

Pagination

The data processing flow is:

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

Display Results

Add Customer

Users can create new customer records using the Add Customer modal.

The form includes:

Name

Email

Phone

Company

Status

Last Contact Date

Deal Value

Job Title

Initial Interaction Notes

Add Customer Modal



Form Validation

The customer form uses:

React Hook Form

Zod

@hookform/resolvers

Validation is performed before submitting customer information.

Name

Required

Valid customer name

Email

Required

Valid email format

Phone

Required

Valid phone input

Company

Required

Last Contact Date

Required

Optional Fields

Deal Value

Job Title

Initial Interaction Notes

This ensures that customer records contain valid and consistent information.

Customer Details

The customer details view provides complete information about a selected customer.

The details panel includes:

Customer name

Customer initials/avatar

Job title

Company

Status

Email address

Phone number

Deal value

Last contact date

Account owner

Created date

Interaction timeline

Notes and interactions

Customer Details



Customer Interaction Timeline

The customer details screen includes an interaction timeline.

Users can record important customer interactions such as:

Meetings

Follow-ups

Customer requirements

Technical discussions

Sales conversations

Important account notes

Example:

Sarah Chen

12/20/2023

Integrating custom AI pipelines with our API.

This provides account managers with historical context when managing customer relationships.

Edit Customer

Existing customer records can be updated through the edit workflow.

Features include:

Prefilled customer information.

Form validation.

Update customer details.

Update customer status.

Update deal value.

Update job title.

Update customer notes.

After the update, the customer table and details view reflect the latest information.

Delete Customer

Customers can be deleted from the customer table or customer details view.

Delete workflow:

Delete Customer

↓

Update UI

↓

Remove Customer

↓

Show Success Notification

↓

Undo if supported

Toast notifications provide immediate feedback after the operation.

Bulk Actions

The CRM supports multi-selection for customer records.

Users can:

Select individual customers.

Select all customers.

Update multiple customer statuses.

Delete multiple customers.

Example:

☑ John

☑ Tony Stark

☑ Bruce Wayne

↓

Bulk Action

↓

Update Status

or

Delete Selected

Bulk actions make it easier to manage large customer datasets.

Notifications

The application uses Sonner for toast notifications.

Notifications are displayed for important CRM actions.

Examples include:

Customer added successfully

Customer updated successfully

Customer deleted successfully

Changes saved successfully

Notifications provide immediate feedback without interrupting the current workflow.

Pagination

The customer table supports pagination to make large datasets easier to manage.

Page size options include:

5
10
20
50

Features include:

Previous button.

Next button.

Current page indicator.

Record count.

Dynamic page count.

Search-aware pagination.

Filter-aware pagination.

Example:

Showing 1 to 10 of 21 entries

Theme Toggle

The CRM supports both Dark/Night Mode and Light Mode.

Theme management is implemented using:

next-themes

The theme can be changed from the header.

Dark / Night Mode

The dark theme provides:

Dark navigation.

Dark customer table.

High contrast cards.

Colored status badges.

Blue, purple, and green dashboard accents.

Enterprise-style dark UI.



Light Mode

The light theme provides:

White navigation.

Light customer table.

Soft dashboard cards.

Clear borders.

High readability.



State Management

The application uses TanStack Query v5 for data management and asynchronous state handling.

The general data flow is:

UI Component

↓

Custom Hook

↓

TanStack Query

↓

Customer Data

↓

UI

For mutations:

User Action

↓

Mutation

↓

Optimistic UI Update

↓

Background Request

↓

Success

↓

Cache Synchronization

TanStack Query provides:

Query caching.

Background refetching.

Mutation handling.

Query invalidation.

Loading states.

Error states.

Optimistic updates.

Optimistic UI

The application uses optimistic UI patterns for supported customer mutations.

Instead of waiting for every operation to complete before updating the interface:

User Action

↓

Update UI Immediately

↓

Execute Mutation

↓

Success

↓

Keep Updated State

If the operation fails:

Mutation Failure

↓

Restore Previous State

This improves the perceived speed and responsiveness of the application.

Customer Data Flow

The CRM follows a predictable data processing pipeline.

Customer Data

↓

Filtering

↓

Search

↓

Sorting

↓

Pagination

↓

Render Customer Table

For example:

21 Customers

↓

Status = Active

↓

Search = "Dia"

↓

Sort by Last Contact

↓

Display Matching Results

This keeps search, filtering, sorting, and pagination behavior predictable.

API / Data Layer

The application is structured to support integration with a production backend.

Customer records contain information such as:

id
name
email
phone
company
status
lastContact
dealValue
jobTitle
accountOwner
createdDate
notes

The application architecture allows the current data source to be replaced or extended with a production REST or GraphQL API.

TanStack Query can then manage:

API requests.

API caching.

Mutations.

Refetching.

Error states.

Optimistic updates.

Challenges Faced

Managing Multiple Table States

The customer table needs to handle several operations simultaneously:

Search

Filtering

Sorting

Pagination

Selection

Bulk actions

Solution

A predictable data processing pipeline is used:

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

This keeps the different table features synchronized.

Customer CRUD State Synchronization

Adding, editing, deleting, and viewing customers requires multiple components to stay synchronized.

The main relationship is:

Customer Table
       ↕
Customer Form
       ↕
Customer Details
       ↕
TanStack Query

Solution

TanStack Query and reusable hooks are used to manage customer data and keep the UI synchronized.

Form Validation

Customer information contains both required and optional fields.

Solution

React Hook Form manages form state while Zod provides schema-based validation.

This makes the form type-safe and easier to maintain.

Saved Filter Management

Saved views need to preserve:

Filter values.

Saved configurations.

Ordering.

User selection.

Solution

Saved filter configurations are managed independently while @hello-pangea/dnd provides drag-and-drop reordering.

Theme Management

The application supports both dark and light themes while maintaining consistent styling.

Solution

next-themes manages the active theme while Tailwind CSS provides theme-aware styling.

Performance Considerations

Several techniques are used to keep the application responsive.

Debounced Search

Search input is debounced to avoid unnecessary operations while typing.

TanStack Query Caching

Previously retrieved data can be cached and reused.

Pagination

Only a manageable number of customer records are displayed at a time.

Optimistic Updates

Supported mutations update the interface immediately.

Component-Based Architecture

CRM functionality is separated into reusable components, making the application easier to maintain and optimize.

Responsive Design

The CRM is designed as a modern enterprise dashboard.

Responsive considerations include:

Flexible dashboard cards.

Responsive navigation.

Responsive customer table.

Responsive filter controls.

Responsive modal dialogs.

Responsive customer details panel.

Dark and light theme support.

Assumptions

Customer Status

The CRM supports customer lifecycle statuses such as:

Active
Lead
Prospect
Inactive

These statuses are used throughout:

Customer table

Filters

Dashboard

Status badges

Bulk actions

Dashboard Metrics

Dashboard metrics are calculated from the available customer data.

Primary metrics include:

Total Customers

Active Leads & Prospects

Active Clients

These metrics provide a quick overview of the current CRM state.

Customer Records

Customer records are structured around:

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

Connect the CRM to a production backend using technologies such as:

Node.js

Express

PostgreSQL

MongoDB

This would provide permanent customer data persistence.

Authentication

Add authentication using:

Auth.js

JWT

OAuth

This would provide secure access to the CRM.

Role-Based Access Control

Introduce roles such as:

Admin

Sales Manager

Sales Representative

Viewer

Different roles could have different permissions.

Testing

Add automated testing using:

Jest

React Testing Library

Playwright

Testing can cover:

Customer CRUD

Search

Filtering

Sorting

Pagination

Form validation

Bulk actions

Theme switching

CI/CD

A GitHub Actions pipeline can be added to automate:

Checkout Repository

↓

Install Dependencies

↓

Lint

↓

Type Check

↓

Run Tests

↓

Build

↓

Deploy

Advanced Analytics

Future versions can include:

Revenue analytics.

Customer acquisition trends.

Lead conversion rates.

Sales pipeline.

Customer retention.

Monthly revenue.

Sales performance.

Real-Time Updates

WebSockets or Server-Sent Events can be added to synchronize customer changes between multiple CRM users in real time.

Screenshots

Dashboard - Dark / Night Mode



Dashboard - Light Mode



Search Functionality



Add Customer



Customer Details



Conclusion

Modern CRM & Customer Management Dashboard provides a complete customer relationship management experience using a modern Next.js and React technology stack.

The project demonstrates practical implementation of:

Next.js 16

React 19

TypeScript

Tailwind CSS

TanStack Query

React Hook Form

Zod

Customer CRUD operations

Advanced search

Filtering

Sorting

Pagination

Bulk actions

Saved filter views

Drag-and-drop

Optimistic UI

Customer interaction timelines

Dashboard analytics

Dark/night mode

Light mode

Responsive enterprise UI

The application is structured so it can be extended into a production CRM with backend persistence, authentication, role-based access control, automated testing, CI/CD, real-time synchronization, and advanced business analytics.