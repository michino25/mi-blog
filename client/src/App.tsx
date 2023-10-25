import { Routes, Route } from "react-router-dom";
// import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Registerpage";
import { UserProvider } from "./contexts/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import TestPage from "./pages/TestPage";
import MainLayout from "./layouts/MainLayout";
import BlankLayout from "./layouts/BlankLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>

        <Route path="/" element={<SimpleLayout />}>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/user/:id" element={<SearchPage type="user" />} />
          <Route
            path="/category/:id"
            element={<SearchPage type="category" />}
          />
          <Route path="/search/:id" element={<SearchPage type="search" />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
