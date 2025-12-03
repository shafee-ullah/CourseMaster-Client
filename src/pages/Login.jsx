import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const {
    logInUser,
    createUser,
    googleSignIn,
    githubSignIn,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let userCredential;

      if (isLogin) {
        // Login
        userCredential = await logInUser(formData.email, formData.password);
        toast.success("Login successful!");
      } else {
        // Sign Up
        if (!formData.name.trim()) {
          toast.error("Please enter your name");
          setLoading(false);
          return;
        }
        userCredential = await createUser(
          formData.email,
          formData.password,
          formData.name
        );
        toast.success("Account created successfully!");
      }

      // Sync user to MongoDB
      if (userCredential?.user) {
        try {
          await authAPI.syncUser(userCredential.user);
        } catch (error) {
          console.error("Failed to sync user:", error);
          // Don't block user if sync fails
        }
      }

      // Redirect to home/dashboard
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.code === "auth/user-not-found"
          ? "User not found. Please sign up first."
          : error.code === "auth/wrong-password"
          ? "Incorrect password."
          : error.code === "auth/email-already-in-use"
          ? "Email already in use."
          : error.code === "auth/weak-password"
          ? "Password should be at least 6 characters."
          : error.code === "auth/invalid-email"
          ? "Invalid email address."
          : "Authentication failed. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);

    try {
      let userCredential;

      if (provider === "google") {
        userCredential = await googleSignIn();
      } else if (provider === "github") {
        userCredential = await githubSignIn();
      }

      // Sync user to MongoDB
      if (userCredential?.user) {
        try {
          await authAPI.syncUser(userCredential.user);
          toast.success("Login successful!");
        } catch (error) {
          console.error("Failed to sync user:", error);
          toast.error("Login successful but sync failed. Please try again.");
        }
      }

      // Redirect to home/dashboard
      navigate("/");
    } catch (error) {
      toast.error(
        error.message || "Social authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
          variants={itemVariants}
        >
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin
                ? "Sign in to continue to CourseMaster"
                : "Join CourseMaster and start learning"}
            </p>
          </motion.div>

          {/* Social Auth Buttons */}
          <motion.div className="space-y-3 mb-6" variants={itemVariants}>
            <button
              onClick={() => handleSocialAuth("google")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => handleSocialAuth("github")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGithub className="text-2xl" />
              <span className="font-medium">Continue with GitHub</span>
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div className="relative mb-6" variants={itemVariants}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </motion.div>

          {/* Email/Password Form */}
          <motion.form onSubmit={handleEmailAuth} variants={itemVariants}>
            {!isLogin && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </motion.div>
            )}

            <motion.div className="mb-4" variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div className="mb-6" variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              variants={itemVariants}
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </motion.button>
          </motion.form>

          {/* Toggle Login/Sign Up */}
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: "", password: "", name: "" });
                }}
                className="text-red-600 dark:text-red-400 font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
