"use client"
import { useEstimateStore } from "@/lib/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLanguage } from "../../context/LanguageContext"
import { translations } from "../../data/translations"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introducí una dirección de correo electrónico válida",
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
})

export default function ClientInfoForm() {
  const { clientInfo, setClientInfo, setStep } = useEstimateStore()
  const { language } = useLanguage()
  const nameLabel = (translations.clientInfo?.name?.label as { en: string, es: string })[language]
  const title = (translations.clientInfo?.title as { en: string, es: string })[language]
  const namePlaceholder = (translations.clientInfo?.name?.placeholder as { en: string, es: string })[language]
  const emailLabel = (translations.clientInfo?.email?.label as { en: string, es: string })[language]
  const emailPlaceholder = (translations.clientInfo?.email?.placeholder as { en: string, es: string })[language]
  const companyLabel = (translations.clientInfo?.company?.label as { en: string, es: string })[language]
  const companyPlaceholder = (translations.clientInfo?.company?.placeholder as { en: string, es: string })[language]
  const phoneLabel = (translations.clientInfo?.phone?.label as { en: string, es: string })[language]
  const phonePlaceholder = (translations.clientInfo?.phone?.placeholder as { en: string, es: string })[language]
  const phoneDescription = (translations.clientInfo?.phone?.description as { en: string, es: string })[language]
  const submitLabel = (translations.clientInfo?.phone?.submit as { en: string, es: string })[language]

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
      <h2 className="mb-6 text-2xl font-bold animate-fade-in">{title}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="animate-fade-in animation-delay-200">
                <FormLabel>{nameLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={namePlaceholder}
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
                <FormLabel>{emailLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={emailPlaceholder}
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
                <FormLabel>{companyLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={companyPlaceholder}
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
                <FormLabel>{phoneLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={phonePlaceholder}
                    {...field}
                    className="transition-all duration-300 focus:border-primary"
                  />
                </FormControl>
                <FormDescription>{phoneDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full animate-fade-in animation-delay-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {submitLabel}
          </Button>
        </form>
      </Form>
    </div>
  )
}

