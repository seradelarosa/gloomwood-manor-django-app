import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { GhostProvider } from './services/ghostShuffle.jsx';

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <GhostProvider>
        <App />
      </GhostProvider>
    </BrowserRouter>
);
