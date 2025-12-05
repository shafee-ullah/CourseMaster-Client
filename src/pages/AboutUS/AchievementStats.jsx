import { motion } from "framer-motion";
import { Users, Award, Globe, Clock, Star, TrendingUp, BookOpen, GraduationCap } from "lucide-react";

const AchievementStats = () => {
  const stats = [
    {
      icon: Users,
      value: "500K+",
      label: "Students Enrolled",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: BookOpen,
      value: "10K+",
      label: "Courses Available",
      color: "from-red-600 to-pink-500"
    },
    {
      icon: Globe,
      value: "150+",
      label: "Countries Reached",
      color: "from-red-700 to-purple-500"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      color: "from-red-400 to-yellow-400"
    },
    {
      icon: GraduationCap,
      value: "95%",
      label: "Completion Rate",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "Career Advancement",
      color: "from-red-600 to-amber-500"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-4"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Our Achievements</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Numbers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            The impact we've made in transforming education worldwide
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-200/50 dark:border-slate-700/50 transition-all duration-300 group-hover:shadow-xl">
                {/* Icon */}
                <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>

                {/* Label */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>

                {/* Progress Bar */}
                <div className="mt-3 sm:mt-4 h-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Continuous Growth & Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our journey has been marked by consistent growth and increasing impact on 
                the global education landscape. Each year, we reach more learners and 
                create more opportunities for personal and professional development.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-4">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">40%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Annual Growth</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-4">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">2x</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Growth</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              {/* Simple Timeline */}
              <div className="space-y-4">
                {[
                  { year: "2018", milestone: "Founded", students: "1K" },
                  { year: "2020", milestone: "Global Launch", students: "50K" },
                  { year: "2022", milestone: "Mobile Platform", students: "200K" },
                  { year: "2024", milestone: "AI Learning", students: "500K" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-white font-bold">
                      {item.year}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{item.milestone}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.students} Students</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementStats;