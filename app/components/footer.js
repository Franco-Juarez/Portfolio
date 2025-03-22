import GithubIcon from "../icons/github";
import LinkedinIcon from "../icons/linkedin";
import XIcon from "../icons/x-icon";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center py-4 space-y-2">
        <ul className="flex justify-center space-x-4">
          <li>
            <a 
            aria-label="Link to my Linkedin profile"
            href="https://www.linkedin.com/in/francojuarez/" target="_blank">
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a 
            aria-label="Link to my X profile"
            href="https://twitter.com/DevJuarrison" target="_blank">
              <XIcon />
            </a>
          </li>
          <li>
            <a 
            aria-label="Link to my GitHub profile"
            href="https://github.com/Franco-Juarez" target="_blank">
              <GithubIcon />
            </a>
          </li>
        </ul>
        <a href="mailto:franjuaache@gmail.com" className="text-black-theme dark:text-white-theme text-center text-sm font-body hover:text-green-theme">
        Designed & Built by Franco Juárez
        </a>
    </footer>
  )
}