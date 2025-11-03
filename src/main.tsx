import { createRoot } from "react-dom/client";
import { store } from "./store";
import { initAuth } from "./store/authSlice";
import App from "./App.tsx";
import "./index.css";

// Initialize auth on app start
store.dispatch(initAuth());

createRoot(document.getElementById("root")!).render(<App />);
