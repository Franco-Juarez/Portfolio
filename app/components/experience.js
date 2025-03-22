"use client"
import { useState } from "react"
import ExperienceDescription from "./experienceDescription";

export default function ExperienceSection() {

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
      >Experience</h2>
      <header>
        <nav>
          <ul className="text-black-theme dark:text-white-theme flex space-x-2 lg:space-x-4">
            <li onClick={() => handleRender("restoExperience")} className={activeSection === "restoExperience" ? "border-b border-orange-light-theme dark:border-orange-theme cursor-pointer hover:text-orange-light-theme dark:hover:text-orange-theme" : "hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer"}>
              Resto Experience
            </li>
            <li onClick={() => handleRender("swwwing")} className={activeSection === "swwwing" ? "border-b border-orange-light-theme dark:border-orange-theme cursor-pointer hover:text-orange-light-theme dark:hover:text-orange-theme" : "hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer"}>
              Swwwing Agency
            </li>
          </ul>
        </nav>
      </header>
      {activeSection === "restoExperience" && 
        <ExperienceDescription
        position="Web Design & Development Manager"
        company="Resto Experience"
        companyLink="https://www.linkedin.com/company/restoexperience/"
        jobDate="Mar 2024 - Present"
        jobLocation="Atlanta, United States"
        jobDescription={[
          "As the manager of the Web Design and Development team, I am responsible for organizing team tasks, providing support for the execution of complex tasks, creating comprehensive maintenance strategies for all websites, and guiding the team to help them develop their potential.",
          "By combining my technical experience with a keen eye for design integration, I play a pivotal role in delivering digital platforms that not only meet functional requirements but also provide an aesthetically pleasing and user-friendly online experience. My role as leader ensures that our web development projects are executed efficiently, on time, and within budget, while continuously striving to innovate and improve our web design strategies."
        ]}
        />
      }
      {activeSection === "restoExperience" && 
      <ExperienceDescription
      position="Wordpress Developer"
      company="Resto Experience"
      companyLink="https://www.linkedin.com/company/restoexperience/"
      jobDate="Jun 2023 - Mar 2024"
      jobLocation="Atlanta, United States"
      jobDescription={[
        "I specialize in crafting responsive and user-centric websites, primarily leveraging WordPress as the foundation. My approach involves integrating custom elements using HTML, CSS, and JavaScript to ensure a tailored and dynamic user experience. I work closely with both the graphic design and UX/UI design teams, fostering collaborative efforts to seamlessly merge visual and interactive components. This collaborative process aims not only to enhance the overall user experience but also to uphold the visual coherence and corporate identity of our clients.",
        "In addition to my development role, I take charge of the essential optimization process for projects, adapting them to diverse resolutions. This final step ensures that the websites perform optimally across various devices and screen sizes. By combining technical expertise with a keen eye for design integration, I contribute to creating digital platforms that not only meet functional requirements but also excel in delivering an aesthetically pleasing and user-friendly online experience."
      ]}
      />
      }
      {activeSection === "swwwing" && 
        <ExperienceDescription
        position="Front-end Developer"
        company="Swwwing Agency"
        companyLink="https://www.linkedin.com/company/swwwing/"
        jobDate="Sep 2023 - Present"
        jobLocation="Buenos Aires, Argentina"
        jobDescription={[
          "I specialized in crafting dynamic and efficient websites using React.js, while integrating UI libraries such as Chakra UI and Material UI. Leveraging Git for version control, I operated as an independent contractor, collaborating closely with diverse clients to translate their visions into responsive and scalable digital solutions.",
          "Collaborated with the design team to generate creative concepts addressing client challenges. Worked collaboratively to explore new possibilities and scalable solutions. Ensured cohesive user experiences across various web apps through collaboration with designers and developers. Implemented Vercel and Vite for efficient project compilation, ensuring seamless integration of new features and continuous project management."
        ]}
        />
      }
    </section>
  )
}