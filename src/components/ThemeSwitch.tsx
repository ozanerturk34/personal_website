import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme(
      typeof window != "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)")
        ? "dark"
        : "light"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="px-3 rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FontAwesomeIcon
        icon={theme === "light" ? faMoon : faSun}
        className={`${theme === "light" ? "mx-0.5" : ""}`}
      />
    </button>
  );
};

export default ThemeSwitch;
