'use client'
import FolderIcon from "../icons/folder";
import LinkIcon from "../icons/linkIcon";
import proyectCard from "../data/proyectData";
import {motion, useInView} from 'framer-motion';
import { useRef } from "react";

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

  const ref = useRef(null)
  const isInViewWorkCards = useInView(ref, { once: true });

  return (
    <motion.article 
    ref={ref}
    variants={cardVariants}
    initial={'hidden'}
    animate={isInViewWorkCards ? 'visible' : 'hidden'}
    className="grid lg:grid-cols-2 space-y-4 lg:space-y-0 lg:space-x-4">
     {proyectCard.map((proyect, index) => 
     (
      <motion.div 
      variants={cardChildVariants}
      key={index} className="bg-white-card 
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
      ">
        <div className="flex justify-between pb-4">
          <a 
          aria-label={`Link to the ${proyect} repository`}
          href={proyect.repoLink}
          target="_blank"
          >
            <FolderIcon />
          </a>
          <a
          aria-label={`Link to the ${proyect} deploy`}
          href={proyect.deployLink}
          target="_blank">
            <LinkIcon />
          </a>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-body">{proyect.date}</p>
          <h2 className="text-black-theme dark:text-white-theme font-bold text-lg">
          {proyect.title}
          </h2>
        </div>
        <p className="text-black-theme dark:text-white-theme">
          {proyect.description}
        </p>
        <ul className="text-black-theme dark:text-white-theme font-body flex space-x-4 pt-2">
          {proyect.tools.map((tool, index) => (
            <li 
            className="text-orange-light-theme dark:text-orange-theme"
            key={index}>{tool}</li>
          ))}
        </ul>
      </motion.div>
     ))}

    </motion.article>
  )
}