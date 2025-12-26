'use client'
import FolderIcon from "../icons/folder";
import LinkIcon from "../icons/linkIcon";
import { motion, useInView } from 'framer-motion';
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";


const cardVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: .2,
    }
  }
}

const cardChildVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  }
};

export default function WorkCards() {
  const { language } = useLanguage();
  const { workCardsArray } = translations;

  const ref = useRef(null)
  const isInViewWorkCards = useInView(ref, { once: true });

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      initial={'hidden'}
      animate={isInViewWorkCards ? 'visible' : 'hidden'}
      className="grid lg:grid-cols-2 gap-4">
      {workCardsArray.map((proyect, index) =>
      (
        <motion.a
          href={proyect.deployLink[language]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${proyect.title[language]} website`}
          variants={cardChildVariants}
          key={index}
          className="bg-white-card
      dark:bg-black-card
      min-h-[250px]
      w-auto
      rounded-md
      shadow-md
      p-4
      space-y-2
      duration-700
      border
      dark:border-black-card
      dark:hover:border-orange-theme
      cursor-pointer
      hover:shadow-lg
      transition-all
      block
      ">
          <div>
            <p className="text-slate-400 text-sm font-body">{proyect.date[language]}</p>
            <h2 className="text-black-theme dark:text-white-theme font-bold text-lg">
              {proyect.title[language]}
            </h2>
          </div>
          <p className="text-black-theme dark:text-white-theme">
            {proyect.description[language]}
          </p>
          <ul className="text-black-theme dark:text-white-theme font-body flex flex-wrap gap-2 pt-2">
            {proyect.tools.map((tool, index) => (
              <li
                className="text-orange-light-theme dark:text-orange-theme"
                key={index}>{tool}</li>
            ))}
          </ul>
        </motion.a>
      ))}

    </motion.article>
  )
}