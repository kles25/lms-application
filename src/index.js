import React from "react";
import App from "./App";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";



const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <Router>
    <App />
  </Router>);