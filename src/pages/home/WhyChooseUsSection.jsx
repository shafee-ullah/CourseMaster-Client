import { motion } from "framer-motion";
import { Smartphone, UserCheck, Clock } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Learn Anywhere",
      description: "Mobile-friendly interface. Study on any device, anytime, anywhere.",
    },
    {
      icon: UserCheck,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience.",
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Unlimited access to purchased courses. Learn at your own pace forever.",
    },
  ];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose CourseMaster?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Experience the best in online learning
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center"
          >
            <feature.icon className="w-16 h-16 mx-auto text-red-600 dark:text-red-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

