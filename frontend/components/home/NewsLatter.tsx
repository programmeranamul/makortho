"use client"

import { Moon, Search, Sun, Menu, X, ArrowUpRight, Mail } from "lucide-react";


export default function NewsLatter() {
    return <>
    <section className="newsletter page-width">
          <div>
            <span className="eyebrow">Stay informed</span>
            <h2>Good health starts with good information.</h2>
            <p>
              Join a thoughtful monthly note on living well, delivered to your
              inbox.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email address"
              required
            />
            <button className="button primary" type="submit">
              Subscribe <Mail size={16} />
            </button>
          </form>
        </section>
    
    </>
}