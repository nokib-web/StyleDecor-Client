import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/Services/ServiceDetails";
import Coverage from "../pages/Coverage/Coverage";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import MyBookings from "../pages/Dashboard/User/MyBookings";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import Payment from "../pages/Dashboard/User/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/User/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/Dashboard/User/Payment/PaymentCanceled";
import ManageDecorators from "../pages/Dashboard/Admin/ManageDecorators";
import ManageServices from "../pages/Dashboard/Admin/ManageServices";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import AdminAnalytics from "../pages/Dashboard/Admin/AdminAnalytics";
import AssignedProjects from "../pages/Dashboard/Decorator/AssignedProjects";
import DecoratorEarnings from "../pages/Dashboard/Decorator/DecoratorEarnings";


const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'services',
                Component: Services

            },
            {
                path: 'services/:id',
                Component: ServiceDetails
            },
            {
                path: "coverage",
                Component: Coverage,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())

            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            // User Routes
            {
                path: 'profile',
                Component: UserProfile
            },

            {
                path: 'bookings',
                Component: MyBookings
            },
            {
                path: 'payment/:bookingId',
                Component: Payment
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-canceled',
                Component: PaymentCanceled
            },

            // Admin Routes
            {
                path: 'admin-home',
                Component: AdminAnalytics
            },
            {
                path: 'manage-users',
                Component: ManageDecorators
            },
            {
                path: 'manage-services',
                Component: ManageServices
            },
            {
                path: 'manage-bookings',
                Component: ManageBookings
            },

            // Decorator Routes
            {
                path: 'assigned-projects',
                Component: AssignedProjects
            },
            {
                path: 'decorator-earnings',
                Component: DecoratorEarnings
            },
        ]
    }
]);
export default router;