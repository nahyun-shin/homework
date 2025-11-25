import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ContextFooter() {
  const {isDark,setIsDark}=useContext(ThemeContext)
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  const footerCss = {
    backgroundColor: isDark ? "black" : "lightgray",
  };
  return (
    <div>
      <footer className="footer" style={footerCss}>
        <button type="button" className="button" onClick={toggleTheme}>
            ChangeTheme
        </button>
      </footer>
    </div>
  );
}

export default ContextFooter;
