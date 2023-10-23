import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <main>
      <Header />
      <div className="px-5 md:px-12 lg:px-24 bg-gray-50">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
