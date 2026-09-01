'use client'

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion'
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function FeaturedProyect() {
  const { language } = useLanguage();
  const { work } = translations;
  const featured = work.featured;

  const ref = useRef(null)
  const isInViewFeatureProyect = useInView(ref, { once: true });

  return (
    <motion.article
      style={{
        opacity: isInViewFeatureProyect ? 1 : 0,
        transform: 'scale(1)',
        transition: "all .5s ease-in-out"
      }}
      className="
      bg-white-card
      dark:bg-black-card
      shadow-md
      text-black-theme
      dark:text-white-theme
      p-4
      lg:p-8
      rounded-md
      space-y-4
      lg:space-x-4
      flex
      flex-col
      lg:flex-row
      lg:justify-between
      lg:items-start
      duration-100
      hover:shadow-lg
      transition-all
      ">
      <div
        ref={ref}
        className="space-y-2 lg:space-y-4 lg:max-w-md lg:shrink-0">
        <h2 className="text-orange-light-theme dark:text-orange-theme font-body text-xl">{work.title[language]}</h2>
        <h3 className="text-3xl font-bold text-black-theme dark:text-white-theme">{featured.name[language]}</h3>
        <p className="text-slate-400 text-sm font-body">{featured.client[language]}</p>
        <p className="text-black-theme dark:text-white-theme">
          {featured.description[language]}
        </p>
        <p className="text-sm text-black-theme dark:text-white-theme">
          {featured.credit[language]}{" "}
          <span className="text-orange-light-theme dark:text-orange-theme font-bold">
            {featured.collaborator[language]}
          </span>
        </p>
        <ul className="font-body flex flex-wrap gap-2 lg:gap-2 text-base text-orange-light-theme dark:text-orange-theme">
          {featured.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <video
        className="w-full lg:flex-1 lg:min-w-0 pt-4 lg:pt-0 rounded-sm bg-black-theme"
        controls
        playsInline
        preload="metadata"
        poster="/videos/medroster-poster.jpg"
        aria-label={language === "en" ? "MedRoster product demo" : "Demo de producto MedRoster"}
      >
        <source src="/videos/medroster-promo.mp4" type="video/mp4" />
      </video>
    </motion.article>
  )
}
