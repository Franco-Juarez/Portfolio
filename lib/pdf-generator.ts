"use client"

import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import type { ClientInfo, ProjectRequirements } from "./store"

interface GeneratePDFProps {
  clientInfo: ClientInfo
  projectRequirements: ProjectRequirements
  totalCost: number
}

export const generatePDF = async ({ clientInfo, projectRequirements, totalCost }: GeneratePDFProps) => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  doc.text("Presupuesto de Proyecto", 105, 20, { align: "center" })

  // Add date
  const today = new Date()
  doc.setFontSize(10)
  doc.text(`Fecha: ${today.toLocaleDateString()}`, 20, 30)
  doc.text(`Presupuesto #: ${Math.floor(Math.random() * 10000)}`, 20, 35)

  // Add developer info
  doc.setFontSize(12)
  doc.text("De:", 20, 45)
  doc.setFontSize(10)
  doc.text("Franco Juárez", 20, 50)
  doc.text("Desarrollador Web", 20, 55)
  doc.text("franjuaache@gmail.com", 20, 60)
  doc.text("+54 9 291 511-6477", 20, 65)

  // Add client info
  doc.setFontSize(12)
  doc.text("Para:", 120, 45)
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
  doc.text("Requisitos del Proyecto", 20, 80)

  const websiteTypeLabels = {
    landing: "Landing Page",
    business: "Sitio Web Empresarial",
    ecommerce: "E-Commerce",
    saas: "Aplicación SaaS",
    blog: "Blog",
  }

  const projectTypeLabels = {
    website: "Página Web",
    component: "Componente o Plugin",
    maintenance: "Mantenimiento",
  }

  const technologyLabels = {
    nextjs: "Next.js",
    wordpress: "WordPress + Elementor",
    html: "HTML + CSS",
    other: projectRequirements.otherTechnology || "Otro",
  }

  const designComplexityLabels = {
    basic: "Básico",
    custom: "Personalizado",
    premium: "Premium",
  }

  const timelineLabels = {
    standard: "Estándar (4-6 semanas)",
    rush: "Rápido (2-3 semanas)",
    urgent: "Urgente (1-2 semanas)",
  }

  const requirementsData = [
    ["Tipo de Proyecto", projectTypeLabels[projectRequirements.projectType as keyof typeof projectTypeLabels]],
    ["Tipo de Sitio Web", websiteTypeLabels[projectRequirements.websiteType as keyof typeof websiteTypeLabels]],
    ["Número de Páginas", projectRequirements.pages.toString()],
    ["Tecnología", technologyLabels[projectRequirements.technology as keyof typeof technologyLabels]],
    ["¿Tiene hosting y dominio?", projectRequirements.hasHosting ? "Sí" : "No"],
    ["¿Tiene diseño propio?", projectRequirements.hasDesign ? "Sí" : "No"],
    [
      "Complejidad del Diseño",
      designComplexityLabels[projectRequirements.designComplexity as keyof typeof designComplexityLabels],
    ],
    ["Plazo de Entrega", timelineLabels[projectRequirements.timeline as keyof typeof timelineLabels]],
  ]

  autoTable(doc, {
    startY: 85,
    head: [["Requisito", "Valor"]],
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
    doc.text("Características Seleccionadas", 20, featuresY)

    const featuresData = selectedFeatures.map((feature) => [feature.name, `$${feature.price}`])

    autoTable(doc, {
      startY: featuresY + 5,
      head: [["Característica", "Precio"]],
      body: featuresData,
      theme: "grid",
      headStyles: { fillColor: [34, 197, 94] }, // Green color
    })
  }

  // Add total cost
  const lastTable = (doc as any).lastAutoTable
  const totalY = lastTable.finalY + 15

  if (totalCost > 0) {
    autoTable(doc, {
      startY: totalY,
      body: [["Costo Total Estimado", `$${totalCost.toLocaleString()}`]],
      theme: "grid",
      styles: { fontSize: 12, fontStyle: "bold" },
      bodyStyles: { fillColor: [240, 240, 240] },
    })
  } else {
    autoTable(doc, {
      startY: totalY,
      body: [["Costo Total Estimado", "A definir después de consulta"]],
      theme: "grid",
      styles: { fontSize: 12, fontStyle: "bold" },
      bodyStyles: { fillColor: [240, 240, 240] },
    })
  }

  // Add terms and conditions
  const termsY = (doc as any).lastAutoTable.finalY + 15

  doc.setFontSize(12)
  doc.text("Términos y Condiciones", 20, termsY)

  doc.setFontSize(9)
  const terms = [
    "1. Este presupuesto es válido por 30 días desde la fecha de emisión.",
    "2. El precio final puede variar según los requisitos detallados del proyecto.",
    "3. Se requiere un depósito del 50% para comenzar el trabajo, con el saldo a pagar al finalizar.",
    "4. El cronograma del proyecto comienza después de recibir el depósito y todo el contenido requerido.",
    "5. Las revisiones adicionales fuera del alcance pueden generar cargos adicionales.",
  ]

  terms.forEach((term, index) => {
    doc.text(term, 20, termsY + 5 + index * 5)
  })

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text("Franco Juárez | Desarrollador Web | franjuaache@gmail.com | +54 9 291 511-6477", 105, 285, {
      align: "center",
    })
  }

  // Save the PDF
  doc.save(`presupuesto-proyecto-${clientInfo.name.replace(/\s+/g, "-").toLowerCase()}.pdf`)

  return true
}

