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
import MyWishlist from "../pages/Dashboard/User/MyWishlist";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import Payment from "../pages/Dashboard/User/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/User/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/Dashboard/User/Payment/PaymentCanceled";
import ManageDecorators from "../pages/Dashboard/Admin/ManageDecorators";
import ManageServices from "../pages/Dashboard/Admin/ManageServices";
import AddService from "../pages/Dashboard/Admin/AddService";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import AdminAnalytics from "../pages/Dashboard/Admin/AdminAnalytics";
import AssignedProjects from "../pages/Dashboard/Decorator/AssignedProjects";
import DecoratorEarnings from "../pages/Dashboard/Decorator/DecoratorEarnings";
import MyPortfolio from "../pages/Dashboard/Decorator/MyPortfolio";
import Gallery from "../pages/Gallery/Gallery";
import StyleQuiz from "../pages/StyleQuiz/StyleQuiz";
import BecomeDecorator from "../pages/BecomeDecorator/BecomeDecorator";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import DecoratorRoute from "./DecoratorRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";


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
                path: 'gallery',
                Component: Gallery
            },
            {
                path: 'style-quiz',
                Component: StyleQuiz
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
            {
                path: "become-decorator",
                element: <PrivateRoute><BecomeDecorator></BecomeDecorator></PrivateRoute>
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
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
                path: 'wishlist',
                Component: MyWishlist
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
                element: <AdminRoute><AdminAnalytics></AdminAnalytics></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageDecorators></ManageDecorators></AdminRoute>
            },
            {
                path: 'manage-services',
                element: <AdminRoute><ManageServices></ManageServices></AdminRoute>
            },
            {
                path: 'add-service',
                element: <AdminRoute><AddService /></AdminRoute>
            },
            {
                path: 'manage-bookings',
                element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
            },

            // Decorator Routes
            {
                path: 'assigned-projects',
                element: <DecoratorRoute><AssignedProjects /></DecoratorRoute>
            },
            {
                path: 'decorator-earnings',
                element: <DecoratorRoute><DecoratorEarnings /></DecoratorRoute>
            },
            {
                path: 'my-portfolio',
                element: <DecoratorRoute><MyPortfolio /></DecoratorRoute>
            },

        ]
    }
]);
export default router;