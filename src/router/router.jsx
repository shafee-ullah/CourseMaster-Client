import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import BrowseCourses from "../pages/courses/BrowseCourses.jsx";
import CourseDetails from "../pages/courses/CourseDetails.jsx";
import CoursePlayer from "../pages/courses/CoursePlayer.jsx";
import QuizPage from "../pages/quizzes/QuizPage.jsx";
import AdminDashboard from "../pages/dashboard/AdminDashboard.jsx";
import StudentDashboard from "../pages/dashboard/StudentDashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AboutPage from "../pages/AboutUS/AboutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "courses",
        element: <BrowseCourses />,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "about",
        element: <AboutPage/>,
      },
      {
        path: "player/:enrollmentId",
        element: (
          <ProtectedRoute>
            <CoursePlayer />
          </ProtectedRoute>
        ),
      },
      {
        path: "quizzes/:quizId",
        element: (
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
    ],
  },
]);

export default router;
