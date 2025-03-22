"use client"

import { useState, useEffect } from "react"
import { useEstimateStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Download, Send } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function ReviewEstimate() {
  const { clientInfo, projectRequirements, totalCost, setStep, setDollarRate } = useEstimateStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

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

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      await generatePDF({ clientInfo, projectRequirements, totalCost })
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
      const projectDetails = `
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
Costo total: $${totalCost.toLocaleString()}
      `

      const whatsappMessage = encodeURIComponent("Estoy interesado en un proyecto web. Detalles:\n" + projectDetails)
      const whatsappUrl = `https://wa.me/2915116477?text=${whatsappMessage}`

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
    const labels: Record<string, string> = {
      website: "Página Web",
      component: "Componente o Plugin",
      maintenance: "Mantenimiento",
    }
    return labels[type] || type
  }

  const getWebsiteTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      landing: "Landing Page",
      business: "Sitio Web Empresarial",
      ecommerce: "E-Commerce",
      saas: "Aplicación SaaS",
      blog: "Blog",
    }
    return labels[type] || type
  }

  const getDesignComplexityLabel = (complexity: string) => {
    const labels: Record<string, string> = {
      basic: "Básico",
      custom: "Personalizado",
      premium: "Premium",
    }
    return labels[complexity] || complexity
  }

  const getTimelineLabel = (timeline: string) => {
    const labels: Record<string, string> = {
      standard: "Estándar (4-6 semanas)",
      rush: "Rápido (2-3 semanas)",
      urgent: "Urgente (1-2 semanas)",
    }
    return labels[timeline] || timeline
  }

  const getTechnologyLabel = (technology: string) => {
    const labels: Record<string, string> = {
      nextjs: "Next.js",
      wordpress: "WordPress + Elementor",
      html: "HTML + CSS",
      undefined: "No definido / A consultar",
      other: "Otro",
    }
    return labels[technology] || technology
  }

  const getSelectedFeatures = () => {
    const selectedFeatures = projectRequirements.features.filter((feature) => feature.selected)
    return selectedFeatures.length > 0 ? selectedFeatures.map((f) => f.name).join(", ") : "Ninguna"
  }

  const selectedFeatures = projectRequirements.features.filter((feature) => feature.selected)

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold animate-fade-in">Revisar tu Presupuesto</h2>

      <div className="mb-8 rounded-lg border bg-card p-6 animate-fade-in animation-delay-200 hover:shadow-md transition-all duration-300">
        <h3 className="mb-4 text-xl font-semibold">Información del Cliente</h3>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nombre:</span>
            <span className="font-medium">{clientInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{clientInfo.email}</span>
          </div>
          {clientInfo.company && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Empresa:</span>
              <span className="font-medium">{clientInfo.company}</span>
            </div>
          )}
          {clientInfo.phone && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Teléfono:</span>
              <span className="font-medium">{clientInfo.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 rounded-lg border bg-card p-6 animate-fade-in animation-delay-300 hover:shadow-md transition-all duration-300">
        <h3 className="mb-4 text-xl font-semibold">Requisitos del Proyecto</h3>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tipo de Proyecto:</span>
            <span className="font-medium">{getProjectTypeLabel(projectRequirements.projectType)}</span>
          </div>

          {/* Campos específicos para proyectos de sitio web */}
          {projectRequirements.projectType === "website" && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo de Sitio Web:</span>
                <span className="font-medium">{getWebsiteTypeLabel(projectRequirements.websiteType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número de Páginas:</span>
                <span className="font-medium">{projectRequirements.pages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tecnología:</span>
                <span className="font-medium">
                  {getTechnologyLabel(projectRequirements.technology)}
                  {projectRequirements.technology === "other" && projectRequirements.otherTechnology
                    ? ` (${projectRequirements.otherTechnology})`
                    : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">¿Tenés hosting y dominio?:</span>
                <span className="font-medium">{projectRequirements.hasHosting ? "Sí" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">¿Tenés diseño propio?:</span>
                <span className="font-medium">{projectRequirements.hasDesign ? "Sí" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Complejidad del Diseño:</span>
                <span className="font-medium">{getDesignComplexityLabel(projectRequirements.designComplexity)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plazo de Entrega:</span>
                <span className="font-medium">{getTimelineLabel(projectRequirements.timeline)}</span>
              </div>
            </>
          )}

          {/* Campos específicos para proyectos de mantenimiento */}
          {projectRequirements.projectType === "maintenance" && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paquete de Horas:</span>
                <span className="font-medium">
                  {projectRequirements.hoursPackage === "none"
                    ? "Sin paquete"
                    : projectRequirements.hoursPackage === "30plus"
                      ? "30+ horas"
                      : `${projectRequirements.hoursPackage} horas`}
                </span>
              </div>
              {projectRequirements.startDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha de Inicio:</span>
                  <span className="font-medium">
                    {format(new Date(projectRequirements.startDate), "PPP", { locale: es })}
                  </span>
                </div>
              )}
              {projectRequirements.otherTechnology && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Detalles del Sitio:</span>
                  <span className="font-medium max-w-[60%] text-right">{projectRequirements.otherTechnology}</span>
                </div>
              )}
            </>
          )}

          {/* Campos específicos para proyectos de componente/plugin */}
          {projectRequirements.projectType === "component" && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tecnología:</span>
                <span className="font-medium">
                  {getTechnologyLabel(projectRequirements.technology)}
                  {projectRequirements.technology === "other" && projectRequirements.otherTechnology
                    ? ` (${projectRequirements.otherTechnology})`
                    : ""}
                </span>
              </div>
              {projectRequirements.otherTechnology && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descripción:</span>
                  <span className="font-medium max-w-[60%] text-right">{projectRequirements.otherTechnology}</span>
                </div>
              )}
            </>
          )}
        </div>

        {selectedFeatures.length > 0 && projectRequirements.projectType === "website" && (
          <>
            <Separator className="my-4" />
            <h4 className="mb-2 font-medium">Características Seleccionadas:</h4>
            <ul className="grid gap-1">
              {selectedFeatures.map((feature) => (
                <li key={feature.id} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Card className="mb-8 bg-primary/5 p-6 animate-fade-in animation-delay-400 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Costo Total Estimado:</h3>
          {totalCost > 0 ? (
            <span className="text-2xl font-bold">${totalCost.toLocaleString()}</span>
          ) : (
            <span className="text-lg font-medium">A definir</span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {totalCost > 0
            ? "Este presupuesto está basado en la información proporcionada y puede ajustarse después de una consulta detallada."
            : "El costo será determinado después de analizar los detalles específicos de tu proyecto. Te contactaré a través de los medios proporcionados para discutir un presupuesto personalizado."}
        </p>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row animate-fade-in animation-delay-500">
        <Button
          variant="outline"
          className="flex-1 hover:bg-primary/10 transition-all duration-300"
          onClick={() => {
            const shouldShowFeatures = useEstimateStore.getState().shouldShowFeaturesStep()
            setStep(shouldShowFeatures ? 3 : 2)
          }}
        >
          Atrás
        </Button>
        <Button
          variant="outline"
          className="flex-1 hover:bg-primary/10 transition-all duration-300"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
        >
          {isDownloading ? (
            "Generando PDF..."
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Descargar PDF
            </>
          )}
        </Button>
        <Button
          className="flex-1 hover:scale-105 transition-all duration-300"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Enviando..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Enviar Consulta por WhatsApp
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

