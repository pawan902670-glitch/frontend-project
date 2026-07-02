import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomeComponent from "./HomeComponent";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HomeComponent />
  </StrictMode>
);