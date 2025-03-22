import { create } from "zustand"
import { persist } from "zustand/middleware"

export type WebsiteType = "landing" | "business" | "ecommerce" | "saas" | "blog"
export type DesignComplexity = "basic" | "custom" | "premium"
export type Timeline = "standard" | "rush" | "urgent"
export type Technology = "nextjs" | "wordpress" | "html" | "other" | "undefined"
export type ProjectType = "website" | "component" | "maintenance"
export type HoursPackage = "10" | "20" | "30plus" | "none"

export interface Feature {
  id: string
  name: string
  description: string
  price: number
  selected: boolean
}

export interface ClientInfo {
  name: string
  email: string
  company: string
  phone: string
}

export interface ProjectRequirements {
  websiteType: WebsiteType
  pages: number
  designComplexity: DesignComplexity
  timeline: Timeline
  features: Feature[]
  hasHosting: boolean
  hasDesign: boolean
  technology: Technology
  otherTechnology?: string
  projectType: ProjectType
  hoursPackage?: HoursPackage
  startDate?: string
}

export interface EstimateState {
  step: number
  clientInfo: ClientInfo
  projectRequirements: ProjectRequirements
  totalCost: number
  dollarRate: number

  // Actions
  setStep: (step: number) => void
  setClientInfo: (info: Partial<ClientInfo>) => void
  setWebsiteType: (type: WebsiteType) => void
  setPages: (pages: number) => void
  setDesignComplexity: (complexity: DesignComplexity) => void
  setTimeline: (timeline: Timeline) => void
  toggleFeature: (id: string) => void
  setHasHosting: (hasHosting: boolean) => void
  setHasDesign: (hasDesign: boolean) => void
  setTechnology: (technology: Technology) => void
  setOtherTechnology: (otherTechnology: string) => void
  setProjectType: (projectType: ProjectType) => void
  setHoursPackage: (hoursPackage: HoursPackage) => void
  setStartDate: (startDate: string) => void
  setDollarRate: (rate: number) => void
  calculateTotal: () => void
  resetEstimate: () => void
  shouldShowFeaturesStep: () => boolean
}

// Base pricing constants
const BASE_PRICE_PER_PAGE = 65 // USD

// Default features
const DEFAULT_FEATURES: Feature[] = [
  {
    id: "contact_form",
    name: "Formulario de contacto",
    description: "Incluir un formulario de contacto en el sitio web",
    price: 50,
    selected: false,
  },
  {
    id: "analytics",
    name: "Integración de Analytics",
    description: "Integrar herramientas de análisis para seguimiento de visitantes",
    price: 50,
    selected: false,
  },
  {
    id: "multilingual",
    name: "Página multilingüe",
    description: "Hacer que el sitio web esté disponible en varios idiomas",
    price: 100,
    selected: false,
  },
  {
    id: "newsletter",
    name: "Suscripción a newsletter",
    description: "Permitir a los visitantes suscribirse a tu newsletter",
    price: 50,
    selected: false,
  },
  {
    id: "appointment",
    name: "Sistema de turnos",
    description: "Implementar un sistema para reservar citas o turnos",
    price: 80,
    selected: false,
  },
  {
    id: "user_management",
    name: "Gestión de usuarios",
    description: "Registro e inicio de sesión para clientes",
    price: 50,
    selected: false,
  },
  {
    id: "dark_mode",
    name: "Modo oscuro/claro",
    description: "Para mejorar la experiencia del usuario",
    price: 80,
    selected: false,
  },
]

export const useEstimateStore = create<EstimateState>()(
  persist(
    (set, get) => ({
      step: 1,
      clientInfo: {
        name: "",
        email: "",
        company: "",
        phone: "",
      },
      projectRequirements: {
        websiteType: "business",
        pages: 5,
        designComplexity: "custom",
        timeline: "standard",
        features: DEFAULT_FEATURES,
        hasHosting: true,
        hasDesign: true,
        technology: "nextjs",
        otherTechnology: "",
        projectType: "website",
        hoursPackage: "10",
        startDate: "",
      },
      totalCost: 0,
      dollarRate: 1000, // Default value, will be updated from API

      setStep: (step) => set({ step }),

      setClientInfo: (info) =>
        set((state) => ({
          clientInfo: { ...state.clientInfo, ...info },
        })),

      setWebsiteType: (websiteType) => {
        set((state) => {
          // If landing page is selected, set pages to 1
          const pages = websiteType === "landing" ? 1 : state.projectRequirements.pages

          return {
            projectRequirements: {
              ...state.projectRequirements,
              websiteType,
              pages,
            },
          }
        })
        get().calculateTotal()
      },

      setPages: (pages) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, pages },
        }))
        get().calculateTotal()
      },

      setDesignComplexity: (designComplexity) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, designComplexity },
        }))
        get().calculateTotal()
      },

      setTimeline: (timeline) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, timeline },
        }))
        get().calculateTotal()
      },

      toggleFeature: (id) => {
        set((state) => ({
          projectRequirements: {
            ...state.projectRequirements,
            features: state.projectRequirements.features.map((feature) =>
              feature.id === id ? { ...feature, selected: !feature.selected } : feature,
            ),
          },
        }))
        get().calculateTotal()
      },

      setHasHosting: (hasHosting) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, hasHosting },
        }))
        get().calculateTotal()
      },

      setHasDesign: (hasDesign) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, hasDesign },
        }))
        get().calculateTotal()
      },

      setTechnology: (technology) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, technology },
        }))
        get().calculateTotal()
      },

      setOtherTechnology: (otherTechnology) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, otherTechnology },
        }))
        get().calculateTotal()
      },

      setProjectType: (projectType) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, projectType },
        }))
        get().calculateTotal()
      },

      setHoursPackage: (hoursPackage) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, hoursPackage },
        }))
        get().calculateTotal()
      },

      setStartDate: (startDate) => {
        set((state) => ({
          projectRequirements: { ...state.projectRequirements, startDate },
        }))
        get().calculateTotal()
      },

      setDollarRate: (dollarRate) => {
        set({ dollarRate })
        get().calculateTotal()
      },

      shouldShowFeaturesStep: () => {
        const { projectType } = get().projectRequirements
        return projectType === "website"
      },

      calculateTotal: () => {
        const {
          websiteType,
          pages,
          designComplexity,
          timeline,
          features,
          hasHosting,
          hasDesign,
          technology,
          projectType,
          hoursPackage,
        } = get().projectRequirements
        const dollarRate = get().dollarRate

        let totalUSD = 0

        if (projectType === "website") {
          // Base cost: $65 per page
          totalUSD = BASE_PRICE_PER_PAGE * pages

          // Technology adjustments
          if (technology === "nextjs") {
            totalUSD *= 1.2 // +20% (changed from 15%)
          } else if (technology === "wordpress") {
            totalUSD *= 1.1 // +10%

            // Add hosting cost if needed
            if (!hasHosting) {
              totalUSD *= 1.05 // +5%
            }
          }
          // No adjustment for "undefined" technology

          // Design complexity
          if (designComplexity === "custom") {
            totalUSD *= 1.05 // +5%
          } else if (designComplexity === "premium") {
            totalUSD *= 1.1 // +10%
          }

          // Design creation
          if (!hasDesign) {
            totalUSD += 100 * pages // +$100 per page
          }

          // Timeline adjustments
          if (timeline === "rush") {
            totalUSD *= 1.15 // +15%
          } else if (timeline === "urgent") {
            totalUSD *= 1.2 // +20%
          }

          // Add cost for selected features
          const featuresTotal = features
            .filter((feature) => feature.selected)
            .reduce((sum, feature) => sum + feature.price, 0)

          totalUSD += featuresTotal
        } else if (projectType === "maintenance") {
          // For maintenance, calculate based on hours package
          let hourlyRate = 15 // Default rate
          let hours = 0

          if (hoursPackage === "10") {
            hourlyRate = 20
            hours = 10
          } else if (hoursPackage === "20") {
            hourlyRate = 18
            hours = 20
          } else if (hoursPackage === "30plus") {
            hourlyRate = 15
            hours = 30
          } else if (hoursPackage === "none") {
            // No package selected, price will be determined after consultation
            totalUSD = 0
          }

          if (hoursPackage !== "none") {
            totalUSD = hourlyRate * hours
          }
        } else if (projectType === "component") {
          // For component/plugin, we don't calculate a total - it will be determined after consultation
          totalUSD = 0
        }

        // Convert to ARS
        const totalARS = Math.ceil((totalUSD * dollarRate) / 100) * 100

        set({ totalCost: totalARS })
      },

      resetEstimate: () =>
        set({
          step: 1,
          clientInfo: {
            name: "",
            email: "",
            company: "",
            phone: "",
          },
          projectRequirements: {
            websiteType: "business",
            pages: 5,
            designComplexity: "custom",
            timeline: "standard",
            features: DEFAULT_FEATURES,
            hasHosting: true,
            hasDesign: true,
            technology: "nextjs",
            otherTechnology: "",
            projectType: "website",
            hoursPackage: "10",
            startDate: "",
          },
          totalCost: 0,
        }),
    }),
    {
      name: "project-estimate-storage",
    },
  ),
)

