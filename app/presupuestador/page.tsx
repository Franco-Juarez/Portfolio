"use client"

import Button from "../components/button"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"

export default function Presupuestador() {
  const { language } = useLanguage();
  // Verificamos si existen las traducciones para presupuestador, si no existen, añadimos traducciones por defecto
  const presupuestador = translations.presupuestador || {
    title: {
      en: "Web Budget Calculator",
      es: "Presupuestador Web"
    },
    description: {
      en: "Get an instant quote for your custom web development project. Fill out a simple questionnaire and receive a detailed cost breakdown.",
      es: "Obtené un presupuesto instantáneo para tu proyecto de desarrollo web personalizado. Completá un simple cuestionario y recibí un desglose detallado de costos."
    },
    startButton: {
      en: "Start Your Budget",
      es: "Comenzá tu Presupuesto"
    },
    simpleProcess: {
      title: {
        en: "Simple Process",
        es: "Proceso Simple"
      },
      description: {
        en: "Answer a few questions about your project requirements and get an instant quote.",
        es: "Respondé algunas preguntas sobre los requisitos de tu proyecto y obtené un presupuesto instantáneo."
      }
    },
    transparentPricing: {
      title: {
        en: "Transparent Pricing",
        es: "Precios Transparentes"
      },
      description: {
        en: "See exactly how your project requirements affect the final cost with our dynamic price calculator.",
        es: "Mirá exactamente cómo los requisitos de tu proyecto afectan el costo final con nuestra calculadora de precios dinámica."
      }
    },
    instantPDF: {
      title: {
        en: "Instant PDF Quote",
        es: "Presupuesto PDF Instantáneo"
      },
      description: {
        en: "Download a professional PDF quote with all your project details and price breakdown.",
        es: "Descargá un presupuesto profesional en PDF con todos los detalles de tu proyecto y el desglose de precios."
      }
    },
    howItWorks: {
      title: {
        en: "How It Works",
        es: "Cómo Funciona"
      },
      step1: {
        title: {
          en: "Complete the Questionnaire",
          es: "Completá el Cuestionario"
        },
        description: {
          en: "Tell us about your project requirements and specifications.",
          es: "Contanos sobre los requisitos y especificaciones de tu proyecto."
        }
      },
      step2: {
        title: {
          en: "Review the Budget",
          es: "Revisá el Presupuesto"
        },
        description: {
          en: "View a detailed breakdown of your project costs in real-time.",
          es: "Mirá un desglose detallado de los costos de tu proyecto en tiempo real."
        }
      },
      step3: {
        title: {
          en: "Download the PDF",
          es: "Descargá el PDF"
        },
        description: {
          en: "Get a professional PDF quote with all your project details.",
          es: "Obtené un presupuesto profesional en PDF con todos los detalles de tu proyecto."
        }
      },
      step4: {
        title: {
          en: "Get in Touch",
          es: "Ponete en Contacto"
        },
        description: {
          en: "I'll contact you to discuss your project in more detail.",
          es: "Me comunicaré con vos para discutir tu proyecto en más detalle."
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-tech-pattern">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in">
          {presupuestador.title[language]}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground animate-fade-in animation-delay-200">
          {presupuestador.description[language]}
        </p>
        <Button
          btnText={presupuestador.startButton[language]}
          link="/estimate"
          isExternal={false}
        />
      </section>

      <section className="mb-12 grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] animate-fade-in animation-delay-400">
          <h2 className="mb-3 text-xl font-semibold">{presupuestador.simpleProcess.title[language]}</h2>
          <p className="text-muted-foreground">
            {presupuestador.simpleProcess.description[language]}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] animate-fade-in animation-delay-500">
          <h2 className="mb-3 text-xl font-semibold">{presupuestador.transparentPricing.title[language]}</h2>
          <p className="text-muted-foreground">
            {presupuestador.transparentPricing.description[language]}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] animate-fade-in animation-delay-600">
          <h2 className="mb-3 text-xl font-semibold">{presupuestador.instantPDF.title[language]}</h2>
          <p className="text-muted-foreground">
            {presupuestador.instantPDF.description[language]}
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-8 shadow-sm animate-fade-in animation-delay-700">
        <h2 className="mb-6 text-2xl font-bold">{presupuestador.howItWorks.title[language]}</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="mb-2 font-semibold">{presupuestador.howItWorks.step1.title[language]}</h3>
            <p className="text-sm text-muted-foreground">
              {presupuestador.howItWorks.step1.description[language]}
            </p>
          </div>
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              2
            </div>
            <h3 className="mb-2 font-semibold">{presupuestador.howItWorks.step2.title[language]}</h3>
            <p className="text-sm text-muted-foreground">
              {presupuestador.howItWorks.step2.description[language]}
            </p>
          </div>
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="mb-2 font-semibold">{presupuestador.howItWorks.step3.title[language]}</h3>
            <p className="text-sm text-muted-foreground">
              {presupuestador.howItWorks.step3.description[language]}
            </p>
          </div>
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              4
            </div>
            <h3 className="mb-2 font-semibold">{presupuestador.howItWorks.step4.title[language]}</h3>
            <p className="text-sm text-muted-foreground">
              {presupuestador.howItWorks.step4.description[language]}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

