import { createRoot } from "react-dom/client";
//import App from "./AppExample.js";
import App from "./components/App/App"

const root = createRoot(document.getElementById('root'));

root.render(<App />);