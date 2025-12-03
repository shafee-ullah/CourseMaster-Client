import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { courseAPI } from "../../services/api";
import CourseForm from "../courses/CourseForm";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCourses();
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your courses and content
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Course
            </button>
          )}
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
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          ${course.price}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-xl transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-xl transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
