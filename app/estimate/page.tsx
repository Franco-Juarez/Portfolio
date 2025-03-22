"use client"

import { useEffect } from "react"
import { useEstimateStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import ClientInfoForm from "../components/estimate/client-info-form"
import ProjectTypeForm from "../components/estimate/project-type-form"
import FeaturesForm from "../components/estimate/features-form"
import ReviewEstimate from "../components/estimate/review-estimate"
import SuccessPage from "../components/estimate/success-page"

export default function EstimatePage() {
  // Fix the navigation bug by updating the step logic
  // Import shouldShowFeaturesStep from the store
  const { step, setStep, calculateTotal, setDollarRate, shouldShowFeaturesStep } = useEstimateStore()

  // Update the useEffect to handle the navigation properly
  useEffect(() => {
    // Fetch dollar rate on initial load
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
    calculateTotal()
  }, [calculateTotal, setDollarRate])

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <ClientInfoForm />
      case 2:
        return <ProjectTypeForm />
      case 3:
        return <FeaturesForm />
      case 4:
        return <ReviewEstimate />
      case 5:
        return <SuccessPage />
      default:
        return <ClientInfoForm />
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-tech-pattern">
      <h1 className="mb-8 text-center text-3xl font-bold animate-fade-in">Presupuestador Web</h1>

      {step < totalSteps && (
        <div className="mb-8 animate-fade-in animation-delay-200">
          <div className="mb-2 flex justify-between text-sm">
            <span>
              Paso {step} de {totalSteps - 1}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <Card className="mx-auto max-w-3xl p-6 animate-fade-in animation-delay-300 shadow-sm hover:shadow-md transition-all duration-500">
        {renderStepContent()}
      </Card>
    </div>
  )
}

