'use client'

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion'
import Image from "next/image";
import LinkIcon from "../icons/linkIcon";
import SwwwingAgency from "../img/swwwingAgency.png"
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function FeaturedProyect() {
  const { language } = useLanguage();
  const { work } = translations;


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
      ">
      <div
        ref={ref}
        className="space-y-2 lg:space-y-4">
        <h2 className="text-orange-light-theme dark:text-orange-theme font-body text-xl">{work.title[language]}</h2>
        <h3 className="text-3xl font-bold text-black-theme dark:text-white-theme">Swwwing Landing Page</h3>
        <p className="text-black-theme dark:text-white-theme">
          {work.description[language]}
        </p>
        <ul className="font-body flex space-x-4 text-base">
          <li>React</li>
          <li>Chakra UI</li>
          <li>Framer Motion</li>
        </ul>
        <div className="flex space-x-4">
          <a aria-label="Link to Swwwing homepage" target='_blank' href="https://www.swwwing.com.ar/"><LinkIcon /></a>
        </div>
      </div>
      <Image
        width={300}
        height={200}
        alt="Placeholder for Swwwing landing page design"
        src={SwwwingAgency}
        className="w-full pt-4 lg:pt-0 lg:w-3/4 rounded-sm"
      />
    </motion.article>
  )
}