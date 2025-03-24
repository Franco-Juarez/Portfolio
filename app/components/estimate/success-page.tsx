"use client"

import { useEstimateStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Home } from "lucide-react"
import Link from "next/link"
import { generatePDF } from "@/lib/pdf-generator"
import { useLanguage } from "../../context/LanguageContext"

export default function SuccessPage() {
  const { clientInfo, projectRequirements, totalCost, resetEstimate } = useEstimateStore()
  const { language } = useLanguage()

  const handleDownloadPDF = async () => {
    try {
      await generatePDF({ clientInfo, projectRequirements, totalCost, language })
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const successTitle = language === "en"
    ? "Budget Successfully Submitted!"
    : "¡Presupuesto Enviado Exitosamente!";

  const thankYouMessage = language === "en"
    ? "Thank you for submitting your project details. I will review your requirements and contact you shortly."
    : "Gracias por enviar los detalles de tu proyecto. Revisaré tus requisitos y me pondré en contacto contigo a la brevedad.";

  const nextStepsTitle = language === "en" ? "What's Next?" : "¿Qué sigue?";

  const nextSteps = language === "en"
    ? [
      "I will review your project requirements in detail.",
      "I will contact you via WhatsApp or email to discuss your project.",
      "We will schedule a consultation to refine the project scope.",
      "I will provide you with a final proposal with a detailed timeline and cost breakdown."
    ]
    : [
      "Revisaré los requisitos de tu proyecto en detalle.",
      "Me pondré en contacto contigo por WhatsApp o email para discutir tu proyecto.",
      "Programaremos una consulta para refinar el alcance del proyecto.",
      "Te proporcionaré una propuesta final con un cronograma detallado y un desglose de costos."
    ];

  const downloadBudget = language === "en" ? "Download Budget" : "Descargar Presupuesto";
  const backToHome = language === "en" ? "Back to Home" : "Volver al Inicio";

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-fade-in">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>

      <h2 className="mb-2 text-2xl font-bold animate-fade-in animation-delay-200">
        {successTitle}
      </h2>

      <p className="mb-6 text-muted-foreground animate-fade-in animation-delay-300">
        {thankYouMessage}
      </p>

      <div className="mb-8 rounded-lg border bg-card p-6 text-left animate-fade-in animation-delay-400 hover:shadow-md transition-all duration-300">
        <h3 className="mb-4 text-xl font-semibold">{nextStepsTitle}</h3>
        <ol className="ml-6 list-decimal space-y-2">
          {nextSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row animate-fade-in animation-delay-500">
        <Button
          variant="outline"
          className="flex-1 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
          onClick={handleDownloadPDF}
        >
          <Download className="mr-2 h-4 w-4" /> {downloadBudget}
        </Button>
        <Button asChild className="flex-1 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={resetEstimate}>
          <Link href="/presupuestador">
            <Home className="mr-2 h-4 w-4" /> {backToHome}
          </Link>
        </Button>
      </div>
    </div>
  )
}

