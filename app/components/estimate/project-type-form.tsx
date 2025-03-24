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
import { es, enUS } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useLanguage } from "../../context/LanguageContext"
import { translations } from "../../data/translations"
import { Card } from "@/components/ui/card"

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
  const { language } = useLanguage()
  const title = (translations.projectType?.title as { en: string, es: string })[language]
  const projectTypeWebsite = (translations.projectType?.projectTypeWebsite as { en: string, es: string })[language]
  const projectTypeLabel = (translations.projectType?.projectTypeLabel as { en: string, es: string })[language]
  const projectTypePlaceholder = (translations.projectType?.projectTypePlaceholder as { en: string, es: string })[language]
  const projectTypeDescription = (translations.projectType?.projectTypeDescription as { en: string, es: string })[language]
  const websiteTypeLabel = (translations.projectType?.websiteTypeLabel as { en: string, es: string })[language]
  const websiteTypePlaceholder = (translations.projectType?.websiteTypePlaceholder as { en: string, es: string })[language]
  const websiteTypeDescription = (translations.projectType?.websiteTypeDescription as { en: string, es: string })[language]
  const landingPageDescription = (translations.projectType?.landingPageDescription as { en: string, es: string })[language]
  const websiteDescription = (translations.projectType?.websiteDescription as { en: string, es: string })[language]
  const componentDevelopmentLabel = (translations.projectType?.componentDevelopmentLabel as { en: string, es: string })[language]
  const componentDevelopmentDescription = (translations.projectType?.componentDevelopmentDescription as { en: string, es: string })[language]
  const componentDescriptionLabel = (translations.projectType?.componentDescriptionLabel as { en: string, es: string })[language]
  const componentDescriptionPlaceholder = (translations.projectType?.componentDescriptionPlaceholder as { en: string, es: string })[language]
  const componentDescriptionDescription = (translations.projectType?.componentDescriptionDescription as { en: string, es: string })[language]
  const maintenanceServiceLabel = (translations.projectType?.maintenanceServiceLabel as { en: string, es: string })[language]
  const maintenanceServiceDescription = (translations.projectType?.maintenanceServiceDescription as { en: string, es: string })[language]
  const hoursPackageLabel = (translations.projectType?.hoursPackageLabel as { en: string, es: string })[language]
  const hoursPackageNone = (translations.projectType?.hoursPackageNone as { en: string, es: string })[language]
  const hoursPackage30plus = (translations.projectType?.hoursPackage30plus as { en: string, es: string })[language]
  const hoursPackageUnit = (translations.projectType?.hoursPackageUnit as { en: string, es: string })[language]
  const hoursPackage10 = (translations.projectType?.hoursPackage10 as { en: string, es: string })[language]
  const hoursPackage20 = (translations.projectType?.hoursPackage20 as { en: string, es: string })[language]
  const hoursPackageDescription = (translations.projectType?.hoursPackageDescription as { en: string, es: string })[language]
  const startDateLabel = (translations.projectType?.startDateLabel as { en: string, es: string })[language]
  const startDatePlaceholder = (translations.projectType?.startDatePlaceholder as { en: string, es: string })[language]
  const startDateDescription = (translations.projectType?.startDateDescription as { en: string, es: string })[language]
  const maintenanceDetailsLabel = (translations.projectType?.maintenanceDetailsLabel as { en: string, es: string })[language]
  const maintenanceDetailsPlaceholder = (translations.projectType?.maintenanceDetailsPlaceholder as { en: string, es: string })[language]
  const maintenanceDetailsDescription = (translations.projectType?.maintenanceDetailsDescription as { en: string, es: string })[language]
  const technologyLabel = (translations.projectType?.technologyLabel as { en: string, es: string })[language]
  const technologyPlaceholder = (translations.projectType?.technologyPlaceholder as { en: string, es: string })[language]
  const technologyDescription = (translations.projectType?.technologyDescription as { en: string, es: string })[language]
  const technologyOptions = (translations.projectType?.technologyOptions as { en: string, es: string })[language]
  const otherTechnologyLabel = (translations.projectType?.otherTechnologyLabel as { en: string, es: string })[language]
  const otherTechnologyPlaceholder = (translations.projectType?.otherTechnologyPlaceholder as { en: string, es: string })[language]
  const otherTechnologyDescription = (translations.projectType?.otherTechnologyDescription as { en: string, es: string })[language]
  const hasHostingLabel = (translations.projectType?.hasHostingLabel as { en: string, es: string })[language]
  const hasHostingDescription = (translations.projectType?.hasHostingDescription as { en: string, es: string })[language]
  const hasDesignLabel = (translations.projectType?.hasDesignLabel as { en: string, es: string })[language]
  const hasDesignDescription = (translations.projectType?.hasDesignDescription as { en: string, es: string })[language]
  const designComplexityLabel = (translations.projectType?.designComplexityLabel as { en: string, es: string })[language]
  const designComplexityBasic = (translations.projectType?.designComplexityBasic as { en: string, es: string })[language]
  const designComplexityCustom = (translations.projectType?.designComplexityCustom as { en: string, es: string })[language]
  const designComplexityPremium = (translations.projectType?.designComplexityPremium as { en: string, es: string })[language]
  const timelineLabel = (translations.projectType?.timelineLabel as { en: string, es: string })[language]
  const timelineDescription = (translations.projectType?.timelineDescription as { en: string, es: string })[language]
  const timelineStandard = (translations.projectType?.timelineStandard as { en: string, es: string })[language]
  const timelineRush = (translations.projectType?.timelineRush as { en: string, es: string })[language]
  const timelineUrgent = (translations.projectType?.timelineUrgent as { en: string, es: string })[language]
  const backButton = (translations.projectType?.backButton as { en: string, es: string })[language]
  const nextButton = (translations.projectType?.nextButton as { en: string, es: string })[language]
  const projectTypeComponent = (translations.projectType?.projectTypeComponent as { en: string, es: string })[language]
  const projectTypeMaintenance = (translations.projectType?.projectTypeMaintenance as { en: string, es: string })[language]
  const designComplexityBasicDescription = (translations.projectType?.designComplexityBasicDescription as { en: string, es: string })[language]
  const designComplexityCustomDescription = (translations.projectType?.designComplexityCustomDescription as { en: string, es: string })[language]
  const designComplexityPremiumDescription = (translations.projectType?.designComplexityPremiumDescription as { en: string, es: string })[language]
  const timelineStandardDescription = (translations.projectType?.timelineStandardDescription as { en: string, es: string })[language]
  const timelineRushDescription = (translations.projectType?.timelineRushDescription as { en: string, es: string })[language]
  const timelineUrgentDescription = (translations.projectType?.timelineUrgentDescription as { en: string, es: string })[language]

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
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">{projectTypeDescription}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Project Type Selection - Featured Card */}
          <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow-md">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{projectTypeLabel}</h3>

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div
                        className={`cursor-pointer rounded-lg p-4 border-2 ${field.value === "website" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"} transition-all flex flex-col items-center text-center`}
                        onClick={() => field.onChange("website")}
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                          </svg>
                        </div>
                        <div className="font-medium">{projectTypeWebsite}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === "en" ? "Complete site with multiple pages" : "Sitio completo con varias páginas"}
                        </p>
                      </div>
                      <div
                        className={`cursor-pointer rounded-lg p-4 border-2 ${field.value === "component" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"} transition-all flex flex-col items-center text-center`}
                        onClick={() => field.onChange("component")}
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div className="font-medium">{projectTypeComponent}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === "en" ? "Individual component or plugin" : "Componente individual o plugin"}
                        </p>
                      </div>
                      <div
                        className={`cursor-pointer rounded-lg p-4 border-2 ${field.value === "maintenance" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"} transition-all flex flex-col items-center text-center`}
                        onClick={() => field.onChange("maintenance")}
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </div>
                        <div className="font-medium">{projectTypeMaintenance}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === "en" ? "Maintenance of existing site" : "Mantenimiento de sitio existente"}
                        </p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Website Specific Options */}
          {projectType === "website" && (
            <Card className="p-6 border border-muted shadow-sm space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  {language === "en" ? "Website Details" : "Detalles del Sitio Web"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Configure your website options" : "Configurá las opciones de tu sitio web"}
                </p>
              </div>

              <FormField
                control={form.control}
                name="websiteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{websiteTypeLabel}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={websiteTypePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="business">Website</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>{websiteTypeDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === "en" ? "Pages: " : "Páginas: "}{field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={50}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={websiteType === "landing"}
                        className="py-4"
                      />
                    </FormControl>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                    <FormDescription>
                      {websiteType === "landing"
                        ? landingPageDescription
                        : websiteDescription}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2 pt-4">
                <FormField
                  control={form.control}
                  name="hasHosting"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4 h-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{hasHostingLabel}</FormLabel>
                        <FormDescription>{hasHostingDescription}</FormDescription>
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
                    <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4 h-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">{hasDesignLabel}</FormLabel>
                        <FormDescription>{hasDesignDescription}</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          )}

          {/* Component Development Section */}
          {projectType === "component" && (
            <Card className="p-6 border border-muted shadow-sm animate-fade-in">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{componentDevelopmentLabel}</h3>
                  <p className="text-sm text-muted-foreground">{componentDevelopmentDescription}</p>
                </div>

                <FormField
                  control={form.control}
                  name="otherTechnology"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{componentDescriptionLabel}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={componentDescriptionPlaceholder}
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {componentDescriptionDescription}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          )}

          {/* Maintenance Service Section */}
          {projectType === "maintenance" && (
            <Card className="p-6 border border-muted shadow-sm animate-fade-in">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{maintenanceServiceLabel}</h3>
                  <p className="text-sm text-muted-foreground">{maintenanceServiceDescription}</p>
                </div>

                <FormField
                  control={form.control}
                  name="hoursPackage"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>
                        {hoursPackageLabel}:{" "}
                        <span className="text-primary font-medium">
                          {field.value === "none" ? hoursPackageNone : field.value === "30plus" ? hoursPackage30plus : field.value}{" "}
                          {field.value !== "none" ? hoursPackageUnit : ""}
                        </span>
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
                          className="py-4"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{hoursPackage10}</span>
                        <span>{hoursPackage20}</span>
                        <span>{hoursPackage30plus}</span>
                        <span>{hoursPackageNone}</span>
                      </div>
                      <FormDescription className="mt-2">
                        {hoursPackageDescription}
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
                      <FormLabel>{startDateLabel}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP", { locale: language === "en" ? enUS : es })
                              ) : (
                                <span>{startDatePlaceholder}</span>
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
                        {startDateDescription}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherTechnology"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{maintenanceDetailsLabel}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={maintenanceDetailsPlaceholder}
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {maintenanceDetailsDescription}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          )}

          {/* Technology Selection */}
          {(projectType === "website" || projectType === "component") && (
            <Card className="p-6 border border-muted shadow-sm animate-fade-in">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{technologyLabel}</h3>
                  <p className="text-sm text-muted-foreground">{technologyDescription}</p>
                </div>

                <FormField
                  control={form.control}
                  name="technology"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={technologyPlaceholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="nextjs">Next.js</SelectItem>
                          <SelectItem value="wordpress">WordPress + Elementor</SelectItem>
                          <SelectItem value="html">HTML + CSS</SelectItem>
                          <SelectItem value="undefined">{language === "en" ? "I don't know / Not defined" : "No lo sé / No definido"}</SelectItem>
                          <SelectItem value="other">{language === "en" ? "Other" : "Otro"}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {technology === "other" && (
                  <FormField
                    control={form.control}
                    name="otherTechnology"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{otherTechnologyLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder={otherTechnologyPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </Card>
          )}

          {/* Design Complexity & Timeline */}
          {projectType === "website" && (
            <Card className="p-6 border border-muted shadow-sm animate-fade-in">
              <div className="space-y-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">
                    {language === "en" ? "Style and Timeline" : "Estilo y Plazos"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Define the aesthetic and temporal aspects of the project" : "Define los aspectos estéticos y temporales del proyecto"}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="designComplexity"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>{designComplexityLabel}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3"
                        >
                          <Label
                            htmlFor="basic"
                            className={`flex items-start flex-col rounded-lg border-2 p-4 ${field.value === "basic" ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="basic" id="basic" />
                              <span className="font-medium">{designComplexityBasic}</span>
                            </div>
                            <FormDescription className="pl-6 pt-2">{designComplexityBasicDescription}</FormDescription>
                          </Label>

                          <Label
                            htmlFor="custom"
                            className={`flex items-start flex-col rounded-lg border-2 p-4 ${field.value === "custom" ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <span className="font-medium">{designComplexityCustom}</span>
                            </div>
                            <FormDescription className="pl-6 pt-2">{designComplexityCustomDescription}</FormDescription>
                          </Label>

                          <Label
                            htmlFor="premium"
                            className={`flex items-start flex-col rounded-lg border-2 p-4 ${field.value === "premium" ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="premium" id="premium" />
                              <span className="font-medium">{designComplexityPremium}</span>
                            </div>
                            <FormDescription className="pl-6 pt-2">{designComplexityPremiumDescription}</FormDescription>
                          </Label>
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
                    <FormItem className="space-y-4">
                      <FormLabel>{timelineLabel}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3"
                        >
                          <Label
                            htmlFor="standard"
                            className={`flex items-start flex-col rounded-lg border-2 p-4 ${field.value === "standard" ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="standard" id="standard" />
                              <span className="font-medium">{timelineStandard}</span>
                            </div>
                            <FormDescription className="pl-6 pt-2">{timelineStandardDescription}</FormDescription>
                          </Label>

                          <Label
                            htmlFor="rush"
                            className={`flex items-start flex-col rounded-lg border-2 p-4 ${field.value === "rush" ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="rush" id="rush" />
                              <span className="font-medium">{timelineRush}</span>
                            </div>
                            <FormDescription className="pl-6 pt-2">{timelineRushDescription}</FormDescription>
                          </Label>

                          <Label
                            htmlFor="urgent"
                            className={`flex items-start flex-col rounded-lg border-2 p-4 ${field.value === "urgent" ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="urgent" id="urgent" />
                              <span className="font-medium">{timelineUrgent}</span>
                            </div>
                            <FormDescription className="pl-6 pt-2">{timelineUrgentDescription}</FormDescription>
                          </Label>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>{timelineDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => setStep(1)} className="px-8 cursor-pointer">
              {backButton}
            </Button>
            <Button type="submit" className="px-8 cursor-pointer">
              {nextButton}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
