import { motion } from "framer-motion";
import { Heart, Globe, Users, Target, Award, TrendingUp } from "lucide-react";

const CommunityImpact = () => {
  const initiatives = [
    {
      icon: Heart,
      title: "Scholarship Program",
      description: "Providing free access to 10,000 underprivileged students annually",
      impact: "2,500+ beneficiaries"
    },
    {
      icon: Globe,
      title: "Global Learning",
      description: "Courses translated into 25+ languages for wider accessibility",
      impact: "50+ countries reached"
    },
    {
      icon: Users,
      title: "Community Events",
      description: "Monthly webinars and workshops with industry experts",
      impact: "100K+ participants"
    },
    {
      icon: Target,
      title: "Career Support",
      description: "Job placement assistance and career counseling services",
      impact: "85% placement rate"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-4"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Community Impact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Making a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Beyond education - building communities and creating opportunities worldwide
          </motion.p>
        </div>

        {/* Impact Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-slate-700/50 transition-all duration-300 group-hover:shadow-2xl">
                {/* Icon */}
                <div className="inline-flex p-3 sm:p-4 bg-red-100 dark:bg-red-900/30 rounded-xl sm:rounded-2xl mb-4">
                  <initiative.icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {initiative.description}
                </p>

                {/* Impact Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-sm font-medium">{initiative.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-20"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white overflow-hidden">
            <div className="relative z-10">
              <div className="text-center mb-8">
                <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Success Stories That Inspire
                </h3>
                <p className="text-lg sm:text-xl text-red-100 max-w-3xl mx-auto">
                  Real transformations from learners who changed their lives through CourseMaster
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    name: "Maria Gonzalez",
                    story: "From retail worker to web developer in 6 months",
                    achievement: "$75K salary"
                  },
                  {
                    name: "James Wilson",
                    story: "Transitioned from finance to data science",
                    achievement: "Promoted to Lead"
                  },
                  {
                    name: "Sophie Chen",
                    story: "Started freelance career after UI/UX course",
                    achievement: "50+ clients"
                  }
                ].map((story, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-4xl text-white/20 mb-4">"</div>
                    <p className="text-red-100 mb-4">{story.story}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">{story.name}</p>
                        <p className="text-sm text-red-200">{story.achievement}</p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-full"></div>
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

export default CommunityImpact;