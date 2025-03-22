import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in (email exists in localStorage)
  const isLoggedIn = localStorage.getItem("email");

  if (!isLoggedIn) {
    // Show a toast message and redirect to login
    toast.error("Please login first!");
    return <Navigate to="/login" />;
  }

  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;