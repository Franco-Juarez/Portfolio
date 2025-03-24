'use client'
import GithubIcon from "../icons/github";
import LinkedinIcon from "../icons/linkedin";
import XIcon from "../icons/x-icon";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function Footer() {
  const { language } = useLanguage();
  const { footer } = translations;

  return (
    <footer className="flex w-full flex-col items-center justify-center py-4 space-y-2">
      <ul className="flex justify-center space-x-4">
        <li>
          <a
            aria-label={footer.linkedin[language]}
            href="https://www.linkedin.com/in/francojuarez/" target="_blank">
            <LinkedinIcon />
          </a>
        </li>
        <li>
          <a
            aria-label={footer.x[language]}
            href="https://twitter.com/DevJuarrison" target="_blank">
            <XIcon />
          </a>
        </li>
        <li>
          <a
            aria-label={footer.github[language]}
            href="https://github.com/Franco-Juarez" target="_blank">
            <GithubIcon />
          </a>
        </li>
      </ul>
      <a href="mailto:franjuaache@gmail.com" className="text-black-theme dark:text-white-theme text-center text-sm font-body hover:text-green-theme">
        {footer.designed[language]} & {footer.built[language]} by Franco Juárez
      </a>
    </footer>
  )
}