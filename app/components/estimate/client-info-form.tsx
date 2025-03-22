"use client"

import { useEstimateStore } from "@/lib/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introducí una dirección de correo electrónico válida.",
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
})

export default function ClientInfoForm() {
  const { clientInfo, setClientInfo, setStep } = useEstimateStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: clientInfo.name,
      email: clientInfo.email,
      company: clientInfo.company,
      phone: clientInfo.phone,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setClientInfo(values)
    setStep(2)
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold animate-fade-in">Tu Información</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="animate-fade-in animation-delay-200">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Juan Pérez"
                    {...field}
                    className="transition-all duration-300 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="animate-fade-in animation-delay-300">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="juan@ejemplo.com"
                    {...field}
                    className="transition-all duration-300 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="animate-fade-in animation-delay-400">
                <FormLabel>Empresa (Opcional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Inc."
                    {...field}
                    className="transition-all duration-300 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="animate-fade-in animation-delay-500">
                <FormLabel>Teléfono (Opcional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+54 9 291 511-6477"
                    {...field}
                    className="transition-all duration-300 focus:border-primary"
                  />
                </FormControl>
                <FormDescription>Solo lo usaré para contactarte sobre tu proyecto.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full animate-fade-in animation-delay-600 hover:scale-105 transition-all duration-300"
          >
            Siguiente
          </Button>
        </form>
      </Form>
    </div>
  )
}

