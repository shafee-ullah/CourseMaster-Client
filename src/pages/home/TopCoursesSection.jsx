import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Users, TrendingUp, BookOpen, ChevronRight } from "lucide-react";

const TopCoursesSection = ({ courses, loading }) => {
  return (
    <section className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-red-500/5 to-transparent rounded-full translate-x-32 translate-y-32"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-4"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Trending Now</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Popular</span> Courses
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Top-rated courses loved by our students
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
            >
              <span>Browse All Courses</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-slate-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                {/* Course Card */}
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-slate-700/50 transition-all duration-300 group-hover:shadow-2xl group-hover:border-red-200/50 dark:group-hover:border-red-900/30">
                  {/* Course Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white/80" />
                      </div>
                    )}
                    
                    {/* Course Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {course.category || "Premium"}
                      </div>
                    </div>
                    
                    {/* Instructor Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white dark:border-slate-800"></div>
                      <span className="text-white font-medium text-sm bg-black/50 px-2 py-1 rounded">
                        {course.instructor?.displayName || "Expert"}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Course Title & Rating */}
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {course.title}
                      </h3>
                      {/* <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {course.rating?.toFixed(1) || "4.9"}
                            </span>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">•</span>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {Math.floor(Math.random() * 500) + 100} students
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {Math.floor(Math.random() * 20) + 10}h
                          </span>
                        </div>
                      </div> */}
                    </div>

                    {/* Course Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                      <div>
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/courses/${course._id}`}
                        className="group/btn inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Progress Indicator (Optional) */}
                  {course.progress && (
                    <div className="px-6 pb-6">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Progress: {course.progress}%
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${course.progress}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-red-600 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  #{index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 border-2 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold py-4 px-8 rounded-xl transition-all duration-300 group"
          >
            <span>View All {courses.length}+ Courses</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full group-hover:scale-125 transition-transform"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopCoursesSection;