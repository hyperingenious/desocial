import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import AppShell from "./pages/app-shell/AppShell";
import Feed from "./pages/feed/Feed";
import Login from "./pages/Login";
import Profile from "./pages/profile/Profile";
import "./custom.css";
import Chat from "./pages/chat/Chat";

export default function App() {
  const theme = createTheme({
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans-serif" },
  });

  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route path="feed" element={<Feed />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="chat/:id" element={<Chat />} />
        </Route>
        <Route path="/authenticate" element={<Login />} />
      </Routes>
    </MantineProvider>
  );
}