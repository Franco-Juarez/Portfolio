"use client"

import { useEstimateStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Home } from "lucide-react"
import Link from "next/link"
import { generatePDF } from "@/lib/pdf-generator"

export default function SuccessPage() {
  const { clientInfo, projectRequirements, totalCost, resetEstimate } = useEstimateStore()

  const handleDownloadPDF = async () => {
    try {
      await generatePDF({ clientInfo, projectRequirements, totalCost })
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-fade-in">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>

      <h2 className="mb-2 text-2xl font-bold animate-fade-in animation-delay-200">
        ¡Presupuesto Enviado Exitosamente!
      </h2>

      <p className="mb-6 text-muted-foreground animate-fade-in animation-delay-300">
        Gracias por enviar los detalles de tu proyecto. Revisaré tus requisitos y me pondré en contacto contigo a la
        brevedad.
      </p>

      <div className="mb-8 rounded-lg border bg-card p-6 text-left animate-fade-in animation-delay-400 hover:shadow-md transition-all duration-300">
        <h3 className="mb-4 text-xl font-semibold">¿Qué sigue?</h3>
        <ol className="ml-6 list-decimal space-y-2">
          <li>Revisaré los requisitos de tu proyecto en detalle.</li>
          <li>Me pondré en contacto contigo por WhatsApp o email para discutir tu proyecto.</li>
          <li>Programaremos una consulta para refinar el alcance del proyecto.</li>
          <li>Te proporcionaré una propuesta final con un cronograma detallado y un desglose de costos.</li>
        </ol>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row animate-fade-in animation-delay-500">
        <Button
          variant="outline"
          className="flex-1 hover:bg-primary/10 transition-all duration-300"
          onClick={handleDownloadPDF}
        >
          <Download className="mr-2 h-4 w-4" /> Descargar Presupuesto
        </Button>
        <Button asChild className="flex-1 hover:scale-105 transition-all duration-300" onClick={resetEstimate}>
          <Link href="/presupuestador">
            <Home className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}

