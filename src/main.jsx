import React, { Component, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import profilePhoto from "../Images/rehana.jpeg";

const navItems = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
];
const socials = [
  ["https://github.com/jayesh7007", "fab fa-github", "GitHub"],
  [
    "https://www.linkedin.com/in/jayesh-waghela-02571118a/",
    "fab fa-linkedin-in",
    "LinkedIn",
  ],
  ["https://x.com/Jayesh7007_", "fab fa-twitter", "Twitter"],
];

const skills = [
  ["Angular", 90, "fab fa-angular", "text-red-500"],
  ["TypeScript", 88, "fas fa-code", "text-blue-500"],
  ["JavaScript", 84, "fab fa-js", "text-yellow-500"],
  ["HTML", 92, "fab fa-html5", "text-orange-500"],
  ["CSS", 88, "fab fa-css3-alt", "text-blue-500"],
  ["React", 76, "fab fa-react", "text-cyan-500"],
  // ['Angular Material', 82, 'fas fa-layer-group', 'text-red-400'],
  // ['Reactive Forms / RxJS', 84, 'fas fa-arrows-rotate', 'text-purple-500'],
  ["REST APIs", 80, "fas fa-server", "text-green-500"],
  ["FastAPI", 78, "fas fa-bolt", "text-teal-500"],
  ["Power BI", 88, "fas fa-chart-line", "text-yellow-500"],
  ["Python", 82, "fab fa-python", "text-blue-600"],
  ["NumPy", 80, "fas fa-calculator", "text-blue-500"],
  ["Pandas", 82, "fas fa-table", "text-indigo-500"],
  ["Matplotlib", 78, "fas fa-chart-line", "text-orange-500"],
  ["SQL / Excel", 82, "fas fa-database", "text-cyan-500"],
];

const skillGroups = {
  Frontend: skills.slice(0, 6),
  "Backend & APIs": skills.slice(6, 8),
  "Data & Analytics": skills.slice(8),
};

const projects = [
  {
    title: "Aadishakti Astro & Vastu",
    description:
      "Freelance business website for an astrology and Vastu consultancy, designed, developed, and deployed with WhatsApp booking, direct call integration, and custom-domain hosting.",
    tags: ["Angular", "Responsive UI", "Vercel"],
    icon: "fas fa-laptop-code",
    colors: "from-indigo-500 to-purple-600",
    link: "https://aadishakti-astro-vastu.vercel.app",
    linkLabel: "Live Website",
    linkIcon: "fas fa-arrow-up-right-from-square",
  },
  {
    title: "Cooperative Banking LOS & AOS",
    description:
      "Angular-based Loan Origination and Account Origination systems with secure API integration, reusable onboarding workflows, validation, and production support.",
    tags: ["Angular", ".NET Web API", "Power BI"],
    icon: "fas fa-building-columns",
    colors: "from-blue-400 to-purple-500",
  },
  {
    title: "Amazon E-commerce Performance Dashboard",
    description:
      "Power BI dashboard visualizing order status, order volume by city and state, product categories, and total revenue KPIs.",
    tags: ["Power BI", "DAX", "SQL"],
    icon: "fas fa-chart-bar",
    colors: "from-orange-400 to-red-500",
    link: "https://github.com/jayesh7007/Amazon-Ecommerce-Dashboard",
    linkLabel: "GitHub",
    linkIcon: "fab fa-github",
  },
  {
    title: "Treadmill Analytics",
    description:
      "Comprehensive data exploration project using Python, Pandas, and Matplotlib to extract consumer insights and market trends.",
    tags: ["Python", "Pandas", "Analytics"],
    icon: "fas fa-microscope",
    colors: "from-purple-400 to-pink-500",
    link: "https://www.kaggle.com/code/jayesh7007/the-treadmill-trends-a-data-driven-exploration",
    linkLabel: "Kaggle",
    linkIcon: "fab fa-kaggle",
  },
];

function useExperience() {
  return useMemo(() => {
    const start = new Date(2025, 3, 8);
    const today = new Date();
    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return years >= 1 ? `${years}+` : `${(years + months / 12).toFixed(1)}+`;
  }, []);
}

function SectionHeading({ eyebrow, title, accent, subtitle, dark = false }) {
  return (
    <div className="mb-10 text-center sm:mb-16">
      <span
        className={`mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold ${dark ? "bg-blue-500/20 text-blue-300" : "bg-purple-100 text-secondary"}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mb-4 text-3xl font-bold md:text-5xl ${dark ? "text-white" : "text-slate-800"}`}
      >
        {title} <span className="gradient-text">{accent}</span>
      </h2>
      <p
        className={`mx-auto max-w-2xl text-lg ${dark ? "text-slate-300" : "text-slate-500"}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function SocialLinks({ dark = false }) {
  return (
    <div className="flex space-x-4">
      {socials.map(([href, icon, label]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          title={label}
          className={
            dark
              ? "flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 transition hover:scale-110 hover:bg-blue-500"
              : "social-icon flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 text-xl transition hover:-translate-y-1 hover:bg-primary hover:text-white"
          }
        >
          <i className={icon} />
        </a>
      ))}
    </div>
  );
}

function Navigation({ activeSection }) {
  const [open, setOpen] = useState(false);
  const goTo = () => setOpen(false);
  return (
    <nav className="fixed z-50 w-full border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl font-bold gradient-text sm:text-2xl">
            Jayesh Waghela
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="text-slate-600 md:hidden"
            aria-label="Toggle navigation"
          >
            <i className={`fas ${open ? "fa-xmark" : "fa-bars"} text-2xl`} />
          </button>
          <div className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`nav-link capitalize ${activeSection === item ? "active" : ""}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        {open && (
          <div className="mt-4 space-y-2 pb-2 md:hidden">
            {navItems.map((item) => (
              <a
                onClick={goTo}
                key={item}
                href={`#${item}`}
                className={`nav-link block py-2 capitalize ${activeSection === item ? "active" : ""}`}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero({ experience }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-0 pb-12 pt-24 sm:pb-16 md:pt-20"
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="container mx-auto flex flex-col items-center justify-between gap-10 px-4 sm:gap-12 sm:px-6 md:flex-row">
        <div className="mb-6 w-full sm:mb-12 md:mb-0 md:w-1/2">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-semibold tracking-wide text-primary shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Available for freelance work
          </span>
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Hi, I'm <span className="gradient-text">Jayesh Waghela</span>
          </h1>
          <h2 className="mb-6 bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl md:text-3xl">
            Frontend Developer | Data Analyst
          </h2>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-600">
            I build secure, scalable banking applications with Angular and
            create actionable data insights with Power BI, Python, and SQL.
          </p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#contact"
              className="btn-primary w-full rounded-full px-6 py-3 text-center font-semibold shadow-lg sm:w-auto sm:px-8"
            >
              <i className="fas fa-envelope mr-2" />
              Get In Touch
            </a>
            <a
              href="#projects"
              className="w-full rounded-full border-2 border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-blue-50 sm:w-auto sm:px-8"
            >
              <i className="fas fa-briefcase mr-2" />
              View My Work
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
            <div>
              <span className="text-2xl font-bold gradient-text">6+</span>
              <p className="text-sm text-slate-600">Projects Delivered</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-300 sm:block" />
            <div>
              <span className="text-lg font-bold gradient-text md:text-2xl">Frontend &amp; Data</span>
              <p className="text-sm text-slate-600">Solutions</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-300 sm:block" />
            <div>
              <span className="text-lg font-bold gradient-text md:text-2xl">Available</span>
              <p className="text-sm text-slate-600">for Freelance</p>
            </div>
          </div>
          <div className="mt-10">
            <SocialLinks />
          </div>
        </div>
        <div className="flex justify-center md:w-1/2">
          <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96">
            <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-br from-primary via-secondary to-blue-400 opacity-30 blur-2xl" />
            <img
              src={profilePhoto}
              alt="Jayesh Waghela"
              className="floating relative h-full w-full rounded-full border-4 border-white object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ experience }) {
  const timeline = [
    [
      "fas fa-graduation-cap",
      "B.Tech Graduation",
      "2021 - 2025 · VIIT, Pune · CGPA 8.76",
      "Completed a B.Tech in Information Technology with a strong foundation in software development and data analytics.",
    ],
    [
      "fas fa-briefcase",
      "IT Intern - FinBraine",
      "April - August 2025",
      "Designed 5+ Power BI dashboards and built a demo banking website with Angular, validations, reusable components, and localStorage persistence.",
    ],
    [
      "fas fa-rocket",
      "Jr. Software Engineer - GTS Finlabs",
      "August 2025 - Present",
      "Developing cooperative banking Loan Origination and Account Origination systems with Angular, API integration, reusable workflows, and production support.",
    ],
  ];
  return (
    <section id="about" className="section-border bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="About Me"
          title="Who is"
          accent="Jayesh Waghela?"
          subtitle="Building scalable products and turning data into decisions"
        />
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            {timeline.map(([icon, title, date, text], index) => (
              <div key={title} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <i className={`${icon} text-lg`} />
                  </div>
                  {index < 2 && (
                    <div className="mt-2 h-20 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
                  )}
                </div>
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-slate-800">{title}</h4>
                  <p className="mb-2 text-sm text-slate-600">{date}</p>
                  <p className="text-slate-700">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-6 text-3xl font-bold text-slate-800">
              Crafting Digital Experiences
            </h3>
            <p className="mb-4 text-lg leading-relaxed text-slate-700">
              I'm a frontend developer and data analyst with hands-on experience
              building Angular applications for enterprise banking. At{" "}
              <strong>GTS Finlabs</strong>, I work on Loan Origination and
              Account Origination systems, integrating APIs and delivering
              maintainable user journeys.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-slate-700">
              I also create Power BI dashboards and freelance websites,
              combining clean code, responsive design, and data-driven thinking
              to solve real business problems.
            </p>
            <div className="mb-8 grid grid-cols-2 gap-6 rounded-xl bg-slate-50 p-6">
              <Stat value="B.Tech" label="Information Technology" />
              <Stat value="8.76" label="CGPA" />
              <Stat value="Pune, India" label="Location" />
              <Stat value={experience} label="Years Experience" />
            </div>
            <div className="mb-8 space-y-3 text-slate-700">
              <p>
                <i className="fas fa-check-circle mr-3 text-primary" />
                <strong>Email:</strong> jayesh.vghl21@gmail.com
              </p>
              <p>
                <i className="fas fa-check-circle mr-3 text-primary" />
                <strong>Phone:</strong> +91 7447646652
              </p>
              {/* <p>
                <i className="fas fa-check-circle mr-3 text-primary" />
                <strong>Specialization:</strong> Angular, Data Analytics, Power
                BI, Python
              </p> */}
            </div>
            <a
              href="https://docs.google.com/document/d/19wMgomMsGq4NPlY7_XDJNRkPbrjZyM7K/edit?usp=sharing&ouid=109944332221212990582&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-block rounded-full px-8 py-3 font-semibold shadow-lg"
            >
              <i className="fas fa-download mr-2" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="border-l-4 border-primary pl-4">
      <p className="text-2xl font-bold gradient-text">{value}</p>
      <p className="text-slate-600">{label}</p>
    </div>
  );
}

function Skills() {
  const [activeGroup, setActiveGroup] = useState("Frontend");
  const activeSkills = skillGroups[activeGroup];

  return (
    <section
      id="skills"
      className="section-shell section-border bg-light py-16 sm:py-24"
    >
      <div className="container relative mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Expertise"
          title="Skills &"
          accent="Technologies"
          subtitle="A living toolkit shaped by real product and analytics work"
        />
        <div className="skill-constellation mx-auto max-w-5xl">
          <div className="skill-orbit skill-orbit-one" />
          <div className="skill-orbit skill-orbit-two" />
          <div className="skill-constellation-content">
            <div className="skill-group-nav">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Explore toolkit
              </p>
              <div className="flex flex-wrap gap-2 pb-2 md:block md:space-y-2">
                {Object.keys(skillGroups).map((group) => (
                  <button
                    key={group}
                    onClick={() => setActiveGroup(group)}
                    className={`skill-group-button w-auto flex-none whitespace-nowrap md:w-full ${activeGroup === group ? "active" : ""}`}
                  >
                    <span className="mr-3 text-primary">
                      {group === "Frontend"
                        ? "01"
                        : group === "Backend & APIs"
                          ? "02"
                          : "03"}
                    </span>
                    {group}
                    <i className="fas fa-arrow-right ml-auto hidden text-xs md:block" />
                  </button>
                ))}
              </div>
            </div>
            <div className="skill-cloud">
              <div className="skill-cloud-heading">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Currently working with
                  </p>
                  <h3 className="mt-1 text-3xl font-bold text-slate-800">
                    {activeGroup}
                  </h3>
                </div>
                <span className="skill-count">{activeSkills.length} tools</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {activeSkills.map(([name, , icon, color], index) => (
                  <div
                    key={name}
                    className="skill-pill"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="skill-pill-icon">
                      <i className={`${icon} ${color}`} />
                    </span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Always learning, always shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const roles = [
    {
      title: "Jr. Software Engineer",
      status: "Current",
      date: "Aug 2025 – Present",
      tenure: "2025-08-01",
      company: "GTS Finlabs Pvt. Ltd. (formerly FinBraine) — Pune, India",
      bullets: [
        "Developing Angular frontend applications for cooperative banking Loan Origination (LOS) and Account Origination (AOS) systems with secure backend API integration.",
        "Implemented XLSX import functionality for bulk data ingestion, eliminating manual data entry through existing API flows.",
        "Built dynamic multi-step onboarding workflows with Angular Reactive Forms, validation, conditional logic, and reusable components.",
        "Delivered 6+ banking projects to production and supported 9+ UAT cycles by resolving UI bugs and implementing feature enhancements.",
      ],
      tags: ["Angular", "TypeScript", "Reactive Forms", "REST APIs"],
    },
    {
      title: "IT Intern",
      status: "Completed",
      date: "Apr 2025 – Aug 2025 · 4 months",
      company: "FinBraine Fintech Pvt. Ltd. — Pune, India",
      bullets: [
        "Designed and deployed 5+ interactive Power BI dashboards using DAX for real-time KPI tracking and reporting.",
        "Built a demo banking website in Angular with loaders, toasters, form validations, reusable components, and localStorage persistence.",
      ],
      tags: ["Power BI", "DAX", "Angular", "HTML / CSS"],
    },
  ];
  const tenure = (start) => {
    const months = Math.max(
      0,
      (new Date().getFullYear() - new Date(start).getFullYear()) * 12 +
        new Date().getMonth() -
        new Date(start).getMonth(),
    );
    return months >= 12
      ? `${Math.floor(months / 12)} yr${months >= 24 ? "s" : ""} ${months % 12 ? `${months % 12} mo` : ""}`
      : `${months} mo`;
  };
  return (
    <section id="experience" className="section-border bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Career"
          title="Work"
          accent="Experience"
          subtitle="My professional journey and accomplishments"
        />
        <div className="mx-auto max-w-2xl space-y-6">
          {roles.map((role, index) => (
            <div key={role.title} className="relative pl-10">
              {index === 0 && (
                <div className="absolute bottom-0 left-3 top-5 w-px bg-slate-200" />
              )}
              <div
                className={`absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${index === 0 ? "bg-primary" : "border-2 border-slate-300 bg-white"}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${index === 0 ? "bg-white" : "bg-slate-300"}`}
                />
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-blue-100 hover:shadow-md">
                <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {role.title}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                    {role.status}
                  </span>
                </div>
                <p className="mb-1 text-sm font-medium text-primary">
                  {role.company}
                </p>
                <p className="mb-5 text-xs text-slate-400">
                  <i className="far fa-calendar-alt mr-2" />
                  {role.date}
                  {role.tenure && <> · {tenure(role.tenure)}</>}
                </p>
                <div className="mb-5 h-px bg-slate-100" />
                <ul className="mb-5 space-y-3">
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-slate-600"
                    >
                      <i className="fas fa-arrow-right mt-1 text-xs text-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-light py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Showcase"
          title="Featured"
          accent="Projects"
          subtitle="A selection of my recent work and personal projects"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="card-hover overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md"
            >
              <div
                className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${project.colors}`}
              >
                <i className={`${project.icon} text-6xl text-white/50`} />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-slate-800">
                  {project.title}
                </h3>
                <p className="mb-4 leading-relaxed text-slate-600">
                  {project.description}
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block border-t border-slate-100 pt-4 text-center font-semibold text-primary hover:text-secondary"
                  >
                    <i className={`${project.linkIcon} mr-1`} />
                    {project.linkLabel}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");
  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("missing-config");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: form.subject.value,
          from_name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.message || "Message delivery failed");
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 text-white sm:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Get in Touch"
          title="Ready to"
          accent="Connect?"
          subtitle="I'm open to diverse career opportunities where I can leverage my skills, learn, and contribute to organizational growth."
        />
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="leading-relaxed text-slate-300">
              I’m open to full-time opportunities across various domains and
              roles where I can apply my skills, continue learning, and
              contribute to the team’s success. Let’s connect and discuss how I
              can add value to your organization!
            </p>
            <div className="space-y-6 text-slate-400">
              <p>
                <i className="fas fa-map-marker-alt mr-5 text-blue-400" />
                <strong className="mr-3 text-white">Location</strong>Pune,
                Maharashtra, India
              </p>
              <p>
                <i className="fas fa-envelope mr-5 text-blue-400" />
                <strong className="mr-3 text-white">Email</strong>
                jayesh.vghl21@gmail.com
              </p>
              <p>
                <i className="fas fa-phone-alt mr-5 text-blue-400" />
                <strong className="mr-3 text-white">Phone</strong>+91 7447646652
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Connect With Me</h4>
              <SocialLinks dark />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:p-8">
            <h3 className="mb-6 text-2xl font-bold">Send Me a Message</h3>
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  id="name"
                  label="Your Name"
                  placeholder="Enter your name"
                />
                <Input
                  id="email"
                  label="Your Email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <Input
                id="subject"
                label="Subject"
                placeholder="Project inquiry"
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-semibold text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="Tell me about your project..."
                />
              </div>
              {status === "sent" && (
                <p className="text-sm text-green-300" role="status">
                  Message sent successfully. I will get back to you soon.
                </p>
              )}
              {status === "missing-config" && (
                <p className="text-sm text-amber-300" role="alert">
                  Contact form is not configured yet. Add the Web3Forms access
                  key to the environment.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-300" role="alert">
                  Message could not be sent. Please try again or email me
                  directly.
                </p>
              )}
              <button
                disabled={status === "sending"}
                className="btn-primary w-full rounded-lg py-3 font-semibold shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <i
                  className={`fas ${status === "sending" ? "fa-spinner fa-spin" : "fa-paper-plane"} mr-2`}
                />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ id, label, type = "text", placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold text-slate-200">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer-watermark">
      <div className="container mx-auto overflow-hidden px-4 text-center sm:px-6">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Jayesh Waghela. All rights reserved.
        </p>
        <a href="#home" className="footer-watermark-name">
          Jayesh Waghela
        </a>
        <p className="footer-watermark-role">
          Front End Developer &amp; Data Analyst
        </p>
      </div>
    </footer>
  );
}

function GradientCursor() {
  const cursorRef = React.useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches)
      return undefined;

    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrame;

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animationFrame = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
      const isInteractive =
        typeof event.target?.closest === "function" &&
        event.target.closest(
          'a, button, input, textarea, select, [role="button"]',
        );
      cursor.classList.toggle("is-hovering", Boolean(isInteractive));
    };

    const onMouseLeave = () => cursor.classList.remove("is-visible");
    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    animationFrame = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <span ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio render failed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-light px-6 text-center text-slate-700">
          <div>
            <h1 className="mb-3 text-2xl font-bold text-slate-800">
              Something went wrong
            </h1>
            <p className="mb-6">
              Please refresh the page to load the portfolio again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary rounded-full px-6 py-3 font-semibold"
            >
              Reload Portfolio
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

function App() {
  const experience = useExperience();
  const [activeSection, setActiveSection] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
      const current = navItems.find((id) => {
        const section = document.getElementById(id);
        return (
          section &&
          window.scrollY >= section.offsetTop - 120 &&
          window.scrollY < section.offsetTop + section.offsetHeight - 120
        );
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <GradientCursor />
      <Navigation activeSection={activeSection} />
      <main>
        <Hero experience={experience} />
        <About experience={experience} />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="btn-primary fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up" />
        </button>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
);
