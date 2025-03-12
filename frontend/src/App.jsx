import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import AdminPage from "./pages/AdminPage";


import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

const App = () => {


  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
