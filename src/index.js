import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./frontend/contexts/authContext";
import { DataProvider } from "./frontend/contexts/dataContext";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
    <App />
      </DataProvider>
    </AuthProvider>
    </React.StrictMode>,
  document.getElementById("root")
);



