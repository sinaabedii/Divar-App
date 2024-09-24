import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/PageNotFound";
import Loader from "../components/modules/Loader";
import GeneralTermsConditions from "../pages/GeneralTermsConditions";
import Chat from "../pages/Chat";
import AccountPrivacyPolicies from "../pages/AccountPrivacyPolicies";
import DetailsPage from "../pages/DetailsPage";

function Router() {
  const { data, isLoading } = useQuery(["profile"], getProfile);
  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="/General_terms_and_conditions"
        element={<GeneralTermsConditions />}
      />
      <Route
        path="/account_privacy_policies"
        element={<AccountPrivacyPolicies />}
      />
      <Route path="/chat" element={<Chat />} />
      <Route path="/post/:id" element={<DetailsPage />} />
    </Routes>
  );
}

export default Router;
