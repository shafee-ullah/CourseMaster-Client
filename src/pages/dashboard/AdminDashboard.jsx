import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import {
  courseAPI,
  quizAPI,
  assignmentAPI,
  enrollmentAPI,
} from "../../services/api";
import CourseForm from "../courses/CourseForm";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, BookOpen, Users, Clock } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizManagerCourse, setQuizManagerCourse] = useState(null);
  const [courseQuizzes, setCourseQuizzes] = useState([]);
  const [courseQuizzesLoading, setCourseQuizzesLoading] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [quizForm, setQuizForm] = useState({
    courseId: "",
    title: "",
    description: "",
    isPublished: true,
    questions: [{ questionText: "", options: ["", ""], correctIndex: 0 }],
  });
  const [assignments, setAssignments] = useState([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [enrollmentStats, setEnrollmentStats] = useState([]);
  const [enrollmentStatsLoading, setEnrollmentStatsLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [enrollmentManagerCourse, setEnrollmentManagerCourse] = useState(null);
  const [courseEnrollments, setCourseEnrollments] = useState([]);
  const [courseEnrollmentsLoading, setCourseEnrollmentsLoading] =
    useState(false);

  useEffect(() => {
    if (user) {
      fetchCourses();
      fetchAdminAssignments();
      fetchEnrollmentAnalytics();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // For now, get all courses. Later we can filter by instructor
      const response = await courseAPI.getAllCourses({ status: "" });
      setCourses(response.data || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      setFormLoading(true);
      await courseAPI.createCourse({
        ...courseData,
        firebaseUID: user?.uid || null,
        email: user?.email || null,
      });
      toast.success("Course created successfully!");
      setShowForm(false);
      fetchCourses();
    } catch (error) {
      console.error("Failed to create course:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.errors?.[0] ||
        error.message ||
        "Failed to create course";
      toast.error(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateCourse = async (courseData) => {
    try {
      setFormLoading(true);
      await courseAPI.updateCourse(editingCourse._id, {
        ...courseData,
        firebaseUID: user?.uid || null,
        email: user?.email || null,
      });
      toast.success("Course updated successfully!");
      setShowForm(false);
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Failed to update course:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        "Failed to update course";
      toast.error(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await courseAPI.deleteCourse(
        courseId,
        user?.uid || null,
        user?.email || null
      );
      toast.success("Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  // Quiz helpers
  const handleQuizFieldChange = (field, value) => {
    setQuizForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuizQuestionChange = (index, field, value) => {
    setQuizForm((prev) => {
      const questions = [...prev.questions];
      questions[index] = { ...questions[index], [field]: value };
      return { ...prev, questions };
    });
  };

  const handleQuizOptionChange = (qIndex, optIndex, value) => {
    setQuizForm((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[qIndex].options];
      options[optIndex] = value;
      questions[qIndex] = { ...questions[qIndex], options };
      return { ...prev, questions };
    });
  };

  const addQuizQuestion = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { questionText: "", options: ["", ""], correctIndex: 0 },
      ],
    }));
  };

  const openQuizFormForCreate = () => {
    setEditingQuiz(null);
    setQuizForm({
      courseId: "",
      title: "",
      description: "",
      isPublished: true,
      questions: [{ questionText: "", options: ["", ""], correctIndex: 0 }],
    });
    setShowQuizForm(true);
  };

  const openQuizFormForEdit = (quiz) => {
    setEditingQuiz(quiz);
    setQuizForm({
      courseId: quiz.course?._id || quiz.course || "",
      title: quiz.title || "",
      description: quiz.description || "",
      isPublished: quiz.isPublished ?? true,
      questions:
        quiz.questions && quiz.questions.length
          ? quiz.questions.map((q) => ({
              questionText: q.questionText,
              options: q.options || ["", ""],
              correctIndex: q.correctIndex ?? 0,
            }))
          : [{ questionText: "", options: ["", ""], correctIndex: 0 }],
    });
    setShowQuizForm(true);
  };

  const resetQuizFormState = () => {
    setShowQuizForm(false);
    setEditingQuiz(null);
    setQuizForm({
      courseId: "",
      title: "",
      description: "",
      isPublished: true,
      questions: [{ questionText: "", options: ["", ""], correctIndex: 0 }],
    });
  };

  const handleSubmitQuizForm = async (e) => {
    e.preventDefault();
    try {
      setQuizLoading(true);
      if (!quizForm.courseId) {
        toast.error("Please select a course");
        return;
      }
      if (editingQuiz) {
        await quizAPI.updateQuiz(
          editingQuiz._id,
          {
            title: quizForm.title,
            description: quizForm.description,
            isPublished: quizForm.isPublished,
            questions: quizForm.questions,
          },
          user?.uid || null,
          user?.email || null
        );
        toast.success("Quiz updated successfully");
      } else {
        await quizAPI.createQuiz(
          quizForm,
          user?.uid || null,
          user?.email || null
        );
        toast.success("Quiz created successfully");
      }

      // Refresh quizzes list in manager if a course is selected
      if (quizManagerCourse) {
        await fetchCourseQuizzes(quizManagerCourse);
      }

      resetQuizFormState();
    } catch (error) {
      console.error("Failed to save quiz:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Failed to save quiz";
      toast.error(msg);
    } finally {
      setQuizLoading(false);
    }
  };

  const fetchCourseQuizzes = async (course) => {
    try {
      setCourseQuizzesLoading(true);
      setQuizManagerCourse(course);
      const res = await quizAPI.getQuizzesByCourse(
        course._id,
        user?.uid || null,
        user?.email || null
      );
      // API returns { success, data, count }
      setCourseQuizzes(res.data || []);
    } catch (error) {
      console.error("Failed to load quizzes for course:", error);
      toast.error("Failed to load quizzes for this course");
    } finally {
      setCourseQuizzesLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) {
      return;
    }
    try {
      await quizAPI.deleteQuiz(quizId, user?.uid || null, user?.email || null);
      toast.success("Quiz deleted successfully");
      if (quizManagerCourse) {
        await fetchCourseQuizzes(quizManagerCourse);
      }
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      toast.error(error.response?.data?.message || "Failed to delete quiz");
    }
  };

  const fetchAdminAssignments = async () => {
    try {
      setAssignmentsLoading(true);
      const res = await assignmentAPI.getAllAssignmentsAdmin(
        user?.uid || null,
        user?.email || null
      );
      setAssignments(res.data || []);
    } catch (error) {
      console.error("Failed to load assignments for admin:", error);
      toast.error("Failed to load assignment submissions");
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const fetchEnrollmentAnalytics = async () => {
    try {
      setEnrollmentStatsLoading(true);
      const res = await enrollmentAPI.getEnrollmentAnalytics(
        user?.uid || null,
        user?.email || null,
        30
      );
      setEnrollmentStats(res.data || []);
    } catch (error) {
      console.error("Failed to load enrollment analytics:", error);
      toast.error("Failed to load analytics");
    } finally {
      setEnrollmentStatsLoading(false);
    }
  };

  const fetchCourseEnrollments = async (course) => {
    try {
      setCourseEnrollmentsLoading(true);
      setEnrollmentManagerCourse(course);
      const res = await enrollmentAPI.getEnrollmentsByCourse(
        course._id,
        user?.uid || null,
        user?.email || null
      );
      setCourseEnrollments(res.data || []);
    } catch (error) {
      console.error("Failed to load enrollments for course:", error);
      toast.error("Failed to load enrollments for this course");
    } finally {
      setCourseEnrollmentsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to access the admin dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        {/* <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your courses, quizzes, assignments, and analytics
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-2xl transition-colors w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                Create Course
              </button>
            )}
            {!showQuizForm && (
              <button
                onClick={openQuizFormForCreate}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-2xl transition-colors w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                Create Quiz
              </button>
            )}
          </div>
        </div> */}

        <div className="w-full">
          {/* Title & Description */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your courses, quizzes, assignments, and analytics
            </p>
          </div>

          {/* Buttons - Stack on mobile, align right on sm+ screens */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-2xl transition-colors w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                Create Course
              </button>
            )}
            {!showQuizForm && (
              <button
                onClick={openQuizFormForCreate}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-2xl transition-colors w-full sm:w-auto"
              >
                <Plus className="w-5 h-5" />
                Create Quiz
              </button>
            )}
          </div>
        </div>

        {/* Top Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollments Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Enrollments (Last 30 Days)
            </h2>
            {enrollmentStatsLoading ? (
              <p className="text-gray-500 dark:text-gray-400">
                Loading analytics...
              </p>
            ) : enrollmentStats.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No enrollment data available yet.
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={enrollmentStats}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#dc2626"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          {/* Recent Assignment Submissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Assignment Submissions
            </h2>
            {assignmentsLoading ? (
              <p className="text-gray-500 dark:text-gray-400">
                Loading assignments...
              </p>
            ) : assignments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No assignments submitted yet.
              </p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {assignments.map((a) => (
                  <div
                    key={a._id}
                    className="flex items-start justify-between gap-3 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-2"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Course: {a.course?.title || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Student:{" "}
                        {a.student?.displayName ||
                          a.student?.email ||
                          "Unknown"}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {a.createdAt
                          ? new Date(a.createdAt).toLocaleString()
                          : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedAssignment(a)}
                      className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Course Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingCourse ? "Edit Course" : "Create New Course"}
            </h2>
            <CourseForm
              course={editingCourse}
              onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
              onCancel={handleCancel}
              loading={formLoading}
            />
          </motion.div>
        )}

        {/* Courses List */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Courses
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Loading courses...
                </p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No courses yet. Create your first course!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-2xl transition-colors"
                >
                  Create Course
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-50 dark:bg-slate-700 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
                  >
                    {course.thumbnail && (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {course.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            course.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : course.status === "draft"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                        {course.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-red-600 dark:text-red-400">
                            ${course.price}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(course)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-xl transition-colors"
                              title="Edit course"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course._id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-xl transition-colors"
                              title="Delete course"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => fetchCourseQuizzes(course)}
                            className="flex-1 text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-xl py-2 px-3 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <BookOpen className="w-4 h-4" />
                            Manage Quizzes
                          </button>
                          <button
                            onClick={() => fetchCourseEnrollments(course)}
                            className="flex-1 text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-xl py-2 px-3 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Users className="w-4 h-4" />
                            View Enrollments
                          </button>
                        </div>
                      </div>
                      {course.syllabus && course.syllabus.length > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {course.syllabus.length} lesson
                          {course.syllabus.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Quiz Form Modal */}
        {showQuizForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {editingQuiz ? "Edit Quiz" : "Create Quiz"}
              </h2>
              <form onSubmit={handleSubmitQuizForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Course *
                  </label>
                  <select
                    value={quizForm.courseId}
                    onChange={(e) =>
                      handleQuizFieldChange("courseId", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quiz Title *
                    </label>
                    <input
                      type="text"
                      value={quizForm.title}
                      onChange={(e) =>
                        handleQuizFieldChange("title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <input
                      id="quiz-published"
                      type="checkbox"
                      checked={quizForm.isPublished}
                      onChange={(e) =>
                        handleQuizFieldChange("isPublished", e.target.checked)
                      }
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="quiz-published"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Publish quiz immediately
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={quizForm.description}
                    onChange={(e) =>
                      handleQuizFieldChange("description", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Short description of this quiz"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Questions
                    </p>
                    <button
                      type="button"
                      onClick={addQuizQuestion}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      + Add Question
                    </button>
                  </div>

                  {quizForm.questions.map((q, qIndex) => (
                    <div
                      key={qIndex}
                      className="bg-gray-50 dark:bg-slate-700 p-4 rounded-2xl space-y-3 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          Question {qIndex + 1}
                        </p>
                      </div>
                      <input
                        type="text"
                        placeholder="Question text"
                        value={q.questionText}
                        onChange={(e) =>
                          handleQuizQuestionChange(
                            qIndex,
                            "questionText",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                      />

                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => (
                          <div
                            key={optIndex}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={q.correctIndex === optIndex}
                              onChange={() =>
                                handleQuizQuestionChange(
                                  qIndex,
                                  "correctIndex",
                                  optIndex
                                )
                              }
                              className="w-4 h-4"
                            />
                            <input
                              type="text"
                              placeholder={`Option ${optIndex + 1}`}
                              value={opt}
                              onChange={(e) =>
                                handleQuizOptionChange(
                                  qIndex,
                                  optIndex,
                                  e.target.value
                                )
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={quizLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {quizLoading
                      ? "Saving..."
                      : editingQuiz
                      ? "Update Quiz"
                      : "Save Quiz"}
                  </button>
                  <button
                    type="button"
                    onClick={resetQuizFormState}
                    className="flex-1 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-2xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Quiz Manager Modal */}
        {quizManagerCourse && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Manage Quizzes
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Course: {quizManagerCourse.title}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setQuizManagerCourse(null);
                    setCourseQuizzes([]);
                  }}
                  className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:underline"
                >
                  Close
                </button>
              </div>

              {courseQuizzesLoading ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Loading quizzes...
                </p>
              ) : courseQuizzes.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  No quizzes created for this course yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {courseQuizzes.map((quiz) => (
                    <div
                      key={quiz._id}
                      className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 rounded-2xl px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {quiz.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {quiz.questions?.length || 0} question
                          {(quiz.questions?.length || 0) === 1
                            ? ""
                            : "s"} · {quiz.isPublished ? "Published" : "Draft"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openQuizFormForEdit(quiz)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-xl transition-colors"
                          title="Edit quiz"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz._id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-xl transition-colors"
                          title="Delete quiz"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assignment Details Modal */}
        {selectedAssignment && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Assignment Submission
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Course: {selectedAssignment.course?.title || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Student:{" "}
                    {selectedAssignment.student?.displayName ||
                      selectedAssignment.student?.email ||
                      "Unknown"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:underline"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Title
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedAssignment.title}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Submission Link
                </p>
                <p className="text-sm break-all text-blue-600 dark:text-blue-400">
                  {selectedAssignment.submissionLink}
                </p>
              </div>

              {selectedAssignment.description && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Description
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedAssignment.description}
                  </p>
                </div>
              )}

              {selectedAssignment.createdAt && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Submitted at:{" "}
                  {new Date(selectedAssignment.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Enrollment Manager Modal */}
        {enrollmentManagerCourse && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Enrollment Management
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Course: {enrollmentManagerCourse.title}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEnrollmentManagerCourse(null);
                    setCourseEnrollments([]);
                  }}
                  className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:underline"
                >
                  Close
                </button>
              </div>

              {courseEnrollmentsLoading ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Loading enrollments...
                </p>
              ) : courseEnrollments.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  No students enrolled in this course yet.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Total Enrollments: {courseEnrollments.length}
                    </p>
                  </div>
                  {courseEnrollments.map((enrollment) => (
                    <div
                      key={enrollment._id}
                      className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {enrollment.student?.displayName ||
                              enrollment.student?.email ||
                              "Unknown Student"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {enrollment.student?.email}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            enrollment.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : enrollment.status === "active"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Progress: {enrollment.progress || 0}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Lessons: {enrollment.completedLessonsCount || 0} /{" "}
                          {enrollment.totalLessons || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Enrolled:{" "}
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </div>
                        {enrollment.completedAt && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Completed:{" "}
                            {new Date(
                              enrollment.completedAt
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all"
                            style={{
                              width: `${enrollment.progress || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
