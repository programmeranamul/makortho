import { ArrowUpRight} from "lucide-react";

export default function Hero () {
    return <>
    <section className="hero page-width">
          <div className="hero-copy">
            <span className="eyebrow">Medical education, made human</span>
            <h1>
              Clear answers for <em>better health.</em>
            </h1>
            <p>
              I&apos;m Dr. Maya Chen, an internal medicine physician sharing
              practical, evidence-informed guidance to help you feel more
              confident in your health.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#articles">
                Explore the blog <ArrowUpRight size={16} />
              </a>
              <a className="text-link" href="#about">
                Meet Dr. Chen
              </a>
            </div>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            <p>
              “The best medical advice is information you can understand and
              use.”
            </p>
            <small>— Dr. Maya Chen</small>
          </div>
        </section>
    </>
}