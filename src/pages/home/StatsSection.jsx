import { motion } from "framer-motion";
import { Users, BookOpen, UserCheck, Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { 
      value: "5K+", 
      label: "Active Students",
      icon: Users,
      color: "from-red-500 to-orange-500"
    },
    { 
      value: "100+", 
      label: "Premium Courses",
      icon: BookOpen,
      color: "from-red-600 to-pink-500"
    },
    { 
      value: "50+", 
      label: "Expert Instructors",
      icon: UserCheck,
      color: "from-red-700 to-purple-500"
    },
    { 
      value: "4.8", 
      label: "Platform Rating",
      icon: Star,
      color: "from-red-400 to-yellow-400",
      suffix: "/5"
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-10 px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-500/5 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Growing</span> Community
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thousands of learners trust CourseMaster for their educational journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 dark:from-slate-800/50 dark:to-slate-900/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              
              {/* Main Card */}
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-8 text-center transition-all duration-300 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:shadow-2xl group-hover:border-red-200/30 dark:group-hover:border-red-900/30">
                {/* Icon Container */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-6`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Animated Counter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-2"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br bg-clip-text text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Progress Indicator */}
                <div className="relative pt-4">
                  <div className="h-1 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    />
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-md opacity-20`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-700 dark:text-gray-300">
              Trusted by learners from <span className="font-semibold text-red-600 dark:text-red-400">50+</span> countries
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StatsSection;