"use client";

import {useState} from "react"
import { Moon, Search, Sun, Menu, X, ArrowUpRight, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <a href="#top" className="brand">
          <span className="brand-mark">MC</span>
          <span>
            <strong>Dr. Maya Chen</strong>
            <small>Internal Medicine</small>
          </span>
        </a>
        <nav className={open ? "nav-links open" : "nav-links"}>
          <a href="#top" onClick={() => setOpen(false)}>
            Home
          </a>
          <a href="#articles" onClick={() => setOpen(false)}>
            Blog
          </a>
          <a href="#categories" onClick={() => setOpen(false)}>
            Categories
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
        </nav>
        <div className="nav-actions">
          <a
            href="#articles"
            className="search-link"
            aria-label="Search articles"
          >
            <Search size={18} />
          </a>
          <ThemeToggle />
          <button
            className="menu-button icon-button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}