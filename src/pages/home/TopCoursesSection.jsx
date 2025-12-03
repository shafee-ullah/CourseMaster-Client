import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TopCoursesSection = ({ courses, loading }) => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Most Popular Courses
        </h2>
        <Link
          to="/courses"
          className="text-red-600 dark:text-red-400 hover:underline font-semibold"
        >
          View All
        </Link>
      </motion.div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading courses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            >
              <Link to={`/courses/${course._id}`}>
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  {course.instructor && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {course.instructor.displayName || course.instructor.email}
                    </p>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    {course.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">
                      ${course.price}
                    </span>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors">
                    View Course
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopCoursesSection;

