import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Layout() {
    return (
        <main>
            <Header />
            <div className="px-24 bg-gray-50">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}
