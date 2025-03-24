"use client"

import type React from "react"
import { useEstimateStore } from "@/lib/store"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useLanguage } from "../../context/LanguageContext"
import { translations } from "../../data/translations"

// Definir las traducciones para las features
const featureTranslations = {
  contact_form: {
    name: {
      en: "Contact Form",
      es: "Formulario de contacto"
    },
    description: {
      en: "Include a contact form on the website",
      es: "Incluir un formulario de contacto en el sitio web"
    }
  },
  analytics: {
    name: {
      en: "Analytics Integration",
      es: "Integración de Analytics"
    },
    description: {
      en: "Integrate analytics tools for visitor tracking",
      es: "Integrar herramientas de análisis para seguimiento de visitantes"
    }
  },
  multilingual: {
    name: {
      en: "Multilingual Page",
      es: "Página multilingüe"
    },
    description: {
      en: "Make the website available in multiple languages",
      es: "Hacer que el sitio web esté disponible en varios idiomas"
    }
  },
  newsletter: {
    name: {
      en: "Newsletter Subscription",
      es: "Suscripción a newsletter"
    },
    description: {
      en: "Allow visitors to subscribe to your newsletter",
      es: "Permitir a los visitantes suscribirse a tu newsletter"
    }
  },
  appointment: {
    name: {
      en: "Appointment System",
      es: "Sistema de turnos"
    },
    description: {
      en: "Implement a system to book appointments",
      es: "Implementar un sistema para reservar citas o turnos"
    }
  },
  user_management: {
    name: {
      en: "User Management",
      es: "Gestión de usuarios"
    },
    description: {
      en: "Registration and login for clients",
      es: "Registro e inicio de sesión para clientes"
    }
  },
  dark_mode: {
    name: {
      en: "Dark/Light Mode",
      es: "Modo oscuro/claro"
    },
    description: {
      en: "To improve user experience",
      es: "Para mejorar la experiencia del usuario"
    }
  },
};

export default function FeaturesForm() {
  const { projectRequirements, toggleFeature, setStep, dollarRate } = useEstimateStore()
  const { features } = projectRequirements
  const { language } = useLanguage()

  const title = (translations.features?.title as { en: string, es: string })[language]
  const description = (translations.features?.description as { en: string, es: string })[language]
  const backButton = (translations.features?.backButton as { en: string, es: string })[language]
  const nextButton = (translations.features?.nextButton as { en: string, es: string })[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(4)
  }

  const getFeatureName = (featureId: string): string => {
    if (featureId in featureTranslations) {
      return featureTranslations[featureId as keyof typeof featureTranslations].name[language as keyof typeof featureTranslations[keyof typeof featureTranslations]['name']]
    }
    return features.find(f => f.id === featureId)?.name || featureId;
  }

  const getFeatureDescription = (featureId: string): string => {
    if (featureId in featureTranslations) {
      return featureTranslations[featureId as keyof typeof featureTranslations].description[language as keyof typeof featureTranslations[keyof typeof featureTranslations]['description']]
    }
    return features.find(f => f.id === featureId)?.description || '';
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <p className="mb-6 text-muted-foreground">
        {description}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className="p-4 hover:shadow-md transition-all duration-300 hover:border-primary/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-2">
                <Checkbox
                  id={feature.id}
                  checked={feature.selected}
                  onCheckedChange={() => toggleFeature(feature.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <Label htmlFor={feature.id} className="text-base font-medium">
                      {getFeatureName(feature.id)}
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="ml-1 h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{getFeatureDescription(feature.id)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {/* Precio oculto pero elemento mantenido para no afectar la estructura */}
                  <p className="text-sm text-muted-foreground opacity-0 h-4"></p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep(2)} className="cursor-pointer">
            {backButton}
          </Button>
          <Button type="submit" className="cursor-pointer">
            {nextButton}
          </Button>
        </div>
      </form>
    </div>
  )
}

