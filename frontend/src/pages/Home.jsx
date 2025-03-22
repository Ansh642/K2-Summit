import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-10">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
            Explore Your Data Like Never Before
          </h1>
          <p className="text-lg mt-4 text-gray-300">
            Discover, manage, and unify your database schemas effortlessly with our AI-powered dbt explorer.
          </p>
          <button
            onClick={() => {
              const email = localStorage.getItem("email");
              if (!email) {
                navigate("/login");
              }
            }}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </button>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <motion.div
            className="p-8 rounded-xl bg-gray-700 hover:bg-gray-600 shadow-2xl hover:shadow-3xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400">Unified Schema View</h3>
            <p className="mt-4 text-gray-300">
              Automatically merge multiple schemas into a single unified structure.
            </p>
          </motion.div>
          <motion.div
            className="p-8 rounded-xl bg-gray-700 hover:bg-gray-600 shadow-2xl hover:shadow-3xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400">Interactive Data Exploration</h3>
            <p className="mt-4 text-gray-300">
              Easily navigate through schemas, tables, and data entries with an intuitive UI.
            </p>
          </motion.div>
          <motion.div
            className="p-8 rounded-xl bg-gray-700 hover:bg-gray-600 shadow-2xl hover:shadow-3xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400">AI-Powered Insights</h3>
            <p className="mt-4 text-gray-300">
              Leverage AI-driven recommendations and metadata analysis for optimized decision-making.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Insights Section */}
      <section className="relative h-auto bg-fixed bg-cover bg-center flex flex-col items-center justify-center py-24 px-10 text-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,data,ai')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <motion.div 
          className="relative max-w-5xl z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold text-white">
            Your Data, Your Insights
          </h2>
          <p className="text-lg mt-4 text-gray-300">
            Unlock the full potential of your data with AI-driven recommendations, visual analytics, 
            and intelligent search capabilities. Our platform simplifies complex schemas into an intuitive interface, 
            empowering you to make data-driven decisions seamlessly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <motion.div
              className="p-8 bg-white bg-opacity-10 rounded-xl shadow-2xl backdrop-blur-md hover:bg-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-cyan-400">AI-Assisted Querying</h3>
              <p className="text-gray-200 mt-2">Generate smart queries based on your schema instantly.</p>
            </motion.div>
            <motion.div
              className="p-8 bg-white bg-opacity-10 rounded-xl shadow-2xl backdrop-blur-md hover:bg-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-cyan-400">Customizable Dashboards</h3>
              <p className="text-gray-200 mt-2">Create, save, and share your own data visualizations.</p>
            </motion.div>
            <motion.div
              className="p-8 bg-white bg-opacity-10 rounded-xl shadow-2xl backdrop-blur-md hover:bg-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-cyan-400">Secure & Scalable</h3>
              <p className="text-gray-200 mt-2">Enterprise-grade security with seamless scalability.</p>
            </motion.div>
          </div>

          <button
            
            className="mt-10 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Explore Now
          </button>
        </motion.div>
      </section>
      
    </div>
  );
};

export default Home;