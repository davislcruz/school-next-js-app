# EduConnect - Educational Communication Platform

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-22%2B-brightgreen)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

A comprehensive **mobile-first** educational communication platform designed to connect students, parents, and educators through intuitive and engaging digital experiences in a child-safe environment.

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

## 🚀 Key Features (Overview)

- Responsive Design
- Newsfeed for community updates
- Event management (academic + extracurricular)
- Real-time messaging
- Children dashboard
- Accessibility-first design

➡️ See full feature details in [FEATURES.md](./FEATURES.md)

---

## 🛠 Technical Architecture (Overview)

Frontend: React + TypeScript + Vite + Tailwind CSS  
Backend: Express + PostgreSQL + Drizzle ORM + WebSocket

➡️ Full architecture: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🗺 Roadmap

Current phase: Core functionality in development.

➡️ Full roadmap: [ROADMAP.md](ROADMAP.md)

---

## 🤝 Contributing

We welcome contributions!

➡️ See guidelines: [CONTRIBUTING.md](CONTRIBUTING.md)

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
gi