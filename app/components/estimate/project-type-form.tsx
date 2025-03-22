"use client"

import { useEffect } from "react"
import { useEstimateStore } from "@/lib/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  websiteType: z.enum(["landing", "business", "ecommerce", "saas", "blog"]),
  pages: z.number().min(1).max(50),
  designComplexity: z.enum(["basic", "custom", "premium"]),
  timeline: z.enum(["standard", "rush", "urgent"]),
  hasHosting: z.boolean(),
  hasDesign: z.boolean(),
  technology: z.enum(["nextjs", "wordpress", "html", "undefined", "other"]),
  otherTechnology: z.string().optional(),
  projectType: z.enum(["website", "component", "maintenance"]),
  hoursPackage: z.enum(["10", "20", "30plus", "none"]).optional(),
  startDate: z.string().optional(),
})

export default function ProjectTypeForm() {
  const {
    projectRequirements,
    setWebsiteType,
    setPages,
    setDesignComplexity,
    setTimeline,
    setHasHosting,
    setHasDesign,
    setTechnology,
    setOtherTechnology,
    setProjectType,
    setHoursPackage,
    setStartDate,
    setStep,
    shouldShowFeaturesStep,
  } = useEstimateStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteType: projectRequirements.websiteType,
      pages: projectRequirements.pages,
      designComplexity: projectRequirements.designComplexity,
      timeline: projectRequirements.timeline,
      hasHosting: projectRequirements.hasHosting,
      hasDesign: projectRequirements.hasDesign,
      technology: projectRequirements.technology,
      otherTechnology: projectRequirements.otherTechnology,
      projectType: projectRequirements.projectType,
      hoursPackage: projectRequirements.hoursPackage,
      startDate: projectRequirements.startDate,
    },
  })

  // Watch for changes in form values
  const websiteType = form.watch("websiteType")
  const technology = form.watch("technology")
  const projectType = form.watch("projectType")
  const hoursPackage = form.watch("hoursPackage")

  useEffect(() => {
    if (websiteType === "landing") {
      form.setValue("pages", 1)
    }

    // Reset form fields based on project type
    if (projectType === "component") {
      // For component/plugin projects, some fields are not relevant
      form.setValue("websiteType", "landing")
      form.setValue("pages", 1)
    } else if (projectType === "maintenance") {
      // For maintenance projects, some fields have different defaults
      form.setValue("timeline", "standard")
      if (!form.getValues("hoursPackage")) {
        form.setValue("hoursPackage", "10")
      }
    }
  }, [websiteType, projectType, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setWebsiteType(values.websiteType)
    setPages(values.pages)
    setDesignComplexity(values.designComplexity)
    setTimeline(values.timeline)
    setHasHosting(values.hasHosting)
    setHasDesign(values.hasDesign)
    setTechnology(values.technology)
    if (values.otherTechnology) {
      setOtherTechnology(values.otherTechnology)
    }
    setProjectType(values.projectType)
    if (values.hoursPackage) {
      setHoursPackage(values.hoursPackage)
    }
    if (values.startDate) {
      setStartDate(values.startDate)
    }

    // Skip features step for maintenance and component projects
    if (shouldShowFeaturesStep()) {
      setStep(3)
    } else {
      setStep(4)
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Requisitos del Proyecto</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Proyecto</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná el tipo de proyecto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="website">Página Web</SelectItem>
                    <SelectItem value="component">Componente o Plugin</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Seleccioná el tipo de proyecto que necesitás.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {projectType === "website" && (
            <>
              <FormField
                control={form.control}
                name="websiteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Sitio Web</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná el tipo de sitio web" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="business">Sitio Web Empresarial</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                        <SelectItem value="saas">Aplicación SaaS</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Seleccioná el tipo de sitio web que necesitás.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Páginas: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={50}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={websiteType === "landing"}
                      />
                    </FormControl>
                    <FormDescription>
                      {websiteType === "landing"
                        ? "Las landing pages solo tienen una página."
                        : "Estimá cuántas páginas únicas tendrá tu sitio web."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {projectType === "component" && (
            <div className="rounded-lg border p-4 bg-muted/20">
              <h3 className="font-medium mb-2">Desarrollo de Plugin/Componente</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Para el desarrollo de un plugin o componente, necesitamos información específica sobre la funcionalidad
                requerida. El costo se determinará después de una consulta detallada.
              </p>

              <FormField
                control={form.control}
                name="otherTechnology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del Plugin/Componente</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describí la funcionalidad que necesitás para tu plugin o componente..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporcioná detalles sobre qué debe hacer el plugin, con qué sistemas debe integrarse, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {projectType === "maintenance" && (
            <div className="rounded-lg border p-4 bg-muted/20">
              <h3 className="font-medium mb-2">Servicio de Mantenimiento</h3>
              <p className="text-sm text-muted-foreground mb-4">
                El servicio de mantenimiento incluye actualizaciones de seguridad, corrección de errores y pequeñas
                mejoras.
              </p>

              <FormField
                control={form.control}
                name="hoursPackage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Paquete de Horas:{" "}
                      {field.value === "none" ? "Sin paquete" : field.value === "30plus" ? "30+" : field.value}{" "}
                      {field.value !== "none" ? "horas" : ""}
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={3}
                        step={1}
                        defaultValue={[
                          field.value === "10" ? 0 : field.value === "20" ? 1 : field.value === "30plus" ? 2 : 3,
                        ]}
                        onValueChange={(value) => {
                          const packageValue =
                            value[0] === 0 ? "10" : value[0] === 1 ? "20" : value[0] === 2 ? "30plus" : "none"
                          field.onChange(packageValue)
                        }}
                      />
                    </FormControl>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>10 horas</span>
                      <span>20 horas</span>
                      <span>30+ horas</span>
                      <span>Sin paquete</span>
                    </div>
                    <FormDescription className="mt-2">
                      Seleccioná el paquete de horas que necesitás o elegí "Sin paquete" para discutir los detalles
                      después.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP", { locale: es })
                            ) : (
                              <span>Seleccioná una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Seleccioná la fecha en la que te gustaría comenzar el mantenimiento.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherTechnology"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Detalles del Sitio a Mantener</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describí tu sitio web actual, tecnología utilizada y qué tipo de mantenimiento necesitás..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporcioná la URL de tu sitio y explicá qué tipo de mantenimiento necesitás.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {(projectType === "website" || projectType === "component") && (
            <FormField
              control={form.control}
              name="technology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tecnología</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná la tecnología" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="wordpress">WordPress + Elementor</SelectItem>
                      <SelectItem value="html">HTML + CSS</SelectItem>
                      <SelectItem value="undefined">No lo sé / No definido</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Seleccioná la tecnología que preferís para tu proyecto.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {technology === "other" && (projectType === "website" || projectType === "component") && (
            <FormField
              control={form.control}
              name="otherTechnology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especificar otra tecnología</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: React, Angular, Vue, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {projectType === "website" && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="hasHosting"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">¿Tenés hosting y dominio?</FormLabel>
                        <FormDescription>Si no tenés, se añadirá un costo adicional.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasDesign"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">¿Tenés diseño propio?</FormLabel>
                        <FormDescription>Si no tenés, se añadirá un costo adicional.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="designComplexity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Complejidad del Diseño</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="basic" id="basic" />
                          <Label htmlFor="basic">Básico - Diseño simple con mínima personalización</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label htmlFor="custom">Personalizado - Diseño a medida con elementos únicos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="premium" id="premium" />
                          <Label htmlFor="premium">Premium - Diseño de alta gama con animaciones avanzadas</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Plazo de Entrega</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard">Estándar (4-6 semanas)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rush" id="rush" />
                          <Label htmlFor="rush">Rápido (2-3 semanas)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" />
                          <Label htmlFor="urgent">Urgente (1-2 semanas)</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>¿Qué tan rápido necesitás que se complete tu proyecto?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Atrás
            </Button>
            <Button type="submit">Siguiente</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

