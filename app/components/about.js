'use client'
import Image from "next/image";
import Portrait from "../img/portrait.png"
import Button from "./button";
import ReactIcon from "../icons/reactIcon";
import HtmlIcon from "../icons/htmlIcon";
import CssIcon from "../icons/cssIcon";
import TypeScriptIcon from "../icons/typescriptIcon";
import PostgresIcon from "../icons/postgresIcon";
import GitIcon from "../icons/gitIcon";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function About() {
  const { language } = useLanguage();
  const { about } = translations;

  return (
    <section id="about" className="w-full lg:min-h-screen py-12 lg:py-24 space-y-4">
      <h2
        className="before:content-['01.'] 
      before:font-body 
      before:mr-2 
      after:mr-2 
      before:text-2xl
      before:text-orange-light-theme
      dark:before:color-orange-theme
      before:font-normal
      text-black-theme
      dark:text-white-theme
      text-3xl
      font-bold
      "
      >{about.title[language]}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-col gap-y-4 lg:gap-4">
        <article className="row-span-3 font-body text-black-theme dark:text-white-theme bg-white-theme dark:bg-black-card p-8 rounded-md shadow-md flex flex-col items-center space-y-2">
          <Image
            className="rounded-full"
            alt="Portrait of Franco Juárez on an orange background, front-end developer and creator of this website"
            width={300}
            height={300}
            priority
            title="Portrait of Franco Juárez"
            src={Portrait}
          />
          <h2 className="pt-2 font-display text-orange-light-theme dark:text-orange-theme text-xl font-bold">Franco Juárez</h2>
          <a href="mailto:franjuaache@gmail.com" className="pb-4 hover:text-orange-light-theme dark:hover:text-orange-theme">franjuaache@gmail.com</a>
          <Button
            btnText={about.resume[language]}
            link={"https://drive.google.com/file/d/1L0FWmPD6H77n6xFUnkmzazxMFmXRXm9Y/view?usp=sharing"}
            isExternal={true}
          />
        </article>
        <article className="col-span-2 bg-white-theme dark:bg-black-card space-y-4 text-black-theme dark:text-white-theme p-4 rounded-md shadow-md">
          <h2 className="
          text-lg
          text-black-theme
          dark:text-white-theme 
          font-body 
          font-bold
          before:content-['>']
          before:mr-2
          before:text-orange-light-theme
          dark:before:text-orange-theme
          ">
            {about.shortIntro[language]}
          </h2>
          <p
            className="text-base"
          >
            {about.intro1[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.linguisticsDegree[language]}
            </span>
            {about.intro2[language]}
          </p>
          <p
            className="text-base"
          >
            {about.codingPhilosophy1[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.techStack[language]}
            </span>
            {about.and[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.reactjs[language]}
            </span>
            {about.frameworks[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.nextjs[language]}
            </span>
            {about.efficientWebsites[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.firebase[language]}
            </span>
            {about.backendWizardry[language]}
            {about.dynamicDev[language]}
          </p>
          <p className="text-base">
            {about.currentStudies[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.techDegree[language]}
            </span>
            {about.utn[language]}
          </p>
          <p
            className="text-base"
          >
            {about.learning[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.growingCollectively[language]}
            </span>
            {about.thriving[language]}
            <span className="text-orange-light-theme dark:text-orange-theme mx-1">
              {about.continuousLearning[language]}
            </span>
          </p>
        </article>
        <article className="row-span-2 col-span-2 bg-white-theme dark:bg-black-card p-4 rounded-md shadow-md text-black-theme dark:text-white-theme">
          <div className="space-y-2">
            <h2 className="
            text-lg
            text-black-theme
            dark:text-white-theme
            font-body 
            font-bold
            before:content-['>']
            before:mr-2
            before:border-orange-theme
            ">
              {about.everydayTools[language]}
            </h2>
            <div className="flex flex-wrap gap-2">
              <HtmlIcon />
              <CssIcon />
              <TypeScriptIcon />
              <ReactIcon />
              <PostgresIcon />
              <GitIcon />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}