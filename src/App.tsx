import { Route } from "wouter";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import PatchDetailPage from "./pages/PatchDetailPage";

const App = () => {
  return (
    <>
      <Layout>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/account">
          <AccountPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/patches/:_id">
          <PatchDetailPage/>
        </Route>
      </Layout>
    </>
  );
};

export default App;
