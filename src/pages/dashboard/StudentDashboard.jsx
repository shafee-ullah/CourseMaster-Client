import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { enrollmentAPI, quizAPI, assignmentAPI } from "../../services/api";
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
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active"); // active, completed, quizzes
  const [quizzes, setQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [assignmentCourse, setAssignmentCourse] = useState(null);
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    link: "",
    description: "",
  });

  useEffect(() => {
    if (!user) return;
    if (activeTab === "quizzes") {
      fetchMyQuizzes();
    } else {
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

  const fetchMyQuizzes = async () => {
    try {
      setLoadingQuizzes(true);
      // first get active enrollments (courses)
      const res = await enrollmentAPI.getMyCourses(
        user?.uid || null,
        user?.email || null,
        "active"
      );
      const myEnrollments = res.data || [];
      const allQuizzes = [];

      for (const en of myEnrollments) {
        if (!en.course?._id) continue;
        try {
          const qRes = await quizAPI.getQuizzesByCourse(
            en.course._id,
            user?.uid || null,
            user?.email || null
          );
          (qRes.data || []).forEach((q) =>
            allQuizzes.push({ quiz: q, course: en.course })
          );
        } catch (err) {
          console.error(
            "Failed to load quizzes for course",
            en.course._id,
            err
          );
        }
      }

      setQuizzes(allQuizzes);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
      toast.error("Failed to load quizzes");
    } finally {
      setLoadingQuizzes(false);
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
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "quizzes"
                ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Quizzes
          </button>
        </div>

        {/* Courses / Quizzes List */}
        {activeTab === "quizzes" ? (
          loadingQuizzes ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Loading quizzes...
              </p>
            </div>
          ) : quizzes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No quizzes available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map(({ quiz, course }, index) => (
                <motion.div
                  key={quiz._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col gap-3"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {course.title}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {quiz.title}
                  </h3>
                  {quiz.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {quiz.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {quiz.questions.length} questions
                  </p>
                  <button
                    onClick={() => navigate(`/quizzes/${quiz._id}`)}
                    className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                  >
                    Take Quiz
                  </button>
                </motion.div>
              ))}
            </div>
          )
        ) : loading ? (
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

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/player/${enrollment._id}`);
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                      >
                        {enrollment.status === "completed"
                          ? "Review Course"
                          : "Continue Learning"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAssignmentCourse(enrollment.course);
                          setAssignmentForm({ link: "", description: "" });
                          setShowAssignmentForm(true);
                        }}
                        className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                      >
                        Submit Assignment
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      {showAssignmentForm && assignmentCourse && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Submit Assignment - {assignmentCourse.title}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setAssignmentLoading(true);
                  await assignmentAPI.submitAssignment(
                    {
                      courseId: assignmentCourse._id,
                      title: `Assignment for ${assignmentCourse.title}`,
                      description: assignmentForm.description,
                      submissionLink: assignmentForm.link,
                    },
                    user?.uid || null,
                    user?.email || null
                  );
                  toast.success("Assignment submitted successfully!");
                  setShowAssignmentForm(false);
                } catch (error) {
                  console.error("Failed to submit assignment:", error);
                  toast.error(
                    error.response?.data?.message ||
                      error.response?.data?.errors?.[0]?.message ||
                      "Failed to submit assignment"
                  );
                } finally {
                  setAssignmentLoading(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Google Drive / Submission Link *
                </label>
                <input
                  type="url"
                  required
                  value={assignmentForm.link}
                  onChange={(e) =>
                    setAssignmentForm((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }))
                  }
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes / Text Answer (optional)
                </label>
                <textarea
                  rows={4}
                  value={assignmentForm.description}
                  onChange={(e) =>
                    setAssignmentForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none"
                  placeholder="Add any extra details or text answer here"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={assignmentLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {assignmentLoading ? "Submitting..." : "Submit Assignment"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssignmentForm(false)}
                  className="flex-1 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-2xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
