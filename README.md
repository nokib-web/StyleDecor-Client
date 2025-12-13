# 🎨 StyleDecor — Premium Decoration Service Platform

![StyleDecor Banner](https://img.shields.io/badge/Style-Decor-ff6b6b?style=for-the-badge&logo=mediamarkt&logoColor=white)

**StyleDecor** is a modern, full-stack web application designed to streamline the connection between clients and professional decorators. Whether planning a wedding, birthday, or corporate event, StyleDecor offers a seamless booking experience with integrated payments, real-time status tracking, and role-based dashboards.

---

## 🔗 Live Demo
### 🚀 [Client Application](https://style-decor-client-two.vercel.app/)
### 🔌 [Backend API](https://style-decor-server-mkbq.onrender.com)

---

## 🛠️ Technology Stack

This project utilizes the latest web technologies to ensure performance, scalability, and a premium user experience.

### **Frontend**
*   **Core**: ![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
*   **Styling**: ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat&logo=daisyui&logoColor=white)
*   **State & Data**: ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=react-query&logoColor=white)
*   **Authentication**: ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
*   **Payments**: ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white)
*   **Animation**: `framer-motion`, `swiper`
*   **Maps**: `react-leaflet`
*   **Visualization**: `recharts`

---

## 🌟 Key Features

### 👤 For Users (Clients)
*   **Service Discovery**: Browse vast categories of decoration services with advanced filtering and search.
*   **Smart Booking System**: Schedule appointments with real-time slot availability.
*   **Secure Payments**: Integrated **Stripe Payment Element** for safe and easy transactions.
*   **Coupon System**: Apply promotional codes (e.g., `STYLE20`) for instant discounts.
*   **Tracking**: Monitor booking status from *Pending* to *Completed* via the user dashboard.
*   **Wishlist & Reviews**: Save favorite services and leave review ratings after service completion.

### 🎨 For Decorators (Providers)
*   **Project Management**: View assigned projects with detailed requirements and addresses.
*   **Status Updates**: Update project phases (e.g., *Planning*, *On-way*, *Setup*) to keep clients informed.
*   **Earnings Tracker**: Visualize income and completed projects.
*   **Portfolio**: Manage and showcase previous work in a public gallery.

### 🛡️ For Admins
*   **User Management**: Manage user roles (promote users to Decorators or Admins).
*   **Service Control**: Add, edit, or remove decoration services and packages.
*   **Booking Oversight**: Assign decorators to specific bookings and oversee all platform activity.
*   **Analytics Dashboard**: Visual insights into revenue, booking trends, and user growth using Recharts.

---

## 📦 Dependencies

| Package | Version | Usage |
| :--- | :--- | :--- |
| `react` | ^19.2.0 | Core Framework |
| `react-router` | ^7.10.1 | Client-side Routing |
| `axios` | ^1.13.2 | HTTP Requests |
| `firebase` | ^12.6.0 | Auth & Backend Services |
| `@stripe/react-stripe-js`| ^5.4.1 | Payment Components |
| `sweetalert2` | ^11.26.4 | Beautiful Alerts |
| `react-hook-form` | ^7.68.0 | Form Handling |

---

## 🚀 Getting Started Locally

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/style-decor-client.git
    cd style-decor-client
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Firebase and Stripe keys:
    ```env
    VITE_API_URL=http://localhost:5000
    VITE_apiKey=YOUR_FIREBASE_API_KEY
    VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
    VITE_projectId=YOUR_PROJECT_ID
    VITE_payment_gateway_pk=YOUR_STRIPE_PUBLIC_KEY
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
