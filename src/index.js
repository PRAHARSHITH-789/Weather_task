import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login_in from "./login_sign_in ";
import { createRoot } from "react-dom/client"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import "bootstrap-icons/font/bootstrap-icons.css";
import Main from "./main";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="226138521359-vpqdus6s9l2olchei927oeb4onn5nel7.apps.googleusercontent.com">
      <Main/>
    </GoogleOAuthProvider>
);
