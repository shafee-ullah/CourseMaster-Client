import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="app-container flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--primary-color)",
            color: "var(--text-color)",
            borderRadius: "1rem",
          },
        }}
      />
    </div>
  );
}

export default App;
