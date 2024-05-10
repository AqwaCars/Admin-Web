
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Redux/store"
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Modal from 'react-modal';
import "./assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
Modal.setAppElement('#root');
root.render(

  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
      
        <Provider store={store}>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/rtl/*" element={<RTLLayout />} />
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Routes>
        </Provider>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
