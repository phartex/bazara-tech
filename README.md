# Bazara – Analytics Dashboard

Bazara Tech is a **Next.js + TypeScript** analytics dashboard application that includes authentication, protected routes, responsive UI components, and interactive charts.  
It follows modern frontend development best practices with emphasis on **type safety**, **reusable components**, **performance**, and **accessibility**.

---

## 📌 Features

- **Login Flow** with email/password authentication and mock backend validation.
- **Protected Routes** using HTTP-only cookies and Next.js edge middleware.
- **Dashboard** with analytics cards, charts, and ticket statistics.
- **Responsive Layout** supporting desktop, tablet, and mobile views.
- **Reusable UI Components** for forms, cards, charts, and navigation.
- **TypeScript Strict Mode** for maximum type safety.
- **Testing Coverage ≥ 80%** using Jest + React Testing Library.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Context
- **Validation:** Yup 
- **Charts:** Recharts
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel

---

---

## 🚀 Branches

- **Main:** Default branch
- **dashboard:** 
- **login-authentocation:** 
---


## 🚀 Live Link: [https://bazara-tech.netlify.app/]

---

## 🛠 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hemarle/bazara.git
   cd bazara
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```



---

## 🔑 Authentication Flow

- **Valid Credentials:**
  ```
  Email: admin@example.com
  Password: Password1!
  ```
- **Invalid credentials** return `"Invalid credentials"`.
- On successful login:
  - A mock JWT token is stored in state & HTTP-only cookie.
  - User is redirected to `/dashboard`.
- **Protected Routes**: `/dashboard` redirects to `/login` if the token is missing or invalid.

---

## 📊 Dashboard

- Displays **data cards** and **charts** based on mock data in `data/dashboard.ts`.
- Ticket resolution percentage is **retrieved directly from the backend** (or mock backend) rather than calculated client-side.  
  This ensures accuracy since not all agents may be shown, and client-side calculations could be misleading.
- Statistics are **passed as an array** so new ticket statistics can easily be added by simply updating the backend response — no structural changes needed in the frontend.

---

## 🧪 Testing

- **Unit Tests**: Forms, cards, and key components.
- **Tools**: Jest + React Testing Library.
- **Coverage**: ≥ 80% for lines and functions.

---

## 🎯 Design Reasoning & Justification

1. **Ticket Resolution Percentage**  
   The percentage of tickets resolved by agents is **fetched from the backend** rather than computed on the client.  
   This is intentional because the dataset displayed in the UI may not include all agents, so only the backend can accurately calculate the percentage.

2. **Statistics as an Array**  
   The statistics section is implemented as an array, allowing easy expansion in the future.  
   If new ticket statistics are added on the backend, the frontend can render them dynamically without major code changes.

---

## 🏛 Architecture Decision Record (ADR)

### ADR 001 – Framework & Language
**Decision:** Use Next.js with TypeScript (strict mode).  
**Rationale:**  
- Server-side rendering (SSR) for SEO and performance.  
- API routes for authentication handling.  
- Strong type safety to reduce runtime errors.  

---

### ADR 002 – Authentication Approach
**Decision:** Mock authentication with email/password, store token in HTTP-only cookie, and guard `/dashboard` with middleware.  
**Rationale:**  
- HTTP-only cookies improve security against XSS attacks.  
- Middleware ensures edge validation before page render.  

---

### ADR 003 – State Management
**Decision:** Use React Context or Zustand for auth state.  
**Rationale:**  
- Lightweight global state without overcomplicating with Redux.  
- Zustand provides simpler API and performance benefits.  

---

### ADR 004 – Ticket Resolution Percentage Source
**Decision:** Fetch percentage from backend instead of calculating locally.  
**Rationale:**  
- Backend has the full dataset to calculate accurate statistics.  
- Client-side calculations risk inaccuracy if data is partial.  

---

### ADR 005 – Statistics Data Structure
**Decision:** Pass statistics as an array from backend.  
**Rationale:**  
- Allows for easy extension if new statistics are added.  
- Reduces frontend hardcoding, making UI adaptable to data changes.  

---

### ADR 006 – Styling Strategy
**Decision:** Use Tailwind CSS with a theme configuration.  
**Rationale:**  
- Utility-first styling speeds up development.  
- Central theme file allows easy color and typography changes.  

---

## 📄 License

This project is licensed under the MIT License.
