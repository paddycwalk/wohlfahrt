"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { GalleryModal } from "../components/molecules/GalleryModal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";
import { asset } from "../lib/asset";
import { sbEditable } from "../lib/editable";
import {
  defaultReferencesContent,
  type ReferencesContent,
  type ReferenceProject,
} from "../content/pages/references";

/** Relative Pfade ueber den Base-Path aufloesen, externe URLs unveraendert. */
function resolveImage(src: string): string {
  return src.startsWith("/") ? asset(src) : src;
}

/**
 * Anzeigebreite der Projektkacheln fuer die `srcset`-Auswahl. Die Karten
 * spannen je nach Reihe `md:col-span-4` bis `md:col-span-8` von 12 bzw. ein
 * Drittel in `md:grid-cols-3` – ausgelegt auf die breiteste Variante.
 */
const PROJECT_SIZES = "(min-width: 768px) 66vw, 100vw";

/**
 * Spaltenzahl der zweiten Reihe, abhaengig von der Anzahl der restlichen
 * Kacheln. Tailwind scannt Klassennamen statisch – daher eine Tabelle statt
 * einer Interpolation.
 */
const ROW_2_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export function References({
  content = defaultReferencesContent,
}: {
  content?: ReferencesContent;
}) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const projects = content.projects;
  const images = projects.map((p) => resolveImage(p.image));
  // Bewusst aus der Liste abgeleitet statt fest verdrahtet: eine in Storyblok
  // geloeschte Referenz darf die Seite nicht mit einem undefined-Zugriff killen.
  const leadProjects = projects.slice(0, 2);
  const restProjects = projects.slice(2);

  return (
    <div className="overflow-hidden" {...sbEditable(content.editable)}>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={resolveImage(content.heroImage)}
              alt={`${content.heroTitle} – ${content.heroEyebrow} von Wohlfahrt & Wohlfahrt`}
              className="w-full h-full object-cover"
              priority
              width={1920}
              height={1080}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-24">
          <RevealText>
            {/* Wie auf dem About-Hero: aufgehelltes Akzentrot, groesser und
                fett – sonst geht der Eyebrow auf dem dunklen Bild unter. */}
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-accent-on-dark md:text-base">
              {content.heroEyebrow}
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-white tracking-tight">
              {content.heroTitle}
            </h1>
          </RevealText>
        </div>
      </section>

      {/* Gallery — Editorial Alternating Layout */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader
            label={content.galleryLabel}
            title={content.galleryTitle}
            centered
          />

          <div className="space-y-4">
            {/* Reihe 1: eine grosse + eine schmale Kachel */}
            {leadProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {leadProjects.map((project, i) => (
                  <GalleryItem
                    key={`${project.title}-${i}`}
                    project={project}
                    index={i}
                    onClick={() => setSelectedImage(i)}
                    className={`${
                      leadProjects.length === 1
                        ? "md:col-span-12"
                        : i === 0
                          ? "md:col-span-8"
                          : "md:col-span-4"
                    } h-[300px] md:h-[500px]`}
                  />
                ))}
              </div>
            )}
            {/* Reihe 2: alle weiteren Kacheln, dreispaltig */}
            {restProjects.length > 0 && (
              <div className={`grid grid-cols-1 gap-4 ${ROW_2_COLS[restProjects.length] ?? "md:grid-cols-3"}`}>
                {restProjects.map((project, i) => (
                  <GalleryItem
                    key={`${project.title}-${i + 2}`}
                    project={project}
                    index={i + leadProjects.length}
                    onClick={() => setSelectedImage(i + leadProjects.length)}
                    className="h-[300px] md:h-[400px]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedImage !== null && (
        <GalleryModal
          images={images}
          alts={projects.map(
            (p, i) =>
              `Referenzprojekt ${p.category}: ${p.title} – Bild ${i + 1} von ${projects.length}`,
          )}
          currentIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* CTA */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <RevealText>
                <h2 className="text-5xl md:text-7xl tracking-tight leading-[0.95]">
                  {content.ctaTitlePre}
                  <br />
                  <span className="text-accent">{content.ctaTitleAccent}</span>
                </h2>
              </RevealText>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white/70 text-lg mb-10">{content.ctaText}</p>
                <Button
                  asChild
                  variant="primary"
                  className="text-sm px-10 py-5 flex items-center gap-3"
                >
                  <Link to={content.ctaButtonLink}>
                    {content.ctaButtonLabel} <ArrowRight size={16} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryItem({
  project,
  index,
  onClick,
  className = "",
}: {
  project: ReferenceProject;
  index: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative block w-full overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${className}`}
      onClick={onClick}
      aria-label={`${project.category}: ${project.title} vergrößern`}
      {...sbEditable(project.editable)}
    >
      <ImageWithFallback
        src={resolveImage(project.image)}
        alt={project.title}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        width={1080}
        height={720}
        sizes={PROJECT_SIZES}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <span className="text-xs tracking-[0.2em] text-accent uppercase mb-2">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl text-white">{project.title}</h3>
      </div>
    </motion.button>
  );
}
