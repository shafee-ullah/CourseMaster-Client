import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AboutHero from "./AboutHero";
import MissionVision from "./MissionVision";
import OurStory from "./OurStory";
import LeadershipTeam from "./LeadershipTeam";
import CompanyValues from "./CompanyValues";
import AchievementStats from "./AchievementStats";
import CommunityImpact from "./CommunityImpact";
import CareerOpportunities from "./CareerOpportunities";


const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <AboutHero />
      <MissionVision />
      <OurStory />
      <LeadershipTeam />
      <CompanyValues />
      <AchievementStats />
      <CommunityImpact />
      <CareerOpportunities />
    </motion.div>
  );
};

export default AboutPage;