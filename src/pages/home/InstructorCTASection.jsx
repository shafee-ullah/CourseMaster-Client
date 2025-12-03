import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";

const InstructorCTASection = ({ user }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-red-600 dark:bg-red-700 rounded-2xl p-8 md:p-12 text-white text-center"
    >
      <GraduationCap className="w-16 h-16 mx-auto mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Become an Instructor
      </h2>
      <p className="text-xl mb-8 text-red-100">
        Teach what you love. CourseMaster gives you the tools to teach.
      </p>
      <Link
        to={user ? "/admin/dashboard" : "/login"}
        className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-2xl transition-colors"
      >
        Start Teaching Today
        <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.section>
  );
};

export default InstructorCTASection;
