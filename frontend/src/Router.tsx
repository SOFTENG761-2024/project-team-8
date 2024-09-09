import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/Dashboard.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import CoursePage from "./pages/Course.page";
import CreateLessonPage from "./pages/admin/CreateLesson.page";
import DemoDashboardPage from "./pages/DemoDashboard.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard-test",
    element: <DemoDashboardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/courses/:courseId",
    element: <CoursePage />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "create-lesson",
        element: <CreateLessonPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
