import { Outlet } from "react-router-dom";
import SimpleFooter from "../components/SimpleFooter";

export default function BlankLayout() {
  return (
    <main>
      <div className="px-5 md:px-12 lg:px-24 bg-gray-50">
        <Outlet />
      </div>
      <SimpleFooter />
    </main>
  );
}
