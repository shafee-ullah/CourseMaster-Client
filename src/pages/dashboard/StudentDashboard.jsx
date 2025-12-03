import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { enrollmentAPI } from "../../services/api";
import ProgressBar from "../../components/ProgressBar";
import toast from "react-hot-toast";
import {
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Play,
  CheckCircle,
} from "lucide-react";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active"); // active, completed

  useEffect(() => {
    if (user) {
      fetchMyCourses();
    }
  }, [user, activeTab]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getMyCourses(
        user?.uid || null,
        user?.email || null,
        activeTab
      );
      setEnrollments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please log in to access your dashboard
          </p>
          <Link
            to="/login"
            className="text-red-600 dark:text-red-400 hover:underline font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const stats = {
    totalCourses: enrollments.length,
    completedCourses: enrollments.filter((e) => e.status === "completed")
      .length,
    activeCourses: enrollments.filter((e) => e.status === "active").length,
    averageProgress:
      enrollments.length > 0
        ? Math.round(
            enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) /
              enrollments.length
          )
        : 0,
  };

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user.displayName || user.email}!
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total Courses
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalCourses}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-red-600 dark:text-red-400 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Active Courses
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.activeCourses}
                </p>
              </div>
              <Play className="w-12 h-12 text-blue-600 dark:text-blue-400 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Completed
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.completedCourses}
                </p>
              </div>
              <Award className="w-12 h-12 text-green-600 dark:text-green-400 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Avg. Progress
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.averageProgress}%
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600 dark:text-purple-400 opacity-50" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "active"
                ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Active Courses
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "completed"
                ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Courses List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Loading courses...
            </p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {activeTab === "active"
                ? "No active courses. Start learning today!"
                : "No completed courses yet."}
            </p>
            {activeTab === "active" && (
              <Link
                to="/courses"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors"
              >
                Browse Courses
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment, index) => (
              <motion.div
                key={enrollment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link to={`/courses/${enrollment.course._id}`}>
                  {enrollment.course.thumbnail && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="w-full h-full object-cover"
                      />
                      {enrollment.status === "completed" && (
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {enrollment.course.title}
                    </h3>
                    {enrollment.course.instructor && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {enrollment.course.instructor.displayName ||
                          enrollment.course.instructor.email}
                      </p>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <ProgressBar progress={enrollment.progress || 0} />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {enrollment.completedLessonsCount || 0} /{" "}
                          {enrollment.totalLessons || 0} lessons
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors">
                      {enrollment.status === "completed"
                        ? "Review Course"
                        : "Continue Learning"}
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
