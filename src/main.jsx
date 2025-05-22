import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@mantine/dropzone/styles.css";
import { PostProvider } from "./contexts/PostProvider.jsx";
import { FeedProvider } from "./contexts/FeedProvider.jsx";
import { ProfileProvider } from "./contexts/ProfileProvider.jsx";
import { MessageProvider } from "./contexts/MessageProvider.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { BrowserRouter, } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <AuthProvider>
          <PostProvider>
            <FeedProvider>
              <ProfileProvider>
                <MessageProvider>
                  <App />
                </MessageProvider>
              </ProfileProvider>
            </FeedProvider>
          </PostProvider>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
