# EduConnect - Educational Communication Platform

![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)
![Node.js](https://img.shields.io/badge/node-22%2B-brightgreen)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

A comprehensive **mobile-first** educational communication platform designed to connect students, parents, and educators through intuitive and engaging digital experiences in a child-safe environment.

---

## 🎯 Purpose & Goals

EduConnect serves as a centralized hub for school communication — bringing together academic progress tracking, community engagement, event management, and real-time messaging in one cohesive platform.

The application aims to strengthen the educational community by facilitating seamless communication between all stakeholders while maintaining a secure, moderated space.

### Primary Objectives

- **Streamline School Communication**
- **Enhance Parental Engagement**
- **Foster a Sense of Community**
- **Improve Educational Outcomes**
- **Ensure Child Safety**

---

## 🚀 Key Features

### 📱 Responsive Design

- Mobile-first architecture
- Adaptive layouts (mobile, tablet, desktop)
- Progressive Web App (offline capabilities, app-like UX)

### 🏠 Newsfeed (Home)

- Social stories
- Event highlights
- Interactive timeline ("This Year", "Memories")
- Like, comment, share

### 📅 Events Management

- Academic events (conferences, grades, testing)
- Activity events (clubs, sports, trips, fundraisers)
- Categorization: academic / extracurricular
- Event details: dates, times, locations
- RSVP system

### 💬 Real-Time Messaging

- Secure direct messaging
- Group chats (class/activity based)
- Message threading and search
- Read receipts
- File sharing (role-based permissions)
- WebSocket integration planned (`Socket.IO` / `ws` TBD)

### 👶 Children Dashboard

- Student profiles
- Academic progress (grades, assignments, milestones)
- Gamified achievements
- Activity tracking
- Parent insights & analytics

---

## 🛠 Technical Architecture

Frontend: React + TypeScript + Vite + Tailwind CSS  
Backend: Express + PostgreSQL + Drizzle ORM + WebSocket

➡️ Full architecture: [Architecture](./ARCHITECTURE.md)

---

## 🤝 Contributing

We welcome contributions!

➡️ See guidelines: [Contributing](./CONTRIBUTING.md)

---

## 🔧 Getting Started

### Prerequisites

- Node.js 22+ and npm 11+
- PostgreSQL (local/cloud)
- Modern browser

### Installation

```bash
git clone <repository-url>
cd educonnect-platform
npm install
cp .env.example .env
# Configure DB connection

npm run db:push
npm run dev
