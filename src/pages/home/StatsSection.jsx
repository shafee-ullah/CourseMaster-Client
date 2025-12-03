import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { value: "5K+", label: "Active Students" },
    { value: "100+", label: "Courses" },
    { value: "50+", label: "Instructors" },
    { value: "4.8/5", label: "Average Rating" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 md:p-12"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default StatsSection;

