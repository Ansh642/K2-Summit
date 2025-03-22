import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          MetaFlow
        </motion.div>

        {/* Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0 ml-32">
          {["Privacy Policy", "Terms of Service", "Support"].map((item, index) => (
            <a
              key={index}
              className="hover:text-white cursor-pointer transition duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-gray-400 text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} MetaFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
