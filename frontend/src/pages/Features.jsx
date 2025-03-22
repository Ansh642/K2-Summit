import { motion } from "framer-motion";

const Feature = () => {
  const features = [
    {
      title: "Unified Schema View",
      description: "Automatically merge multiple schemas into a single unified structure.",
      icon: "🔗",
    },
    {
      title: "Interactive Data Exploration",
      description: "Easily navigate through schemas, tables, and data entries with an intuitive UI.",
      icon: "🔍",
    },
    {
      title: "AI-Powered Insights",
      description: "Leverage AI-driven recommendations and metadata analysis for optimized decision-making.",
      icon: "🤖",
    },
    {
      title: "Dynamic Documentation",
      description: "Automatically generate and update documentation as your data evolves.",
      icon: "📄",
    },
    {
      title: "Customizable Dashboards",
      description: "Create, save, and share your own data visualizations.",
      icon: "📊",
    },
    {
      title: "Secure & Scalable",
      description: "Enterprise-grade security with seamless scalability.",
      icon: "🔒",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
            Features of MetaFlow
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the powerful features that make MetaFlow the ultimate tool for managing and exploring your data.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl bg-gray-700 hover:bg-gray-600 shadow-2xl hover:shadow-3xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-cyan-400">{feature.title}</h3>
              <p className="mt-4 text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Data Workflow?
          </h3>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Feature;