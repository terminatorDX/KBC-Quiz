import Dashboard from "./views/Dashboard";
const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/user"
    }
];

export default dashboardRoutes;
