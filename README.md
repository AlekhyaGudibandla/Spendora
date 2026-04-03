# Spendora — Intelligent Finance Dashboard

Spendora is a modern finance dashboard built to make transaction data easier to understand and act on.

It focuses on clarity, structure, and small details that improve how users explore their financial activity.

---

## Features

### Overview

* Summary of balance, income, and expenses
* Clear visual hierarchy for quick scanning

### Visualizations

* Time-based cashflow trends
* Category-wise spending breakdown
* Smooth updates with responsive charts

### Transactions

* Search, filter, and sort functionality
* Grouping by category or type
* Clean, structured table layout

### Export

* Download data as CSV or JSON
* Supports exporting filtered results

### Role-Based Access

* Viewer → read-only access
* Admin → full edit capabilities
* Restrictions handled at both UI and state level

### Theme

* Dark and light modes with a consistent visual system
* Designed for readability over long usage

---

## What makes it different

* Focuses on usability rather than just visual output
* Avoids template-style dashboards in favor of a more refined layout
* Implements role-based behavior in a way that mirrors real applications
* Pays attention to interaction details like empty states and transitions

---

## Design

The interface uses a restrained palette built around sage, charcoal, and neutral tones.

The goal was to keep it calm, readable, and slightly distinctive without being distracting.

---

## Tech Stack

* React (Vite)
* Tailwind CSS + shadcn/ui
* Zustand (state management with persistence)
* Recharts
* Framer Motion
* Lucide Icons

---

## Getting Started

### Install

```bash
git clone https://github.com/AlekhyaGudibandla/Spendora.git
cd Spendora
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

---