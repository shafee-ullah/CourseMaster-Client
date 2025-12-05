import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      {/* pt-16 only on desktop (md and above) where navbar is fixed */}
      <main className="flex-1 w-full md:pt-16">
        <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
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