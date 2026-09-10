"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">MC</span>
          <span>
            <strong>Dr. Maya Chen</strong>
            <small>Internal Medicine</small>
          </span>
        </Link>
        <nav className={open ? "nav-links open" : "nav-links"}>
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/#articles" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/#categories" onClick={() => setOpen(false)}>
            Categories
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)}>
            About
          </Link>
        </nav>
        <div className="nav-actions">
          <Link
            href="/#articles"
            className="search-link"
            aria-label="Search articles"
          >
            <Search size={18} />
          </Link>
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