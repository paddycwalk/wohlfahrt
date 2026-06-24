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

export function References() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const projects = [
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/badezimmer-fliesenleger-fliesen.jpeg?w=915&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/DSC_0113-3.jpeg?w=915&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/IMG-20201120-WA0007.jpeg?resize=1080%2C772&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/e252c771-32a9-44d7-9ef2-fe6bdea5a1db-1.jpeg?w=1024&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/IMG_20201125_103955.jpeg?resize=1080%2C772&ssl=1",
    },
  ];

  const images = projects.map((p) => p.image);

  return (
    <div className="overflow-hidden">
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
              src="https://images.unsplash.com/photo-1625578622297-56606e41830f?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3NTcyODQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="References"
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
            <p className="text-xs tracking-[0.4em] text-accent uppercase mb-4">
              Referenzen
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-white tracking-tight">
              Unsere Projekte
            </h1>
          </RevealText>
        </div>
      </section>

      {/* Gallery — Editorial Alternating Layout */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Portfolio"
            title="Qualität, die man sehen kann"
            centered
          />

          <div className="space-y-4">
            {/* Row 1: Large + Small */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <GalleryItem
                project={projects[0]}
                index={0}
                onClick={() => setSelectedImage(0)}
                className="md:col-span-8 h-[300px] md:h-[500px]"
              />
              <GalleryItem
                project={projects[1]}
                index={1}
                onClick={() => setSelectedImage(1)}
                className="md:col-span-4 h-[300px] md:h-[500px]"
              />
            </div>
            {/* Row 2: Three equal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GalleryItem
                project={projects[2]}
                index={2}
                onClick={() => setSelectedImage(2)}
                className="h-[300px] md:h-[400px]"
              />
              <GalleryItem
                project={projects[3]}
                index={3}
                onClick={() => setSelectedImage(3)}
                className="h-[300px] md:h-[400px]"
              />
              <GalleryItem
                project={projects[4]}
                index={4}
                onClick={() => setSelectedImage(4)}
                className="h-[300px] md:h-[400px]"
              />
            </div>
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
                  Ihr Projekt
                  <br />
                  <span className="text-accent">ist das nächste</span>
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
                <p className="text-white/70 text-lg mb-10">
                  Über 1000 zufriedene Kunden vertrauen auf unsere Expertise.
                  Werden Sie Teil unserer Erfolgsgeschichte.
                </p>
                <Link to="/kontakt">
                  <Button
                    variant="primary"
                    className="text-sm px-10 py-5 flex items-center gap-3"
                  >
                    Kontakt aufnehmen <ArrowRight size={16} />
                  </Button>
                </Link>
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
  project: { title: string; category: string; image: string };
  index: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      <ImageWithFallback
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        width={1080}
        height={720}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <span className="text-xs tracking-[0.2em] text-accent uppercase mb-2">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl text-white">{project.title}</h3>
      </div>
    </motion.div>
  );
}
