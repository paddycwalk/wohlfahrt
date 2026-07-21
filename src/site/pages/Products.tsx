"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { GalleryModal } from "../components/molecules/GalleryModal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Images } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";
import { asset } from "../lib/asset";
import { sbEditable } from "../lib/editable";
import {
  defaultProductsContent,
  type ProductsContent,
  type ProductCategory,
  type ProductSeries,
} from "../content/pages/products";

/** Relative Pfade ueber den Base-Path aufloesen, externe URLs unveraendert. */
function resolveImage(src: string): string {
  return src.startsWith("/") ? asset(src) : src;
}

export function Products({
  content = defaultProductsContent,
}: {
  content?: ProductsContent;
}) {
  const categories = content.categories;
  const [activeSeries, setActiveSeries] = useState<ProductSeries | null>(null);

  return (
    <div className="overflow-hidden" {...sbEditable(content.editable)}>
      {/* Hero */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <RevealText>
            <p className="text-xs tracking-[0.4em] text-accent uppercase mb-4">
              {content.heroEyebrow}
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight max-w-4xl">
              {content.heroTitle}
            </h1>
          </RevealText>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 text-lg mt-8 max-w-xl"
          >
            {content.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Aktion Banner — kompakt & animiert */}
      <section className="relative bg-accent text-white overflow-hidden border-y border-white/10">
        <motion.div
          aria-hidden
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 w-full bg-[#a8311f] origin-left"
        />
        <motion.div
          aria-hidden
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="absolute -top-10 left-0 flex gap-12 whitespace-nowrap pointer-events-none opacity-[0.06]"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="text-[8rem] font-[Bebas_Neue] leading-none tracking-tight"
            >
              {content.bannerMarqueeText}
            </span>
          ))}
        </motion.div>

        <div className="relative container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 shrink-0"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <span className="text-xs tracking-[0.35em] uppercase">
                {content.bannerBadge}
              </span>
            </motion.div>

            <div className="flex-1 overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.5,
                }}
                className="text-3xl md:text-5xl tracking-tight leading-[0.95]"
              >
                {content.bannerHeadlinePre}{" "}
                <span className="italic font-light opacity-90">
                  {content.bannerHeadlineItalic}
                </span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, staggerChildren: 0.1 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-white/85"
              >
                {content.bannerFeatures.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + i * 0.12 }}
                    className="flex items-center gap-2"
                  >
                    {i > 0 && (
                      <span className="w-1 h-1 bg-white/60 rounded-full" />
                    )}
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="shrink-0"
            >
              <Button
                asChild
                variant="outline"
                className="group border border-white bg-transparent text-white hover:!bg-white hover:!text-accent text-sm px-8 py-4 h-12 flex items-center gap-3 transition-colors"
              >
                <Link to={content.bannerButtonLink}>
                  {content.bannerButtonLabel}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories — Editorial Grid */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader
            label={content.categoriesLabel}
            title={content.categoriesTitle}
          />

          <div className="space-y-4 mt-16">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <ProductCard
                category={categories[0]}
                index={0}
                className="md:col-span-7 h-[350px] md:h-[500px]"
              />
              <ProductCard
                category={categories[1]}
                index={1}
                className="md:col-span-5 h-[350px] md:h-[500px]"
              />
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <ProductCard
                category={categories[2]}
                index={2}
                className="md:col-span-4 h-[350px] md:h-[400px]"
              />
              <ProductCard
                category={categories[3]}
                index={3}
                className="md:col-span-4 h-[350px] md:h-[400px]"
              />
              <ProductCard
                category={categories[4]}
                index={4}
                className="md:col-span-4 h-[350px] md:h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kollektionen — Serien-Galerien */}
      {content.collections.length > 0 && (
        <section className="bg-secondary py-24 md:py-40">
          <div className="container mx-auto px-4">
            <SectionHeader
              label={content.collectionsLabel}
              title={content.collectionsTitle}
            />
            {content.collectionsIntro && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl -mt-4 md:-mt-16 mb-16"
              >
                {content.collectionsIntro}
              </motion.p>
            )}

            <div className="space-y-20">
              {content.collections.map((group) => (
                <div key={group.label} {...sbEditable(group.editable)}>
                  <div className="flex items-baseline gap-4 mb-8">
                    <h3 className="text-2xl md:text-3xl tracking-tight">
                      {group.label}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {group.series.length}{" "}
                      {group.series.length === 1 ? "Serie" : "Serien"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {group.series.map((series, i) => (
                      <SeriesCard
                        key={`${group.label}-${series.title}`}
                        series={series}
                        index={i}
                        onOpen={() => setActiveSeries(series)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSeries && (
        <GalleryModal
          images={activeSeries.images.map(resolveImage)}
          alts={activeSeries.images.map(
            (_, i) =>
              `${activeSeries.title} – Bild ${i + 1} von ${activeSeries.images.length}`,
          )}
          currentIndex={0}
          onClose={() => setActiveSeries(null)}
        />
      )}

      {/* CTA */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <RevealText>
              <h2 className="text-4xl md:text-6xl tracking-tight mb-8">
                {content.ctaTitle}
              </h2>
            </RevealText>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground mb-10"
            >
              {content.ctaText}
            </motion.p>
            <Button
              asChild
              variant="primary"
              className="text-sm flex items-center gap-2 mx-auto"
            >
              <Link to={content.ctaButtonLink}>
                {content.ctaButtonLabel} <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  category,
  index,
  className = "",
}: {
  category: ProductCategory;
  index: number;
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
      {...sbEditable(category.editable)}
    >
      <ImageWithFallback
        src={resolveImage(category.image)}
        alt={category.title}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        width={1080}
        height={1350}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <span className="text-xs tracking-[0.2em] text-accent uppercase mb-2">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-2xl md:text-3xl text-white mb-2">
          {category.title}
        </h3>
        <p className="text-white/60 text-sm max-w-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          {category.description}
        </p>
      </div>
    </motion.div>
  );
}

function SeriesCard({
  series,
  index,
  onOpen,
}: {
  series: ProductSeries;
  index: number;
  onOpen: () => void;
}) {
  const cover = series.images[0];
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: (index % 4) * 0.06,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onOpen}
      aria-label={`${series.title}: Galerie mit ${series.images.length} Bildern öffnen`}
      className="group relative block w-full overflow-hidden text-left cursor-pointer aspect-[4/5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      {...sbEditable(series.editable)}
    >
      <ImageWithFallback
        src={resolveImage(cover)}
        alt={series.title}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        width={800}
        height={1000}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Images size={13} />
        {series.images.length}
      </div>
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <h4 className="text-lg md:text-xl text-white leading-tight">
          {series.title}
        </h4>
      </div>
    </motion.button>
  );
}
