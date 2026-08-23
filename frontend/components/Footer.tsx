import {  Mail } from "lucide-react";



export default function Footer(){
    return <>
    
    <footer>
        <div className="footer-wrap page-width">
          <div className="brand">
            <span className="brand-mark">MC</span>
            <span>
              <strong>Dr. Maya Chen</strong>
              <small>Medical education for everyday life.</small>
            </span>
          </div>
          <div className="footer-links">
            <a href="#articles">Blog</a>
            <a href="#about">About</a>
            <a href="#categories">Categories</a>
            <a href="mailto:hello@drmayachen.com">Contact</a>
          </div>
          <div className="socials">
            <a href="mailto:hello@drmayachen.com" aria-label="Email Dr. Chen">
              <Mail size={17} />
            </a>
          </div>
        </div>
        <div className="copyright page-width">
          © 2026 Maya Chen, MD. For educational purposes only.
        </div>
      </footer>
    </>
}