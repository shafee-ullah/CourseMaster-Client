import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Award, Briefcase, Globe, Users } from "lucide-react";

const LeadershipTeam = () => {
  const team = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former Google Education Lead with 15+ years in EdTech innovation",
      image: "SC",
      color: "from-red-500 to-orange-500",
      social: { linkedin: "#", twitter: "#", email: "#" }
    },
    {
      name: "Michael Rodriguez",
      role: "Co-Founder & CTO",
      bio: "Ex-Microsoft engineer specializing in scalable learning platforms",
      image: "MR",
      color: "from-red-600 to-pink-500",
      social: { linkedin: "#", twitter: "#", email: "#" }
    },
    {
      name: "Dr. Elena Park",
      role: "Chief Learning Officer",
      bio: "PhD in Educational Psychology, formerly at Stanford University",
      image: "EP",
      color: "from-red-700 to-purple-500",
      social: { linkedin: "#", twitter: "#", email: "#" }
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product leader from Coursera with focus on user experience",
      image: "DK",
      color: "from-red-400 to-yellow-400",
      social: { linkedin: "#", twitter: "#", email: "#" }
    },
    {
      name: "Alex Morgan",
      role: "Head of Instructor Success",
      bio: "Former Udemy instructor manager with 500+ instructor network",
      image: "AM",
      color: "from-red-500 to-rose-500",
      social: { linkedin: "#", twitter: "#", email: "#" }
    },
    {
      name: "Jessica Williams",
      role: "Head of Global Expansion",
      bio: "International education specialist with experience in 30+ countries",
      image: "JW",
      color: "from-red-600 to-amber-500",
      social: { linkedin: "#", twitter: "#", email: "#" }
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
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
            <span className="text-sm font-medium">Leadership Team</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Leadership</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Experienced leaders passionate about transforming education through technology and innovation
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                {/* Top Background */}
                <div className={`h-32 bg-gradient-to-r ${member.color}`}></div>

                {/* Profile */}
                <div className="relative px-6 pb-6">
                  {/* Avatar */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} border-8 border-white dark:border-slate-800 flex items-center justify-center text-white text-2xl font-bold`}>
                      {member.image}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-20 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-red-600 dark:text-red-400 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <a href={member.social.linkedin} className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                        <Linkedin className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </a>
                      <a href={member.social.twitter} className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                        <Twitter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                        <Mail className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/30 dark:group-hover:border-red-400/30 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Culture */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <div className="bg-gradient-to-br from-red-600 to-red-400 rounded-2xl p-6 sm:p-8 text-white">
            <Briefcase className="w-8 h-8 mb-4" />
            <h4 className="text-xl font-bold mb-2">Innovation First</h4>
            <p className="text-red-100">Constantly pushing boundaries in EdTech with cutting-edge solutions</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 sm:p-8 text-white">
            <Users className="w-8 h-8 mb-4" />
            <h4 className="text-xl font-bold mb-2">Student Centered</h4>
            <p className="text-red-100">Every decision starts with our students' learning experience</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-700 to-purple-500 rounded-2xl p-6 sm:p-8 text-white">
            <Globe className="w-8 h-8 mb-4" />
            <h4 className="text-xl font-bold mb-2">Global Impact</h4>
            <p className="text-red-100">Building a worldwide community of empowered learners</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipTeam;