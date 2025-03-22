import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'
import SchemaExplorer from "./pages/SchemaExplorer";

function App() {
  return (
    
      <div className="overflow-auto outfit-ansh">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= "/schema" element = {<SchemaExplorer/>}/>
        </Routes>
        <Footer />
      </div>
    
  );
}

export default App;
