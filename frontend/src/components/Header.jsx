import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Check if the user is logged in (email exists in localStorage)
  const isLoggedIn = localStorage.getItem("email");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/"); 
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <motion.div
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 cursor-pointer"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          MetaFlow
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-10">
          {["Home", "Features", ...(isLoggedIn ? ["Dashboard"] : [])].map(
            (item, index) => (
              <motion.a
                key={index}
                onClick={() =>
                  navigate(
                    item === "Home"
                      ? "/"
                      : item === "Dashboard"
                      ? "/schemas"
                      : `/${item.toLowerCase()}`
                  )
                }
                className="text-gray-300 cursor-pointer text-lg font-medium hover:text-white transition duration-300 relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-300 scale-x-0 transition-transform transform origin-left group-hover:scale-x-100"></span>
              </motion.a>
            )
          )}
        </nav>

        {/* Conditional Render: Logout Button or Get Started Button */}
        {isLoggedIn ? (
          <motion.button
            onClick={handleLogout}
            className="hidden md:block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium transition hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            Logout
          </motion.button>
        ) : (
          <motion.button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium transition hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        )}

        {/* Mobile Menu Icon (Future Expansion) */}
        <motion.div
          className="md:hidden text-white text-2xl cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          ☰
        </motion.div>
      </div>
    </header>
  );
};

export default Header;