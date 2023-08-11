import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const osThemeSetting =
      typeof window != "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";

    const storageThemeSetting = localStorage.getItem("theme");
    setTheme(storageThemeSetting || osThemeSetting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [setTheme, theme]);

  if (!mounted) {
    return null;
  }

  return (
    <button className="px-3 rounded-full" onClick={toggleTheme}>
      <FontAwesomeIcon
        icon={theme === "light" ? faMoon : faSun}
        className={`${
          theme === "light" ? "mx-0.5 text-blue-900" : "text-yellow-300"
        }`}
      />
    </button>
  );
};

export default ThemeSwitch;
