import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { courseAPI, enrollmentAPI } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  BookOpen,
  Clock,
  Star,
  User,
  CheckCircle,
  Play,
  ArrowLeft,
} from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getCourseById(id);
      setCourse(response.course);
    } catch (error) {
      console.error("Failed to fetch course:", error);
      toast.error("Failed to load course details");
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please log in to enroll in this course");
      navigate("/login");
      return;
    }

    try {
      setEnrolling(true);
      await enrollmentAPI.enroll(
        course._id,
        user?.uid || null,
        user?.email || null
      );
      toast.success("Successfully enrolled in course!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to enroll:", error);
      toast.error(
        error.response?.data?.message || "Failed to enroll in course"
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Course not found
          </p>
          <Link
            to="/courses"
            className="text-red-600 dark:text-red-400 hover:underline"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const totalDuration =
    course.syllabus?.reduce(
      (total, lesson) => total + (lesson.duration || 0),
      0
    ) || 0;

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Back Button */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {course.description}
              </p>

              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                {course.instructor && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>
                      {course.instructor.displayName || course.instructor.email}
                    </span>
                  </div>
                )}
                {course.syllabus && course.syllabus.length > 0 && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.syllabus.length} lessons</span>
                  </div>
                )}
                {totalDuration > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{totalDuration} minutes</span>
                  </div>
                )}
                {course.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Syllabus */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Course Syllabus
                </h2>
                <div className="space-y-3">
                  {course.syllabus.map((lesson, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {lesson.lessonTitle}
                        </h3>
                        {lesson.lessonDescription && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {lesson.lessonDescription}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          {lesson.duration > 0 && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration} min</span>
                            </div>
                          )}
                          {lesson.videoUrl && (
                            <div className="flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              <span>Video Available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Enroll Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  ${course.price}
                </div>
                {course.price === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Free Course
                  </p>
                )}
              </div>

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Certificate of completion</span>
                </div>
                {course.syllabus && course.syllabus.length > 0 && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{course.syllabus.length} lessons</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetails;
