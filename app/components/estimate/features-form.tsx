"use client"

import type React from "react"

import { useEstimateStore } from "@/lib/store"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function FeaturesForm() {
  const { projectRequirements, toggleFeature, setStep, dollarRate } = useEstimateStore()
  const { features } = projectRequirements

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(4)
  }

  // Función para convertir precio en USD a ARS
  const usdToArs = (usdPrice: number) => {
    return Math.ceil((usdPrice * dollarRate) / 100) * 100
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Seleccioná Características</h2>
      <p className="mb-6 text-muted-foreground">
        Elegí las características que necesitás para tu sitio web. Cada característica afectará el costo final.
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
                      {feature.name}
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="ml-1 h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{feature.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground">${usdToArs(feature.price).toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep(2)}>
            Atrás
          </Button>
          <Button type="submit">Siguiente</Button>
        </div>
      </form>
    </div>
  )
}

