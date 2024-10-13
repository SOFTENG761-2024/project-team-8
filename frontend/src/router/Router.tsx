import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "../components/BaseLayout/BaseLayout";
import { CourseContextProvider } from "../components/Course/CourseContext";
import BookmarksPage from "../pages/Bookmarks.page";
import BrowsePage from "../pages/Browse.page";
import CoursePage from "../pages/Course.page";
import DashboardPage from "../pages/Dashboard.page";
import NotFoundPage from "../pages/NotFound.page";
import WelcomePage from "../pages/Welcome.page";
import CreateLessonPage from "../pages/admin/CreateLesson.page";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

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
      {
        path: "*",
        element: <NotFoundPage />,
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
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
