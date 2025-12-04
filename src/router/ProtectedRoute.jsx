import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authAPI } from "../services/api";

/**
 * Protected Route Component
 * Handles role-based access control
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.uid) {
        try {
          const response = await authAPI.getUserProfile(user.uid);
          setUserRole(response.user?.role || "student");
        } catch (error) {
          console.error("Failed to fetch user role:", error);
          setUserRole("student"); // Default to student on error
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRoleLoading(false);
      }
    };

    // Only fetch role if auth is done loading and user exists
    if (!authLoading) {
      fetchUserRole();
    } else {
      setRoleLoading(true);
    }
  }, [user, authLoading]);

  // Show loading state while auth or role is loading
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have it, redirect
  if (requiredRole && userRole !== requiredRole) {
    if (requiredRole === "admin") {
      // Redirect non-admin users to student dashboard
      return <Navigate to="/dashboard" replace />;
    }
    // For other roles, redirect to home
    return <Navigate to="/" replace />;
  }

  // User has access, render children
  return children;
};

export default ProtectedRoute;
