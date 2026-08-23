import React from 'react'

function About() {
  return (
    <section id="about" className="about-section page-width">
          <div className="about-image">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
              alt="Dr. Maya Chen in her clinic"
            />
          </div>
          <div className="about-copy">
            <span className="eyebrow">A note from your doctor</span>
            <h2>Medicine should feel more personal.</h2>
            <p>
              As a practicing internist, I know how overwhelming health
              information can be. This space is where I translate the latest
              research into calm, useful guidance for everyday life.
            </p>
            <p>
              My goal is never to replace a conversation with your own care
              team, but to help you arrive at that conversation feeling informed
              and prepared.
            </p>
            <div className="credentials">
              <div>
                <strong>12+</strong>
                <span>Years in practice</span>
              </div>
              <div>
                <strong>MD</strong>
                <span>Internal Medicine</span>
              </div>
              <div>
                <strong>NYC</strong>
                <span>Based in New York</span>
              </div>
            </div>
          </div>
        </section>
  )
}

export default About
