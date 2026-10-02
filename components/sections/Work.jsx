"use client";

import { Section, SectionGrid } from "@/components/ui/Section";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { useState } from "react";

export function Work() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const handleSiglykClick = (e, project) => {
    if (project.status === "development") {
      e.preventDefault();
      setActiveProject(project);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveProject(null);
  };

  const projects = [
    {
      title: "Siglyk",
      tech: ["AI Integration", "React", "Python"],
      desc: "An AI-powered communication platform designed to break barriers between the deaf, mute, and hearing communities. It enables real-time translation.",
      links: { demo: "#", source: "https://github.com/Channabasu2007/siglyk" },
      status: "development",
    },
    {
      title: "Junction",
      tech: ["Next.js", "MongoDB", "Tailwind CSS", "Node.js"],
      desc: "A centralized platform where anyone can list all their social media links in one page. Provides convenience for followers to connect across multiple platforms from a single hub.",
      links: {
        demo: "https://junction-seven.vercel.app/channabasu",
        source: "https://github.com/Channabasu2007/junction",
      },
    },
    {
      title: "GroceryFinder",
      tech: ["Next.js", "MongoDB", "AI APIs(Gemini)", "Tailwind CSS"],
      desc: "An AI-powered grocery and recipe platform that helps users discover ingredients and generate recipes using AI APIs, with real-time data handling and a clean, responsive UI.",
      links: {
        demo: "https://groceryfinder.vercel.app",
        source: "https://github.com/Channabasu2007/groso",
      },
    },
  ];

  return (
    <>
      <Section id="work" borderTop>
        <SectionGrid title="Selected Work">
          
          <div className="grid gap-10 sm:gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <FadeIn key={project.title} delay={index * 0.1}>
                <article className="group relative">
                  {/* Project Header */}
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-text-main transition-colors group-hover:text-primary-dark sm:text-xl">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-text-light sm:gap-x-3 sm:text-sm">
                      {project.tech.map((t, i) => (
                        <span key={t}>
                          {t}
                          {i < project.tech.length - 1 && (
                            <span className="mx-1">•</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-5 max-w-3xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
                    {project.desc}
                  </p>

                  {/* Project Links */}
                  <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base">
                    <Link
                      href={project.links.demo}
                      onClick={(e) =>
                        project.status === "development" &&
                        handleSiglykClick(e, project)
                      }
                      className="border-b border-primary/40 pb-px text-text-main transition-all hover:border-primary hover:text-primary-dark"
                      {...(project.status !== "development"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      Live Demo
                    </Link>

                    <Link
                      href={project.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted transition-colors hover:text-text-main"
                    >
                      Source Code
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          
        </SectionGrid>
      </Section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Project Status"
        footer={
          <Button
            onClick={() => window.open(activeProject?.links.source, "_blank")}
            className="w-full justify-center"
          >
            Visit GitHub Repository
          </Button>
        }
      >
        <div className="space-y-4">
          <p className="text-text-muted">
            <span className="font-medium text-text-main">Siglyk</span> is
            currently in the active development phase.
          </p>
          <p className="text-text-muted text-sm">
            We are working hard to bring this AI-powered communication platform
            to life. You can check the code and progress on the GitHub
            repository.
          </p>
        </div>
      </Modal>
    </>
  );
}
