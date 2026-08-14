"use client"

import { useTheme } from "next-themes"
import { Moon,Sun} from "lucide-react";

export default function ThemeToggle(){

     const { theme, setTheme } = useTheme()
    return <>
     <button
      aria-label={"Switch to light mode"}
      onClick={() => setTheme(theme == "dark" ?"light" : "dark")}
      className="icon-button"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
    </>
}