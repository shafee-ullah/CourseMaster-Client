import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { enrollmentAPI } from "../../services/api";
import ProgressBar from "../../components/ProgressBar";
import toast from "react-hot-toast";
import { Play, CheckCircle, BookOpen, Clock, ChevronRight } from "lucide-react";

const CoursePlayer = () => {
  const getEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);

      // Handle YouTube watch links
      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.searchParams.get("v")
      ) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get(
          "v"
        )}`;
      }

      // Handle youtu.be short links
      if (parsedUrl.hostname === "youtu.be") {
        return `https://www.youtube.com/embed${parsedUrl.pathname}`;
      }

      // Vimeo links (no change needed)
      if (parsedUrl.hostname.includes("vimeo.com")) {
        return url;
      }

      return url;
    } catch (error) {
      console.error("Invalid video URL:", url, error);
      return null;
    }
  };
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [markingComplete, setMarkingComplete] = useState(false);

  const fetchEnrollment = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getEnrollmentById(
        enrollmentId,
        user?.uid || null,
        user?.email || null
      );
      setEnrollment(response.enrollment);
      setSelectedLessonIndex(0);

      // Update last accessed timestamp (non-blocking)
      enrollmentAPI
        .updateLastAccessed(
          enrollmentId,
          user?.uid || null,
          user?.email || null
        )
        .catch((err) =>
          console.error("Failed to update last accessed:", err?.message)
        );
    } catch (error) {
      console.error("Failed to fetch enrollment:", error);
      toast.error(
        error.response?.data?.message ||
          "Unable to load course. Make sure you are enrolled."
      );
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && enrollmentId) {
      fetchEnrollment();
    }
  }, [user, enrollmentId]);

  const handleLessonSelect = (index) => {
    setSelectedLessonIndex(index);
  };

  const handleMarkComplete = async () => {
    if (!enrollment) return;

    const currentLessonIndex = selectedLessonIndex;

    // Avoid duplicate completion
    const alreadyCompleted =
      enrollment.completedLessons?.some(
        (lesson) => lesson.lessonIndex === currentLessonIndex
      ) || false;

    if (alreadyCompleted) {
      toast.info("This lesson is already marked as completed.");
      return;
    }

    try {
      setMarkingComplete(true);
      const response = await enrollmentAPI.markLessonComplete(
        enrollment._id,
        currentLessonIndex,
        user?.uid || null,
        user?.email || null
      );

      toast.success("Lesson marked as completed!");

      // Refresh enrollment data
      setEnrollment((prev) => ({
        ...prev,
        progress: response.enrollment.progress,
        status: response.enrollment.status,
        completedLessonsCount: response.enrollment.completedLessons,
        totalLessons: response.enrollment.totalLessons,
        completedLessons: [
          ...(prev.completedLessons || []),
          { lessonIndex: currentLessonIndex, completedAt: new Date() },
        ],
      }));
    } catch (error) {
      console.error("Failed to mark lesson complete:", error);
      toast.error(
        error.response?.data?.message || "Failed to mark lesson as completed"
      );
    } finally {
      setMarkingComplete(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading course...</p>
      </div>
    );
  }

  if (!enrollment || !enrollment.course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Course player not available.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-red-600 dark:text-red-400 hover:underline"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const { course } = enrollment;
  const lessons = course.syllabus || [];
  const selectedLesson = lessons[selectedLessonIndex] || null;
  const isLessonCompleted = enrollment.completedLessons?.some(
    (lesson) => lesson.lessonIndex === selectedLessonIndex
  );

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {course.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Continue your learning journey
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Progress
              </p>
              <ProgressBar progress={enrollment.progress || 0} />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Lessons
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {enrollment.completedLessonsCount || 0}/
                {enrollment.totalLessons || lessons.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player & Lesson Detail */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black rounded-2xl aspect-video overflow-hidden shadow-lg">
              {getEmbedUrl(selectedLesson?.videoUrl) ? (
                <iframe
                  src={getEmbedUrl(selectedLesson.videoUrl)}
                  title={selectedLesson.lessonTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-white">
                  <Play className="w-12 h-12 mb-4" />
                  <p>No video available for this lesson</p>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Lesson {selectedLessonIndex + 1} of {lessons.length}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedLesson?.lessonTitle || "Select a lesson"}
                </h2>
              </div>

              {selectedLesson?.lessonDescription && (
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedLesson.lessonDescription}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                {selectedLesson?.duration > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedLesson.duration} min</span>
                  </div>
                )}
                {selectedLesson?.videoUrl && (
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    <span>Video available</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleMarkComplete}
                disabled={markingComplete || isLessonCompleted}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-semibold transition-colors ${
                  isLessonCompleted
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 cursor-default"
                    : "bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {isLessonCompleted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Completed
                  </>
                ) : markingComplete ? (
                  "Marking..."
                ) : (
                  "Mark as Completed"
                )}
              </button>
            </div>
          </div>

          {/* Lesson List */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Course Lessons
            </h3>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              {lessons.length === 0 ? (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No lessons available in this course.
                </div>
              ) : (
                lessons.map((lesson, index) => {
                  const completed = enrollment.completedLessons?.some(
                    (item) => item.lessonIndex === index
                  );

                  return (
                    <button
                      key={index}
                      onClick={() => handleLessonSelect(index)}
                      className={`w-full flex items-start gap-3 p-3 rounded-2xl border transition-colors text-left ${
                        selectedLessonIndex === index
                          ? "border-red-600 bg-red-50 dark:bg-red-900/30"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${
                          completed
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {lesson.lessonTitle}
                        </p>
                        {lesson.duration > 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration} min
                          </p>
                        )}
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoursePlayer;
