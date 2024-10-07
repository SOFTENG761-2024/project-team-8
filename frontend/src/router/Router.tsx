import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "../pages/Dashboard.page";
import CoursePage from "../pages/Course.page";
import CreateLessonPage from "../pages/admin/CreateLesson.page";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import WelcomePage from "../pages/Welcome.page";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import { CourseContextProvider } from "../components/Course/CourseContext";
import BookmarksPage from "../pages/Bookmarks.page";
import BrowsePage from "../pages/Browse.page";

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
        element: <UserRoute />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: "browse",
        element: <UserRoute />,
        children: [
          {
            index: true,
            element: <BrowsePage />,
          },
        ],
      },
      {
        path: "courses/:courseId",
        element: <UserRoute />,
        children: [
          {
            index: true,
            element: (
              <CourseContextProvider>
                <CoursePage />
              </CourseContextProvider>
            ),
          },
        ],
      },
      {
        path: "bookmarks",
        element: <UserRoute />,
        children: [
          {
            index: true,
            element: <BookmarksPage />,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <AdminRoute />,
      },
      {
        path: "create-lesson",
        element: <AdminRoute />,
        children: [
          {
            index: true,
            element: <CreateLessonPage />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
