export default function ExperienceDescription({position, company, companyLink, jobDate, jobLocation, jobDescription}) {

  return (
    <article className="text-black-theme dark:text-white-theme animate-fade-in">
      <div>
        <h2 className="text-xl text-black-theme dark:text-white-theme">{position} in <a href={companyLink} target="_blank" className="text-black-theme font-bold dark:text-orange-theme">{company}</a></h2>
        <span
        className="flex justify-start items-center gap-2 lg:gap-4"
        ><p className="text-sm lg:text-body font-body leading-tight">{jobDate}</p>|<p className="font-body leading-tight text-sm lg:text-body">{jobLocation}</p></span>
        <ul className="pt-4 max-w-screen-sm space-y-4">
          {
            jobDescription.map((description, index) => (
            <li key={index} className="before:content-['▹'] before:text-orange-light-theme dark:before:text-orange-theme before:mr-4">
              {description}
            </li>
            ))
          }
        </ul>
      </div>
    </article>
  )
}