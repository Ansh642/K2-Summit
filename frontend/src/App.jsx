import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import SchemaExplorer from "./pages/SchemaExplorer";
import Login from "./pages/Login";
import Feature from "./pages/Features";
import ProtectedRoute from "./pages/Private"; // Import the ProtectedRoute
import NoPageFound from "./pages/NoPageFound";
import UnifiedSchema from "./pages/UnifiedSchema";

function App() {
  return (
    <div className="overflow-auto outfit-ansh">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/schemas"
          element={
            <ProtectedRoute>
              <SchemaExplorer />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Feature />} />
        <Route path="*" element={<NoPageFound />} />
        <Route path="/unified-schema" element={<UnifiedSchema />} />
      </Routes>
      <Footer />

      <Toaster />
    </div>
  );
}

export default App;