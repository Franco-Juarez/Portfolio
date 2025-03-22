import About from "./components/about";
import Contact from "./components/contact";
import ExperienceSection from "./components/experience";
import Presentation from "./components/presentation";
import WorkSection from "./components/work";


export default function Home() {
  return (
    <main className="flex 
    flex-col 
    items-center 
    justify-center 
    px-5
    pt-8
    lg:px-28
    lg:pt-14
    max-w-screen-xl
    mx-auto
    ">
      <Presentation />
      <About />
      <ExperienceSection />
      <WorkSection />
      <Contact />
    </main>
  )
}
