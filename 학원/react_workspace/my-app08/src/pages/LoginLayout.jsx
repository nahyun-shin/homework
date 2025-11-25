import React from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import LoginHeader from "./LoginHeader";
import Contents from "./Contents";

function LoginLayout(props) {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
  };
  const contentsCss = {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
  };
  return (
    <div>
      <AuthContext.Provider value={{ isLogin, login, logout }}>
        <div style={contentsCss}>
          <LoginHeader />
          <Contents/>
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default LoginLayout;
