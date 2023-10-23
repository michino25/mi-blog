import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SimpleFooter from "../components/SimpleFooter";

export default function SimpleLayout() {
  return (
    <main>
      <Header />
      <div className="px-5 md:px-12 lg:px-24 bg-gray-50">
        <Outlet />
      </div>
      <SimpleFooter />
    </main>
  );
}
