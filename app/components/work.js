import FeaturedProyect from "./featuredProyect";
import WorkCards from "./workCards";

export default function WorkSection() {
  return (
    <section id="work" className="w-full min-h-screen pt-10 lg:py-24 space-y-4">
      <h2
      className="before:content-['03.'] 
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
      >Some Things I’ve Built</h2>
      <FeaturedProyect />
      <WorkCards />
    </section>
  )
}