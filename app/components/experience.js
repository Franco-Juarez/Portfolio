"use client"
import { useState } from "react"
import ExperienceDescription from "./experienceDescription";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function ExperienceSection() {
  const { language } = useLanguage();
  const { experience } = translations;
  const [activeSection, setActiveSection] = useState("restoExperience");

  const handleRender = (id) => {
    setActiveSection(id);
  };

  return (
    <section id="experience" className="w-full min-h-fit lg:min-h-screen pt-0 pb-4 lg:py-24 space-y-4">
      <h2
        className="before:content-['02.'] 
        before:font-body 
        before:mr-2 
        after:mr-2 
        before:text-2xl
        before:text-orange-light-theme
        dark:before:text-orange-theme
        before:font-normal
        text-black-theme
        dark:text-white-theme
        text-3xl
        font-bold
        "
      >{experience.title[language]}</h2>
      <header>
        <nav>
          <ul className="text-black-theme dark:text-white-theme flex flex-wrap gap-2 lg:gap-4">
            <li onClick={() => handleRender("restoExperience")} className={activeSection === "restoExperience" ? "border-b border-orange-light-theme dark:border-orange-theme cursor-pointer hover:text-orange-light-theme dark:hover:text-orange-theme" : "hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer"}>
              {experience.restoExperience[language]}
            </li>
            <li onClick={() => handleRender("poiseDigital")} className={activeSection === "poiseDigital" ? "border-b border-orange-light-theme dark:border-orange-theme cursor-pointer hover:text-orange-light-theme dark:hover:text-orange-theme" : "hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer"}>
              {experience.poiseDigital[language]}
            </li>
            <li onClick={() => handleRender("valuge")} className={activeSection === "valuge" ? "border-b border-orange-light-theme dark:border-orange-theme cursor-pointer hover:text-orange-light-theme dark:hover:text-orange-theme" : "hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer"}>
              {experience.valuge[language]}
            </li>
            <li onClick={() => handleRender("magnusHRS")} className={activeSection === "magnusHRS" ? "border-b border-orange-light-theme dark:border-orange-theme cursor-pointer hover:text-orange-light-theme dark:hover:text-orange-theme" : "hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer"}>
              {experience.magnusHRS[language]}
            </li>
          </ul>
        </nav>
      </header>
      {activeSection === "restoExperience" &&
        <ExperienceDescription
          position={experience.webDesignDevManager.position[language]}
          company={experience.webDesignDevManager.company[language]}
          companyLink="https://www.linkedin.com/company/restoexperience/"
          jobDate={experience.webDesignDevManager.jobDate[language]}
          jobLocation={experience.webDesignDevManager.jobLocation[language]}
          jobDescription={[
            experience.webDesignDevManager.description1[language],
            experience.webDesignDevManager.description2[language]
          ]}
        />
      }
      {activeSection === "restoExperience" &&
        <ExperienceDescription
          position={experience.wordpressDev.position[language]}
          company={experience.wordpressDev.company[language]}
          companyLink="https://www.linkedin.com/company/restoexperience/"
          jobDate={experience.wordpressDev.jobDate[language]}
          jobLocation={experience.wordpressDev.jobLocation[language]}
          jobDescription={[
            experience.wordpressDev.description1[language],
            experience.wordpressDev.description2[language]
          ]}
        />
      }
      {activeSection === "poiseDigital" &&
        <ExperienceDescription
          position={experience.poiseFullStack.position[language]}
          company={experience.poiseFullStack.company[language]}
          companyLink="https://poisedigitalstudio.com"
          jobDate={experience.poiseFullStack.jobDate[language]}
          jobLocation={experience.poiseFullStack.jobLocation[language]}
          jobDescription={[
            experience.poiseFullStack.description1[language],
            experience.poiseFullStack.description2[language]
          ]}
        />
      }
      {activeSection === "valuge" &&
        <ExperienceDescription
          position={experience.valugeFullStack.position[language]}
          company={experience.valugeFullStack.company[language]}
          companyLink="https://valuge.com.ar"
          jobDate={experience.valugeFullStack.jobDate[language]}
          jobLocation={experience.valugeFullStack.jobLocation[language]}
          jobDescription={[
            experience.valugeFullStack.description1[language],
            experience.valugeFullStack.description2[language]
          ]}
        />
      }
      {activeSection === "magnusHRS" &&
        <ExperienceDescription
          position={experience.magnusWebDev.position[language]}
          company={experience.magnusWebDev.company[language]}
          companyLink="https://magnushrs.com"
          jobDate={experience.magnusWebDev.jobDate[language]}
          jobLocation={experience.magnusWebDev.jobLocation[language]}
          jobDescription={[
            experience.magnusWebDev.description1[language],
            experience.magnusWebDev.description2[language]
          ]}
        />
      }
      {activeSection === "swwwing" &&
        <ExperienceDescription
          position={experience.frontendDev.position[language]}
          company={experience.frontendDev.company[language]}
          companyLink="https://www.linkedin.com/company/swwwing/"
          jobDate={experience.frontendDev.jobDate[language]}
          jobLocation={experience.frontendDev.jobLocation[language]}
          jobDescription={[
            experience.frontendDev.description1[language],
            experience.frontendDev.description2[language]
          ]}
        />
      }
    </section>
  )
}