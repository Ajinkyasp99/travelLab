# TravelTestLab

TravelTestLab is a fully static travel booking website designed specifically for Selenium automation testing practice. It simulates a real-world travel booking platform (like Booking.com or Goibibo) but without any backend, real payments, or real APIs.

## 🚀 Purpose
Provide a realistic testing ground for QA engineers and automation testers to practice form validation, complex data tables, drag-and-drop, modals, toasts, and multi-step booking flows.

## 🛠️ Tech Stack
- React 19
- Vite
- Tailwind CSS & shadcn/ui
- React Router (HashRouter for GitHub Pages)
- LocalStorage for Data Persistence

## 📦 Installation & Setup
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `pnpm install`
3. Run locally: `pnpm dev`
4. Build for production: `pnpm build`
5. Deploy to GitHub Pages: `pnpm deploy`

## 🔑 Test Credentials
**User:**
- Email: `tester@example.com`
- Password: `Test@123`

**Admin:**
- Email: `admin@example.com`
- Password: `Admin@123`

## 🧪 Selenium Selectors Guide
The application uses stable `data-testid` attributes on interactive elements to prevent brittle tests.
Examples:
- `data-testid="login-email-input"`
- `data-testid="flight-search-button"`
- `data-testid="hotel-view-button"`
- `data-testid="payment-submit-button"`

## 🚧 Why HashRouter?
Since the project is built to be a static site hosted on GitHub Pages, `HashRouter` is used to prevent 404 errors on direct navigation or hard refreshes.

## 📊 Suggested Test Cases
1. **Auth**: Login with valid/invalid credentials, logout, restricted routes.
2. **Hotel Booking**: Search, filter by price, view details, reserve, and complete mock payment.
3. **Playground**: Test complex elements in `/testing-playground`.
