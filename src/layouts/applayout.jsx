import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      {/* AppLayout */}
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <footer className="p-10 bg-gray-800 text-center mt-10">
        Nirmal Patra❌
      </footer>
    </div>
  );
};

export default AppLayout;
