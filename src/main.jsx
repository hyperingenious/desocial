import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@mantine/dropzone/styles.css";
import { PostProvider } from "./contexts/PostProvider.jsx";
import { FeedProvider } from "./contexts/FeedProvider.jsx";
import { ProfileProvider } from "./contexts/ProfileProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostProvider>
      <FeedProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </FeedProvider>
    </PostProvider>
  </StrictMode>
);
