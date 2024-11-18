import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

// Components
import App from "./App.tsx";

// Store
import { rootStore } from "./store/rootStore.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={rootStore}>
    <App />
  </Provider>
  // </StrictMode>,
);
