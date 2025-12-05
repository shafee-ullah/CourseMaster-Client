import { motion } from "framer-motion";
import { Calendar, MapPin, Users, TrendingUp, Award, Globe } from "lucide-react";

const OurStory = () => {
  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Founded by three passionate educators with a vision to transform online learning",
      icon: Calendar,
      color: "from-red-500 to-orange-500"
    },
    {
      year: "2019",
      title: "First 10,000 Students",
      description: "Reached our first major milestone with students from 50+ countries",
      icon: Users,
      color: "from-red-600 to-pink-500"
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Expanded course offerings and launched mobile learning platform",
      icon: Globe,
      color: "from-red-700 to-purple-500"
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Won 'Best EdTech Platform' award at Global Innovation Summit",
      icon: Award,
      color: "from-red-400 to-yellow-400"
    },
    {
      year: "2023",
      title: "500K Milestone",
      description: "Surpassed half a million students with 95% satisfaction rate",
      icon: TrendingUp,
      color: "from-red-500 to-rose-500"
    },
    {
      year: "2024",
      title: "Future Ready",
      description: "Launching AI-powered personalized learning paths",
      icon: MapPin,
      color: "from-red-600 to-amber-500"
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
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Our Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            The CourseMaster <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Story</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            From a small startup to a global education platform - our journey of innovation and impact
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-red-600 via-red-500 to-red-400 hidden lg:block"></div>

          {/* Milestones */}
          <div className="space-y-12 sm:space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Year Badge */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  <div className={`w-full max-w-sm ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${milestone.color} text-white font-bold`}>
                      <milestone.icon className="w-4 h-4" />
                      <span>{milestone.year}</span>
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-slate-800 border-4 border-red-600 rounded-full z-10 hidden lg:block"></div>

                {/* Content Card */}
                <div className="lg:w-1/2">
                  <div className={`bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-slate-700/50 ${
                    index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                  }`}>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                    
                    {/* Progress Line */}
                    <div className="mt-4 h-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${milestone.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Current Year Marker */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.5 }}
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-red-600 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm hidden lg:flex"
          >
            2024
          </motion.div>
        </div>

        {/* Founder's Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl sm:text-5xl text-red-600/20 dark:text-red-400/20 mb-4">"</div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 italic mb-6">
              We started CourseMaster with a simple belief: education should be accessible to everyone. 
              Today, seeing thousands of students transform their lives through our platform continues to drive our mission forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-400 rounded-full"></div>
              <div className="text-left">
                <p className="font-bold text-gray-900 dark:text-white">Sarah Chen</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Co-Founder & CEO</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;