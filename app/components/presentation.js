'use client'
import Button from "./button";
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function Presentation() {
  const { language } = useLanguage();
  const { presentation } = translations;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="flex flex-col items-start w-full space-y-3 py-4 lg:space-y-2 min-h-fit lg:pb-24"
    >
      <h2
        className="text-orange-light-theme dark:text-orange-theme font-body text-md lg:text-lg pb-2"
      >
        {presentation.greeting[language]}
      </h2>
      <h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-slate-200 text-5xl lg:text-7xl font-bold pb-2 
    bg-gradient-to-r from-[#E08A00] to-[#FFE7AD] dark:from-[#ff8906] dark:to-[#FFF8EB] bg-clip-text text-transparent animate-gradientText bg-[200%_auto]">
        Franco Juárez
      </h1>
      <h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-black-theme dark:text-white-theme text-5xl lg:text-7xl font-bold pb-4">
        {presentation.buildTogether[language]}
      </h2>
      <p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-black-theme dark:text-white-theme lg:text-xl max-w-2xl pb-4 lg:pb-12">
        {presentation.description[language]}
        <span className="text-orange-light-theme dark:text-orange-theme ml-1">
          {presentation.efficientWebsites[language]}
        </span>
      </p>
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-2"
      >
        <Button
          btnText={presentation.letsChat[language]}
          link={"mailto:franjuaache@gmail.com"}
          isExternal={false}
        />
      </div>
    </motion.section>
  )
}