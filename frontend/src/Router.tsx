import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "./pages/Dashboard.page";
import CoursePage from "./pages/Course.page";
import CreateLessonPage from "./pages/admin/CreateLesson.page";
import BaseLayout from "./components/BaseLayout/BaseLayout";
import WelcomePage from "./pages/Welcome.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login" replace />,
  },
  {
    path: "login",
    element: <WelcomePage state="login" />,
  },
  {
    path: "register",
    element: <WelcomePage state="register" />,
  },
  {
    path: "user",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "courses/:courseId",
        element: <CoursePage />,
      },
    ],
  },
  {
    path: "admin",
    element: <BaseLayout />,
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
