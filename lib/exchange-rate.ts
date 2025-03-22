"use server"

export async function getDollarBlueRate() {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares/blue", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate")
    }

    const data = await response.json()

    return {
      value: data.venta, // Using "venta" (selling) rate
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error fetching dollar blue rate:", error)

    // Return a fallback rate if API fails
    return {
      value: 1200, // Fallback rate
      lastUpdated: new Date().toISOString(),
    }
  }
}

