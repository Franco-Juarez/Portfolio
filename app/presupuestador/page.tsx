import Button from "../components/button"

export default function Presupuestador() {
  return (
    <div className="container mx-auto px-4 py-12 bg-tech-pattern">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in">
          Presupuestador Web
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground animate-fade-in animation-delay-200">
          Obtené un presupuesto instantáneo para tu proyecto de desarrollo web personalizado. Completá un simple
          cuestionario y recibí un desglose detallado de costos.
        </p>
        <Button
          btnText="Comenzá tu Presupuesto"
          link="/estimate"
          isExternal={false}
        />
      </section>

      <section className="mb-12 grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] animate-fade-in animation-delay-400">
          <h2 className="mb-3 text-xl font-semibold">Proceso Simple</h2>
          <p className="text-muted-foreground">
            Respondé algunas preguntas sobre los requisitos de tu proyecto y obtené un presupuesto instantáneo.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] animate-fade-in animation-delay-500">
          <h2 className="mb-3 text-xl font-semibold">Precios Transparentes</h2>
          <p className="text-muted-foreground">
            Mirá exactamente cómo los requisitos de tu proyecto afectan el costo final con nuestra calculadora de
            precios dinámica.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] animate-fade-in animation-delay-600">
          <h2 className="mb-3 text-xl font-semibold">Presupuesto PDF Instantáneo</h2>
          <p className="text-muted-foreground">
            Descargá un presupuesto profesional en PDF con todos los detalles de tu proyecto y el desglose de precios.
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-8 shadow-sm animate-fade-in animation-delay-700">
        <h2 className="mb-6 text-2xl font-bold">Cómo Funciona</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="mb-2 font-semibold">Completá el Cuestionario</h3>
            <p className="text-sm text-muted-foreground">
              Contanos sobre los requisitos y especificaciones de tu proyecto.
            </p>
          </div>
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              2
            </div>
            <h3 className="mb-2 font-semibold">Revisá el Presupuesto</h3>
            <p className="text-sm text-muted-foreground">
              Mirá un desglose detallado de los costos de tu proyecto en tiempo real.
            </p>
          </div>
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="mb-2 font-semibold">Descargá el PDF</h3>
            <p className="text-sm text-muted-foreground">
              Obtené un presupuesto profesional en PDF con todos los detalles de tu proyecto.
            </p>
          </div>
          <div className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              4
            </div>
            <h3 className="mb-2 font-semibold">Ponete en Contacto</h3>
            <p className="text-sm text-muted-foreground">
              Me comunicaré con vos para discutir tu proyecto en más detalle.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

