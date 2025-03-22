'use client'
import { useRef } from 'react';
import Button from './button';
import {motion, useInView} from 'framer-motion'

export default function Contact() {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true });
 
  return (
    <motion.section 
    style={{
      opacity: isInView ? 1 : 0,
      transform:'scale(1)',
      transition: "all 1s ease-out"
    }}
    id="contact" className="w-full min-h-fit lg:min-h-[85vh] py-12 lg:py-24 space-y-4 flex flex-col items-center justify-start">
      <h3
      className="before:content-['04.'] 
      before:font-body 
      before:mr-2 
      after:mr-2 
      before:text-xl
      before:text-orange-light-theme
      dark:before:text-orange-theme
      before:font-normal
      text-black-theme 
      dark:text-white-theme
      text-xl
      font-bold
      text-center
      font-body
      "
      >How can I help?</h3>
      <h2
      ref={ref}
      className="
      text-black-theme
      dark:text-white-theme
      text-5xl
      lg:text-6xl
      font-bold
      text-center
      "
      >Reach Out!</h2>
      <p
      className="
      text-center
      max-w-xl
      mx-auto
      text-black-theme 
      dark:text-white-theme
      text-base
      lg:text-lg
      pb-6
      "
      >
       I´m genuinely excited about the possibility of contributing my mix of skills and enthusiasm to a team that values innovation and creativity.
      </p>
      <div  className="flex flex-col lg:flex-row gap-4 justify-center">
        <Button 
        btnText={"Say Hi!"}
        link={"mailto:franjuaache@gmail.com"}
        isExternal={false}
        />
        <Button 
        btnText={"Let's meet up"}
        link={"https://calendly.com/franjuaache/30min"}
        isExternal={true}
        />
      </div>
    </motion.section>
  )
}