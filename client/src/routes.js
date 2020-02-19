import Dashboard from "./views/Dashboard";
import Quiz from "./views/Quiz";
const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/user"
    },
    {
        path: "/quiz",
        name: "Quiz",
        component: Quiz,
        layout: "/user"
    }
];

export default dashboardRoutes;
