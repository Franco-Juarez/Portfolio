'use client'

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion'
import Image from "next/image";
import LinkIcon from "../icons/linkIcon";
import ValugeWeb from "../img/valugeWeb.png"
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function FeaturedProyect() {
  const { language } = useLanguage();
  const { work } = translations;


  const ref = useRef(null)
  const isInViewFeatureProyect = useInView(ref, { once: true });

  return (
    <motion.a
      href="https://valuge.com.ar"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Valuge website"
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
      cursor-pointer
      hover:shadow-lg
      transition-all
      block
      ">
      <div
        ref={ref}
        className="space-y-2 lg:space-y-4">
        <h2 className="text-orange-light-theme dark:text-orange-theme font-body text-xl">{work.title[language]}</h2>
        <h3 className="text-3xl font-bold text-black-theme dark:text-white-theme">Valuge</h3>
        <p className="text-black-theme dark:text-white-theme">
          {language === 'en'
            ? 'Comprehensive web platform for a dermatological cosmetics laboratory. Full-stack solution featuring product catalog, pharmacy locator with Google Maps integration, PDF coupon generation system, and complete admin panel for managing products, pharmacies, and users.'
            : 'Plataforma web integral para laboratorio de cosmética dermatológica. Solución full-stack con catálogo de productos, localizador de farmacias con integración de Google Maps, sistema de generación de cupones PDF y panel de administración completo para gestión de productos, farmacias y usuarios.'}
        </p>
        <ul className="font-body flex flex-wrap gap-2 lg:gap-2 text-base text-orange-light-theme dark:text-orange-theme">
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>PostgreSQL</li>
          <li>Prisma ORM</li>
          <li>Nginx</li>
          <li>PM2</li>
          <li>Cloudflare</li>
        </ul>
      </div>
      <Image
        alt="Screenshot of Valuge dermatological cosmetics platform"
        src={ValugeWeb}
        className="w-ful min-h-300px pt-4 lg:pt-0 rounded-sm"
      />
    </motion.a>
  )
}