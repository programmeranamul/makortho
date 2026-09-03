"use client";
import { useEffect, useMemo, useState } from "react";


const sections = [
  "What blood sugar means",
  "When numbers matter",
  "Building steadier habits",
  "When to call your clinician",
];

const recent = [
  {
    title: "How to Maintain a Healthy Heart",
    date: "Aug 08, 2026",
    category: "Cardiology",
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=240&q=80",
    slug: "healthy-heart",
  },
  {
    title: "Healthy Eating Habits for Adults",
    date: "Jul 29, 2026",
    category: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=240&q=80",
    slug: "healthy-eating",
  },
  {
    title: "When Should You Check Your Blood Pressure?",
    date: "Jul 18, 2026",
    category: "Preventive Care",
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=240&q=80",
    slug: "check-blood-pressure",
  },
  {
    title: "Understanding Common Seasonal Illnesses",
    date: "Jul 06, 2026",
    category: "General Medicine",
    image:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=240&q=80",
    slug: "seasonal-illnesses",
  },
];
const categories = [
  ["Diabetes", "8"],
  ["Cardiology", "6"],
  ["Nutrition", "5"],
  ["General Medicine", "4"],
  ["Preventive Care", "3"],
];

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="article-sidebar">
      <div className="toc">
        <span className="eyebrow">On this page</span>
        {sections.map((section, index) => (
          <a
            className={active === `section-${index + 1}` ? "active" : ""}
            key={section}
            href={`#section-${index + 1}`}
          >
            {section}
          </a>
        ))}
      </div>
      <div className="sidebar-block">
        <div className="section-kicker">
          <span>Recent articles</span>
          <span className="rule" />
        </div>
        <div className="recent-list">
          {recent.map((post) => (
            <a
              className="recent-item"
              href={`/post/${post.slug}`}
              key={post.slug}
            >
              <img src={post.image} alt="" />
              <span>
                <b>{post.title}</b>
                <small>
                  {post.category} · {post.date}
                </small>
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="sidebar-block">
        <div className="section-kicker">
          <span>Categories</span>
          <span className="rule" />
        </div>
        <div className="category-list">
          {categories.map(([name, count]) => (
            <a
              href={`/blog?category=${name.toLowerCase().replaceAll(" ", "-")}`}
              key={name}
            >
              <span>{name}</span>
              <small>{count}</small>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}



export default function BlogPageSidebar(){

    const [active, setActive] = useState("section-1");
  const headings = useMemo(
    () => sections.map((_, i) => `section-${i + 1}`),
    [],
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActive(entry.target.id),
        ),
      { rootMargin: "-18% 0px -65% 0px" },
    );
    headings.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);
    return<>
    <div className="desktop-sidebar">
            <Sidebar active={active} />
          </div>
    </>
}