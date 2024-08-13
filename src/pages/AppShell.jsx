import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../supabase/auth/auth";

function AppShell() {
  const navigate = useNavigate();

  useEffect(function () {
    async function checkAuth() {
      await getUser(navigate);
    }
    checkAuth();
  });

  return (
    <div>
      <h1>So everyone, it's highly adv</h1>
      <Outlet />
    </div>
  );
}

export default AppShell;
