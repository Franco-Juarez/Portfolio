"use client"
import Button from "./button";
import { motion } from 'framer-motion';
import HamburgerIcon from "../icons/hamburger";
import { useState } from "react";
import Image from "next/image";
import ExitIcon from "../icons/exitIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

const navVariants = {
  hidden: {
    opacity: 0,
    scale: .2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: .1,
    }
  }
}

const childVariants = {
  hidden: {
    opacity: 0,
    scale: .2
  },
  visible: {
    opacity: 1,
    scale: 1
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { language, toggleLanguage } = useLanguage();
  const { navbar } = translations;


  const [visibleNav, setVisibleNav] = useState(false);
  const handleMobileNav = () => {
    setVisibleNav(!visibleNav);
  }

  const handleLanguageChange = () => {
    toggleLanguage();
    setVisibleNav(false);
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, originY: 0 }}
      className="
    z-50
    sticky 
    top-0 
    bg-white-theme
    dark:bg-black-theme 
    w-full 
    flex 
    justify-between 
    items-center 
    px-4
    lg:px-12 
    py-6 
    backdrop-blur-sm 
    bg-white-theme/90
    dark:bg-black-theme/90"
    >
      <span className="text-white-theme font-body text-2xl z-50">
        <Link href="/">
          <Image
            src={'logo.svg'}
            className="main-logo"
            alt="Logo of Franco Juárez's web. A representation of his initials using white and orange colors."
            height={80}
            width={80}
          />
        </Link>
      </span>
      <nav>
        <motion.ul
          variants={navVariants}
          initial={'hidden'}
          animate={'visible'}
          className="container text-black-theme dark:text-white-theme lg:flex items-center space-x-4 font-body hidden">
          <motion.li
            variants={childVariants}
          >
            {isHomePage ? (
              <a href="#about" className="before:content-['1.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.about[language]}
              </a>
            ) : (
              <Link href="/#about" className="before:content-['1.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.about[language]}
              </Link>
            )}
          </motion.li>
          <motion.li
            variants={childVariants}
          >
            {isHomePage ? (
              <a href="#experience" className="before:content-['2.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.experience[language]}
              </a>
            ) : (
              <Link href="/#experience" className="before:content-['2.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.experience[language]}
              </Link>
            )}
          </motion.li>
          <motion.li
            variants={childVariants}
          >
            {isHomePage ? (
              <a href="#work" className="before:content-['3.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.work[language]}
              </a>
            ) : (
              <Link href="/#work" className="before:content-['3.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.work[language]}
              </Link>
            )}
          </motion.li>
          <motion.li
            variants={childVariants}
          >
            {isHomePage ? (
              <a href="#contact" className="before:content-['4.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.contact[language]}
              </a>
            ) : (
              <Link href="/#contact" className="before:content-['4.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
                {navbar.contact[language]}
              </Link>
            )}
          </motion.li>
          <motion.li
            variants={childVariants}
          >
            <a href="/presupuestador" className="before:content-['5.'] before:mr-0.5 dark:before:text-orange-theme before:text-orange-light-theme hover:text-orange-light-theme dark:hover:text-orange-theme cursor-pointer">
              {navbar.presupuestador[language]}
            </a>
          </motion.li>
          <motion.li
            variants={childVariants}
          >
            <Button
              btnText={navbar.resume[language]}
              link={"https://drive.google.com/file/d/1L0FWmPD6H77n6xFUnkmzazxMFmXRXm9Y/view?usp=sharing"}
              isExternal={true}
            />
          </motion.li>
          <motion.li
            variants={childVariants}
          >
            <button className="cursor-pointer" onClick={handleLanguageChange}>
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </motion.li>
        </motion.ul>
      </nav>
      <button
        aria-label={visibleNav ? "Close Menu" : "Open Menu"}
        onClick={handleMobileNav} className="lg:hidden z-50">
        {visibleNav ? <ExitIcon /> : <HamburgerIcon />}
      </button>
      <nav
        className={visibleNav ? "flex flex-col absolute top-0 right-0 lg:hidden z-0" : "hidden"}>
        <ul
          className="flex flex-col items-center justify-center text-black-theme dark:text-white-theme text-center gap-8 backdrop-blur-sm 
        bg-white-theme dark:bg-black-theme/95 rounded-md w-screen min-h-screen text-xl font-body animate-fade-in-slow fill-mode-forwards"
        >
          <li>
            {isHomePage ? (
              <a className="before:content-['1.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="#about">
                {navbar.about[language]}
              </a>
            ) : (
              <Link className="before:content-['1.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="/#about">
                {navbar.about[language]}
              </Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <a className="before:content-['2.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="#experience">
                {navbar.experience[language]}
              </a>
            ) : (
              <Link className="before:content-['2.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="/#experience">
                {navbar.experience[language]}
              </Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <a className="before:content-['3.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="#work">
                {navbar.work[language]}
              </a>
            ) : (
              <Link className="before:content-['3.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="/#work">
                {navbar.work[language]}
              </Link>
            )}
          </li>
          <li className="pb-4">
            {isHomePage ? (
              <a className="before:content-['4.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="#contact">
                {navbar.contact[language]}
              </a>
            ) : (
              <Link className="before:content-['4.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="/#contact">
                {navbar.contact[language]}
              </Link>
            )}
          </li>
          <li>
            <a className="before:content-['5.'] before:mr-0.5 before:text-orange-theme hover:text-orange-theme" onClick={handleMobileNav} href="/presupuestador">
              {navbar.presupuestador[language]}
            </a>
          </li>
          <li onClick={handleMobileNav}>
            <Button
              btnText={navbar.resume[language]}
              link={"https://drive.google.com/file/d/1L0FWmPD6H77n6xFUnkmzazxMFmXRXm9Y/view?usp=sharing"}
              isExternal={true}
            />
          </li>
          <motion.li
            variants={childVariants}
          >
            <button className="cursor-pointer" onClick={handleLanguageChange}>
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  )
}