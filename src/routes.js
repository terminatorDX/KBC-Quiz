import Dashboard from "./views/Dashboard";
import Quiz from "./views/Quiz";
const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/admin"
    },
    {
        path: "/quiz",
        name: "Quiz",
        component: Quiz,
        layout: "/admin"
    }
];

export default dashboardRoutes;
