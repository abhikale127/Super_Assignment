import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { AnalyticsPage } from "./pages/Analytics";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import "./styles.css";
import { AuthLayout } from "./components/AuthLayout";

// ideally this would be an API call to server to get logged in user data

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/" element={<ProtectedLayout />}>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Analytics" element={<AnalyticsPage />} />
      </Route>
    </Route>
  )
);
