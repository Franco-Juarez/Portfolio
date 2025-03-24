"use client"

import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import type { ClientInfo, ProjectRequirements } from "./store"

interface GeneratePDFProps {
  clientInfo: ClientInfo
  projectRequirements: ProjectRequirements
  totalCost: number
  language?: string
}

export const generatePDF = async ({ clientInfo, projectRequirements, totalCost, language = "es" }: GeneratePDFProps) => {
  const doc = new jsPDF()

  const isEnglish = language === "en";

  // Add title
  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  doc.text(isEnglish ? "Project Budget" : "Presupuesto de Proyecto", 105, 20, { align: "center" })

  // Add date
  const today = new Date()
  doc.setFontSize(10)
  doc.text(`${isEnglish ? "Date" : "Fecha"}: ${today.toLocaleDateString(isEnglish ? 'en-US' : 'es-AR')}`, 20, 30)
  doc.text(`${isEnglish ? "Budget #" : "Presupuesto #"}: ${Math.floor(Math.random() * 10000)}`, 20, 35)

  // Add developer info
  doc.setFontSize(12)
  doc.text(isEnglish ? "From:" : "De:", 20, 45)
  doc.setFontSize(10)
  doc.text("Franco Juárez", 20, 50)
  doc.text(isEnglish ? "Web Developer" : "Desarrollador Web", 20, 55)
  doc.text("franjuaache@gmail.com", 20, 60)
  doc.text("+54 9 291 511-6477", 20, 65)

  // Add client info
  doc.setFontSize(12)
  doc.text(isEnglish ? "To:" : "Para:", 120, 45)
  doc.setFontSize(10)
  doc.text(clientInfo.name, 120, 50)
  if (clientInfo.company) {
    doc.text(clientInfo.company, 120, 55)
  }
  doc.text(clientInfo.email, 120, clientInfo.company ? 60 : 55)
  if (clientInfo.phone) {
    doc.text(clientInfo.phone, 120, clientInfo.company ? 65 : 60)
  }

  // Add project requirements
  doc.setFontSize(14)
  doc.text(isEnglish ? "Project Requirements" : "Requisitos del Proyecto", 20, 80)

  const websiteTypeLabels = isEnglish ? {
    landing: "Landing Page",
    business: "Business Website",
    ecommerce: "E-Commerce",
    saas: "SaaS Application",
    blog: "Blog",
  } : {
    landing: "Landing Page",
    business: "Sitio Web Empresarial",
    ecommerce: "E-Commerce",
    saas: "Aplicación SaaS",
    blog: "Blog",
  }

  const projectTypeLabels = isEnglish ? {
    website: "Website",
    component: "Component or Plugin",
    maintenance: "Maintenance",
  } : {
    website: "Página Web",
    component: "Componente o Plugin",
    maintenance: "Mantenimiento",
  }

  const technologyLabels = {
    nextjs: "Next.js",
    wordpress: "WordPress + Elementor",
    html: "HTML + CSS",
    other: projectRequirements.otherTechnology || (isEnglish ? "Other" : "Otro"),
  }

  const designComplexityLabels = isEnglish ? {
    basic: "Basic",
    custom: "Custom",
    premium: "Premium",
  } : {
    basic: "Básico",
    custom: "Personalizado",
    premium: "Premium",
  }

  const timelineLabels = isEnglish ? {
    standard: "Standard (4-6 weeks)",
    rush: "Rush (2-3 weeks)",
    urgent: "Urgent (1-2 weeks)",
  } : {
    standard: "Estándar (4-6 semanas)",
    rush: "Rápido (2-3 semanas)",
    urgent: "Urgente (1-2 semanas)",
  }

  const requirementsData = [
    [isEnglish ? "Project Type" : "Tipo de Proyecto", projectTypeLabels[projectRequirements.projectType as keyof typeof projectTypeLabels]],
    [isEnglish ? "Website Type" : "Tipo de Sitio Web", websiteTypeLabels[projectRequirements.websiteType as keyof typeof websiteTypeLabels]],
    [isEnglish ? "Number of Pages" : "Número de Páginas", projectRequirements.pages.toString()],
    [isEnglish ? "Technology" : "Tecnología", technologyLabels[projectRequirements.technology as keyof typeof technologyLabels]],
    [isEnglish ? "Has hosting and domain?" : "¿Tiene hosting y dominio?", isEnglish ? (projectRequirements.hasHosting ? "Yes" : "No") : (projectRequirements.hasHosting ? "Sí" : "No")],
    [isEnglish ? "Has own design?" : "¿Tiene diseño propio?", isEnglish ? (projectRequirements.hasDesign ? "Yes" : "No") : (projectRequirements.hasDesign ? "Sí" : "No")],
    [
      isEnglish ? "Design Complexity" : "Complejidad del Diseño",
      designComplexityLabels[projectRequirements.designComplexity as keyof typeof designComplexityLabels],
    ],
    [isEnglish ? "Delivery Timeline" : "Plazo de Entrega", timelineLabels[projectRequirements.timeline as keyof typeof timelineLabels]],
  ]

  autoTable(doc, {
    startY: 85,
    head: [[isEnglish ? "Requirement" : "Requisito", isEnglish ? "Value" : "Valor"]],
    body: requirementsData,
    theme: "grid",
    headStyles: { fillColor: [34, 197, 94] }, // Green color
  })

  // Add selected features
  const selectedFeatures = projectRequirements.features.filter((feature) => feature.selected)

  if (selectedFeatures.length > 0) {
    const lastTable = (doc as any).lastAutoTable
    const featuresY = lastTable.finalY + 10

    doc.setFontSize(14)
    doc.text(isEnglish ? "Selected Features" : "Características Seleccionadas", 20, featuresY)

    // Translate feature names to English if necessary
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

    const currencySymbol = isEnglish ? "US$" : "$";
    const featuresData = selectedFeatures.map((feature) => [
      getFeatureName(feature),
      `${currencySymbol}${isEnglish ? Math.round(feature.price).toString() : feature.price}`
    ]);

    autoTable(doc, {
      startY: featuresY + 5,
      head: [[isEnglish ? "Feature" : "Característica", isEnglish ? "Price" : "Precio"]],
      body: featuresData,
      theme: "grid",
      headStyles: { fillColor: [34, 197, 94] }, // Green color
    })
  }

  // Add total cost
  const lastTable = (doc as any).lastAutoTable
  const totalY = lastTable.finalY + 15

  // Calculate the total in USD if English
  const displayedTotalCost = isEnglish ? Math.round(totalCost / 1000) : totalCost;
  const currencySymbol = isEnglish ? "US$" : "$";

  if (totalCost > 0) {
    autoTable(doc, {
      startY: totalY,
      body: [[isEnglish ? "Estimated Total Cost" : "Costo Total Estimado", `${currencySymbol}${displayedTotalCost.toLocaleString()}`]],
      theme: "grid",
      styles: { fontSize: 12, fontStyle: "bold" },
      bodyStyles: { fillColor: [240, 240, 240] },
    })
  } else {
    autoTable(doc, {
      startY: totalY,
      body: [[isEnglish ? "Estimated Total Cost" : "Costo Total Estimado", isEnglish ? "To be defined after consultation" : "A definir después de consulta"]],
      theme: "grid",
      styles: { fontSize: 12, fontStyle: "bold" },
      bodyStyles: { fillColor: [240, 240, 240] },
    })
  }

  // Add terms and conditions
  const termsY = (doc as any).lastAutoTable.finalY + 15

  doc.setFontSize(12)
  doc.text(isEnglish ? "Terms and Conditions" : "Términos y Condiciones", 20, termsY)

  doc.setFontSize(9)
  const terms = isEnglish ? [
    "1. This budget is valid for 30 days from the issue date.",
    "2. The final price may vary according to the detailed requirements of the project.",
    "3. A 50% deposit is required to start work, with the balance to be paid upon completion.",
    "4. The project timeline begins after receiving the deposit and all required content.",
    "5. Additional revisions outside the scope may generate additional charges.",
  ] : [
    "1. Este presupuesto es válido por 30 días desde la fecha de emisión.",
    "2. El precio final puede variar según los requisitos detallados del proyecto.",
    "3. Se requiere un depósito del 50% para comenzar el trabajo, con el saldo a pagar al finalizar.",
    "4. El cronograma del proyecto comienza después de recibir el depósito y todo el contenido requerido.",
    "5. Las revisiones adicionales fuera del alcance pueden generar cargos adicionales.",
  ];

  terms.forEach((term, index) => {
    doc.text(term, 20, termsY + 5 + index * 5)
  })

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(`Franco Juárez | ${isEnglish ? "Web Developer" : "Desarrollador Web"} | franjuaache@gmail.com | +54 9 291 511-6477`, 105, 285, {
      align: "center",
    })
  }

  // Save the PDF with an appropriate filename
  const filename = isEnglish
    ? `project-budget-${clientInfo.name.replace(/\s+/g, "-").toLowerCase()}.pdf`
    : `presupuesto-proyecto-${clientInfo.name.replace(/\s+/g, "-").toLowerCase()}.pdf`;

  doc.save(filename)

  return true
}

