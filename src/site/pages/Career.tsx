"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { Button } from "../components/atoms/Button";
import { Link } from "react-router";
import {
  Users,
  Award,
  TrendingUp,
  Heart,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  defaultCareerContent,
  type CareerContent,
  type BenefitIcon,
} from "../content/pages/career";
import { sbEditable } from "../lib/editable";

const benefitIcons: Record<BenefitIcon, LucideIcon> = {
  award: Award,
  trendingUp: TrendingUp,
  users: Users,
  heart: Heart,
};

export function Career({
  content = defaultCareerContent,
}: {
  content?: CareerContent;
}) {
  const benefits = content.benefits;
  const openings = content.openings;

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
        </div>
      </section>

      {/* Benefits — Bordered Grid */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader
            label={content.benefitsLabel}
            title={content.benefitsTitle}
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-border mt-16">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[benefit.icon];
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-10 group hover:bg-accent transition-colors duration-500 cursor-default ${index < 3 ? "md:border-r border-border" : ""}`}
                  {...sbEditable(benefit.editable)}
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-accent group-hover:text-white transition-colors duration-500 mb-8"
                  />
                  <h3 className="text-xl mb-3 group-hover:text-white transition-colors duration-500">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-500 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings — Editorial List */}
      <section className="bg-secondary py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader
            label={content.openingsLabel}
            title={content.openingsTitle}
          />
          <div className="max-w-4xl mt-16">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border py-10"
                {...sbEditable(job.editable)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs tracking-[0.15em] text-accent uppercase px-3 py-1 border border-accent/30">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl mb-2">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {job.description}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="primary"
                    className="shrink-0 text-sm flex items-center gap-2"
                  >
                    <Link to={content.openingsButtonLink}>
                      {content.openingsButtonLabel} <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiativbewerbung + Ausbildung */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-background p-12 md:p-20 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs tracking-[0.3em] text-accent uppercase">
                {content.initiativeEyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">
              {content.initiativeTitle}
            </h2>
            <p className="text-muted-foreground mb-8">
              {content.initiativeText}
            </p>
            <Button
              asChild
              variant="primary"
              className="text-sm flex items-center gap-2"
            >
              <Link to={content.initiativeButtonLink}>
                {content.initiativeButtonLabel} <ArrowRight size={14} />
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="bg-primary text-white p-12 md:p-20 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs tracking-[0.3em] text-accent uppercase">
                {content.trainingEyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">
              {content.trainingTitle}
            </h2>
            <p className="text-white/70 mb-8">{content.trainingText}</p>
            <Button
              asChild
              variant="primary"
              className="text-sm flex items-center gap-2"
            >
              <Link to={content.trainingButtonLink}>
                {content.trainingButtonLabel} <ArrowRight size={14} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
