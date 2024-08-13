import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppShell from "./pages/AppShell";
import Login from "./pages/Login";

function Home() {
  return <h1>SO this is the home route</h1>;
}

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="/authenticate" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
