import Image from "next/image";
import Portrait from "../img/portrait.png"
import Button from "./button";
import ReactIcon from "../icons/reactIcon";
import HtmlIcon from "../icons/htmlIcon";
import CssIcon from "../icons/cssIcon";
import JsIcon from "../icons/jsIcon";
import GitIcon from "../icons/gitIcon";
import WordpressIcon from "../icons/wordpressIcon";

export default function About() {
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
      >About Me</h2>
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
            btnText={"Resumee"}
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
            A short introduction
          </h2>
          <p
          className="text-base"
          >
          My academic journey began long before I ventured into the IT world when I obtained my <span className="text-orange-light-theme dark:text-orange-theme">Linguistics Professor´s  Degree</span>. Although this may sound random, this diverse background has been instrumental in my approach to coding.
          </p>
          <p 
          className="text-base"
          >
          Understanding syntax and structure isn´t just about languages; it forms the rock of my coding philosophy. I´ve delved deep into <span className="text-orange-light-theme dark:text-orange-theme">JavaScript, HTML, CSS,</span> and <span className="text-orange-light-theme dark:text-orange-theme">React.js,</span> exploring frameworks like <span className="text-orange-light-theme dark:text-orange-theme">Next.js</span> to construct efficient, delightful-to-use websites. In my tech toolkit, platforms like <span className="text-orange-light-theme dark:text-orange-theme">Firebase</span> for backend wizardry and <span className="text-orange-light-theme dark:text-orange-theme">Vercel</span> for dynamic web development have been my go-to allies in creating scalable solutions.
          </p>
          <p className="text-base">
          Currently, I am further enhancing my technical expertise by studying a <span className="text-orange-light-theme dark:text-orange-theme">Programming Technical Degree </span>at the National Technological University (UTN). This academic pursuit is sharpening my skills and broadening my understanding of advanced programming concepts and techniques.
          </p>
          <p 
          className="text-base"
          >
          Learning, for me, isn´t a solitary endeavor. It´s about sharing knowledge, <span className="text-orange-light-theme dark:text-orange-theme">growing collectively,</span> and thriving in collaborative environments. I thrive on team synergy, exchanging ideas, and contributing to a culture of <span className="text-orange-light-theme dark:text-orange-theme">continuous learning.</span>
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
              My everyday tools
            </h2>
            <div className="flex space-x-2">
              <HtmlIcon />
              <CssIcon />
              <JsIcon />
              <ReactIcon />
              <GitIcon />
              <WordpressIcon />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}