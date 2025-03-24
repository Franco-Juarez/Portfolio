"use client"

import { useState, useEffect } from "react"
import { useEstimateStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Download, Send } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import { format } from "date-fns"
import { es, enUS } from "date-fns/locale"
import { useLanguage } from "../../context/LanguageContext"
import { translations } from "../../data/translations"

export default function ReviewEstimate() {
  const { clientInfo, projectRequirements, totalCost, setStep, setDollarRate, dollarRate } = useEstimateStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const { language } = useLanguage()

  const title = (translations.projectType?.title as { en: string, es: string })[language]
  const subtitle = (translations.reviewEstimate?.subtitle as { en: string, es: string })[language]
  const clientInfoTitle = (translations.reviewEstimate?.clientInfoTitle as { en: string, es: string })[language]
  const websiteType = (translations.reviewEstimate?.websiteType as { en: string, es: string })[language]
  const pages = (translations.reviewEstimate?.pages as { en: string, es: string })[language]
  const designComplexity = (translations.reviewEstimate?.designComplexity as { en: string, es: string })[language]
  const timeline = (translations.reviewEstimate?.timeline as { en: string, es: string })[language]
  const hasHosting = (translations.reviewEstimate?.hasHosting as { en: string, es: string })[language]
  const hasDesign = (translations.reviewEstimate?.hasDesign as { en: string, es: string })[language]
  const toDefine = (translations.reviewEstimate?.toDefine as { en: string, es: string })[language]
  const basedOnInfo = (translations.reviewEstimate?.basedOnInfo as { en: string, es: string })[language]
  const willBeDetermined = (translations.reviewEstimate?.willBeDetermined as { en: string, es: string })[language]
  const generatingPDF = (translations.reviewEstimate?.generatingPDF as { en: string, es: string })[language]
  const submitting = (translations.reviewEstimate?.submitting as { en: string, es: string })[language]
  const downloadPDF = (translations.reviewEstimate?.downloadPDF as { en: string, es: string })[language]
  const submit = (translations.reviewEstimate?.submit as { en: string, es: string })[language]
  const back = (translations.reviewEstimate?.back as { en: string, es: string })[language]
  const name = (translations.reviewEstimate?.name as { en: string, es: string })[language]
  const email = (translations.reviewEstimate?.email as { en: string, es: string })[language]
  const company = (translations.reviewEstimate?.company as { en: string, es: string })[language]
  const phone = (translations.reviewEstimate?.phone as { en: string, es: string })[language]
  const projectType = (translations.reviewEstimate?.projectType as { en: string, es: string })[language]
  const technology = (translations.reviewEstimate?.technology as { en: string, es: string })[language]
  const hoursPackage = (translations.reviewEstimate?.hoursPackage as { en: string, es: string })[language]
  const startDate = (translations.reviewEstimate?.startDate as { en: string, es: string })[language]
  const otherTechnology = (translations.reviewEstimate?.otherTechnology as { en: string, es: string })[language]
  const selectedFeaturesTitle = (translations.reviewEstimate?.selectedFeaturesTitle as { en: string, es: string })[language]
  const totalCostTitle = (translations.reviewEstimate?.totalCostTitle as { en: string, es: string })[language]

  // Fetch dollar rate on component mount
  useEffect(() => {
    const fetchDollarRate = async () => {
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares/blue")
        const data = await response.json()
        if (data && data.venta) {
          setDollarRate(data.venta)
        }
      } catch (error) {
        console.error("Error fetching dollar rate:", error)
        // Use default rate if API fails
      }
    }

    fetchDollarRate()
  }, [setDollarRate])

  // Convertir el precio ARS a USD para la visualización en inglés
  const getPriceDisplay = () => {
    if (language === "en") {
      // Convertir ARS a USD (totalCost es en ARS)
      // Usar un valor predeterminado si dollarRate es 0 para evitar división por cero
      const rate = dollarRate || 1000;
      const usdPrice = Math.round(totalCost / rate);
      return (
        <>
          <div className="text-4xl font-bold mb-1">
            US${usdPrice.toLocaleString()}
          </div>
          <p className="text-muted-foreground">{basedOnInfo}</p>
        </>
      );
    } else {
      return (
        <>
          <div className="text-4xl font-bold mb-1">
            ${totalCost.toLocaleString()}
          </div>
          <p className="text-muted-foreground">{basedOnInfo}</p>
        </>
      );
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      await generatePDF({
        clientInfo,
        projectRequirements,
        totalCost,
        language
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Create WhatsApp URL with project details
      const currencySymbol = language === "en" ? "US$" : "$";

      const projectDetails = language === "en" ? `
      Name: ${clientInfo.name}
      Email: ${clientInfo.email}
      ${clientInfo.company ? `Company: ${clientInfo.company}` : ""}
      ${clientInfo.phone ? `Phone: ${clientInfo.phone}` : ""}
      Project Type: ${getProjectTypeLabel(projectRequirements.projectType)}
      Site Type: ${getWebsiteTypeLabel(projectRequirements.websiteType)}
      Pages: ${projectRequirements.pages}
      Complexity: ${getDesignComplexityLabel(projectRequirements.designComplexity)}
      Timeline: ${getTimelineLabel(projectRequirements.timeline)}
      Technology: ${getTechnologyLabel(projectRequirements.technology)}
      ${projectRequirements.technology === "other" ? `Other technology: ${projectRequirements.otherTechnology}` : ""}
      Has hosting: ${projectRequirements.hasHosting ? "Yes" : "No"}
      Has design: ${projectRequirements.hasDesign ? "Yes" : "No"}
      Features: ${getSelectedFeatures()}
      Total cost: ${currencySymbol}${totalCost.toLocaleString()}
      ` : `
      Nombre: ${clientInfo.name}
      Email: ${clientInfo.email}
      ${clientInfo.company ? `Empresa: ${clientInfo.company}` : ""}
      ${clientInfo.phone ? `Teléfono: ${clientInfo.phone}` : ""}
      Tipo de proyecto: ${getProjectTypeLabel(projectRequirements.projectType)}
      Tipo de sitio: ${getWebsiteTypeLabel(projectRequirements.websiteType)}
      Páginas: ${projectRequirements.pages}
      Complejidad: ${getDesignComplexityLabel(projectRequirements.designComplexity)}
      Plazo: ${getTimelineLabel(projectRequirements.timeline)}
      Tecnología: ${getTechnologyLabel(projectRequirements.technology)}
      ${projectRequirements.technology === "other" ? `Otra tecnología: ${projectRequirements.otherTechnology}` : ""}
      Tiene hosting: ${projectRequirements.hasHosting ? "Sí" : "No"}
      Tiene diseño: ${projectRequirements.hasDesign ? "Sí" : "No"}
      Características: ${getSelectedFeatures()}
      Costo total: ${currencySymbol}${totalCost.toLocaleString()}
      `;

      const whatsappMessage = language === "en"
        ? encodeURIComponent("I'm interested in a web project. Details:\n" + projectDetails)
        : encodeURIComponent("Estoy interesado en un proyecto web. Detalles:\n" + projectDetails);

      const whatsappUrl = `https://wa.me/2915116477?text=${whatsappMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank")

      setStep(5)
    } catch (error) {
      console.error("Error sending estimate:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getProjectTypeLabel = (type: string) => {
    if (language === "en") {
      const labels: Record<string, string> = {
        website: "Website",
        component: "Component or Plugin",
        maintenance: "Maintenance",
      }
      return labels[type] || type;
    } else {
      const labels: Record<string, string> = {
        website: "Página Web",
        component: "Componente o Plugin",
        maintenance: "Mantenimiento",
      }
      return labels[type] || type;
    }
  }

  const getWebsiteTypeLabel = (type: string) => {
    if (language === "en") {
      const labels: Record<string, string> = {
        landing: "Landing Page",
        business: "Business Website",
        ecommerce: "E-Commerce",
        saas: "SaaS Application",
        blog: "Blog",
      }
      return labels[type] || type;
    } else {
      const labels: Record<string, string> = {
        landing: "Landing Page",
        business: "Sitio Web Empresarial",
        ecommerce: "E-Commerce",
        saas: "Aplicación SaaS",
        blog: "Blog",
      }
      return labels[type] || type;
    }
  }

  const getDesignComplexityLabel = (complexity: string) => {
    if (language === "en") {
      const labels: Record<string, string> = {
        basic: "Basic",
        custom: "Custom",
        premium: "Premium",
      }
      return labels[complexity] || complexity;
    } else {
      const labels: Record<string, string> = {
        basic: "Básico",
        custom: "Personalizado",
        premium: "Premium",
      }
      return labels[complexity] || complexity;
    }
  }

  const getTimelineLabel = (timeline: string) => {
    if (language === "en") {
      const labels: Record<string, string> = {
        standard: "Standard (4-6 weeks)",
        rush: "Rush (2-3 weeks)",
        urgent: "Urgent (1-2 weeks)",
      }
      return labels[timeline] || timeline;
    } else {
      const labels: Record<string, string> = {
        standard: "Estándar (4-6 semanas)",
        rush: "Rápido (2-3 semanas)",
        urgent: "Urgente (1-2 semanas)",
      }
      return labels[timeline] || timeline;
    }
  }

  const getTechnologyLabel = (technology: string) => {
    if (language === "en") {
      const labels: Record<string, string> = {
        nextjs: "Next.js",
        wordpress: "WordPress + Elementor",
        html: "HTML + CSS",
        undefined: "Not defined / To be determined",
        other: "Other",
      }
      return labels[technology] || technology;
    } else {
      const labels: Record<string, string> = {
        nextjs: "Next.js",
        wordpress: "WordPress + Elementor",
        html: "HTML + CSS",
        undefined: "No definido / A consultar",
        other: "Otro",
      }
      return labels[technology] || technology;
    }
  }

  const getSelectedFeatures = () => {
    const selectedFeatures = projectRequirements.features.filter((feature) => feature.selected)

    if (selectedFeatures.length === 0) {
      return language === "en" ? "None" : "Ninguna";
    }

    // Traducciones para las características
    const featureTranslations: Record<string, { en: string; es: string }> = {
      contact_form: {
        en: "Contact Form",
        es: "Formulario de contacto"
      },
      analytics: {
        en: "Analytics Integration",
        es: "Integración de Analytics"
      },
      multilingual: {
        en: "Multilingual Page",
        es: "Página multilingüe"
      },
      newsletter: {
        en: "Newsletter Subscription",
        es: "Suscripción a newsletter"
      },
      appointment: {
        en: "Appointment System",
        es: "Sistema de turnos"
      },
      user_management: {
        en: "User Management",
        es: "Gestión de usuarios"
      },
      dark_mode: {
        en: "Dark/Light Mode",
        es: "Modo oscuro/claro"
      }
    };

    const getFeatureName = (feature: any): string => {
      if (feature.id in featureTranslations) {
        return featureTranslations[feature.id][language as 'en' | 'es'];
      }
      return feature.name;
    };

    return selectedFeatures.map((f) => getFeatureName(f)).join(", ");
  }

  const selectedFeatures = projectRequirements.features.filter((feature) => feature.selected)

  // Función para traducir nombres de características
  const getFeatureNameTranslated = (featureId: string): string => {
    const featureTranslations: Record<string, { en: string; es: string }> = {
      contact_form: {
        en: "Contact Form",
        es: "Formulario de contacto"
      },
      analytics: {
        en: "Analytics Integration",
        es: "Integración de Analytics"
      },
      multilingual: {
        en: "Multilingual Page",
        es: "Página multilingüe"
      },
      newsletter: {
        en: "Newsletter Subscription",
        es: "Suscripción a newsletter"
      },
      appointment: {
        en: "Appointment System",
        es: "Sistema de turnos"
      },
      user_management: {
        en: "User Management",
        es: "Gestión de usuarios"
      },
      dark_mode: {
        en: "Dark/Light Mode",
        es: "Modo oscuro/claro"
      }
    };

    if (featureId in featureTranslations) {
      return featureTranslations[featureId][language as 'en' | 'es'];
    }

    const feature = selectedFeatures.find(f => f.id === featureId);
    return feature?.name || featureId;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold animate-fade-in">{title}</h2>
        <p className="text-muted-foreground mt-2 animate-fade-in animation-delay-100">{subtitle}</p>
      </div>

      {/* Client Information Card */}
      <Card className="overflow-hidden animate-fade-in animation-delay-200 hover:shadow-md transition-all duration-300">
        <div className="bg-primary/10 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">{clientInfoTitle}</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">{name}</div>
              <div className="font-medium">{clientInfo.name}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">{email}</div>
              <div className="font-medium break-all">{clientInfo.email}</div>
            </div>

            {clientInfo.company && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">{company}</div>
                <div className="font-medium">{clientInfo.company}</div>
              </div>
            )}

            {clientInfo.phone && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">{phone}</div>
                <div className="font-medium">{clientInfo.phone}</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Project Requirements Card */}
      <Card className="overflow-hidden animate-fade-in animation-delay-300 hover:shadow-md transition-all duration-300">
        <div className="bg-primary/10 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">{projectType}</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Project Type Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">{projectType}:</span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium">
                {getProjectTypeLabel(projectRequirements.projectType)}
              </span>
            </div>

            {/* Website Specific Details */}
            {projectRequirements.projectType === "website" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{websiteType}</div>
                    <div className="font-medium">{getWebsiteTypeLabel(projectRequirements.websiteType)}</div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{pages}</div>
                    <div className="font-medium">{projectRequirements.pages}</div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{technology}</div>
                    <div className="font-medium">
                      {getTechnologyLabel(projectRequirements.technology)}
                      {projectRequirements.technology === "other" && projectRequirements.otherTechnology
                        ? ` (${projectRequirements.otherTechnology})`
                        : ""}
                    </div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{designComplexity}</div>
                    <div className="font-medium">{getDesignComplexityLabel(projectRequirements.designComplexity)}</div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{timeline}</div>
                    <div className="font-medium">{getTimelineLabel(projectRequirements.timeline)}</div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">{hasHosting}</div>
                        <div className="font-medium">{language === "en" ? (projectRequirements.hasHosting ? "Yes" : "No") : (projectRequirements.hasHosting ? "Sí" : "No")}</div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground">{hasDesign}</div>
                        <div className="font-medium">{language === "en" ? (projectRequirements.hasDesign ? "Yes" : "No") : (projectRequirements.hasDesign ? "Sí" : "No")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Features */}
                {selectedFeatures.length > 0 && (
                  <div className="mt-6">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-3">{selectedFeaturesTitle}</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        {selectedFeatures.map((feature) => (
                          <div key={feature.id} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm">{getFeatureNameTranslated(feature.id)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Maintenance Specific Details */}
            {projectRequirements.projectType === "maintenance" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{hoursPackage}</div>
                    <div className="font-medium">
                      {projectRequirements.hoursPackage === "none"
                        ? language === "en" ? "No package" : "Sin paquete"
                        : projectRequirements.hoursPackage === "30plus"
                          ? language === "en" ? "30+ hours" : "30+ horas"
                          : language === "en"
                            ? `${projectRequirements.hoursPackage} hours`
                            : `${projectRequirements.hoursPackage} horas`}
                    </div>
                  </div>

                  {projectRequirements.startDate && (
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">{startDate}</div>
                      <div className="font-medium">
                        {format(new Date(projectRequirements.startDate), "PPP", { locale: language === "en" ? enUS : es })}
                      </div>
                    </div>
                  )}
                </div>

                {projectRequirements.otherTechnology && (
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{otherTechnology}</div>
                    <div className="font-medium">{projectRequirements.otherTechnology}</div>
                  </div>
                )}
              </div>
            )}

            {/* Component Specific Details */}
            {projectRequirements.projectType === "component" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{technology}</div>
                    <div className="font-medium">
                      {getTechnologyLabel(projectRequirements.technology)}
                      {projectRequirements.technology === "other" && projectRequirements.otherTechnology
                        ? ` (${projectRequirements.otherTechnology})`
                        : ""}
                    </div>
                  </div>
                </div>

                {projectRequirements.otherTechnology && (
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">{otherTechnology}</div>
                    <div className="font-medium">{projectRequirements.otherTechnology}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Cost Estimate Card */}
      <Card className="overflow-hidden animate-fade-in animation-delay-400 hover:shadow-md transition-all duration-300">
        <div className="bg-primary/10 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">{totalCostTitle}</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center text-center p-4">
            {totalCost > 0 ? (
              getPriceDisplay()
            ) : (
              <>
                <div className="text-xl font-medium mb-2">{toDefine}</div>
                <p className="text-muted-foreground max-w-md">{willBeDetermined}</p>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in animation-delay-500">
        <Button
          variant="outline"
          className="flex items-center justify-center space-x-2 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
          onClick={() => {
            const shouldShowFeatures = useEstimateStore.getState().shouldShowFeaturesStep()
            setStep(shouldShowFeatures ? 3 : 2)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{back}</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-center space-x-2 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{generatingPDF}</span>
            </span>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>{downloadPDF}</span>
            </>
          )}
        </Button>

        <Button
          className="flex items-center justify-center space-x-2 hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{submitting}</span>
            </span>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>{submit}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

