'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Package, Zap, Award, Truck, Shield, RotateCcw, ChevronDown, Star } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80'

const features = [
  {
    icon: Package,
    title: 'Ultra compactas',
    description: 'Se pliegan al tamaño de tu mano. Perfectas para viajes, maletas o armarios pequeños.',
  },
  {
    icon: Zap,
    title: 'Montaje en segundos',
    description: 'Sin herramientas, sin complicaciones. Abre, cuelga y listo en menos de 3 segundos.',
  },
  {
    icon: Award,
    title: 'Resistencia garantizada',
    description: 'Fabricadas en ABS reforzado. Soportan hasta 5 kg sin deformarse ni romperse.',
  },
]

const trustBadges = [
  { icon: Truck, label: 'Envío gratis', sub: 'En pedidos +30€' },
  { icon: RotateCcw, label: 'Devolución gratuita', sub: '30 días de garantía' },
  { icon: Shield, label: 'Pago seguro', sub: 'Encriptación SSL 256-bit' },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#f0f4f8] overflow-hidden min-h-[92vh] flex items-center">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0 w-full">
          {/* Text */}
          <div className="space-y-7 animate-fade-in-up relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#0e2a47]/8 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1a7fc1] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0e2a47]">
                Mas de 12.000 clientes satisfechos
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#0e2a47] text-balance">
              El orden que tu ropa<br />
              <span className="text-[#1a7fc1]">merece. En cualquier lugar.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              Las perchas FoldPro se pliegan en segundos y ocupan el espacio de una tarjeta. Perfectas para casa, viajes y armarios compactos.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#0e2a47] text-white px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-[#1a3d5c] transition-colors rounded-sm"
                prefetch={true}
              >
                Ver perchas
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 border border-[#0e2a47]/25 text-[#0e2a47] px-8 py-4 text-sm font-bold uppercase tracking-wide hover:border-[#0e2a47] transition-colors rounded-sm"
              >
                Como funcionan
                <ChevronDown className="h-4 w-4" />
              </Link>
            </div>

            {/* Social proof mini */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {['bg-blue-400', 'bg-indigo-400', 'bg-cyan-400', 'bg-sky-400'].map((color, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${color} flex items-center justify-center text-white text-xs font-bold`}>
                    {['A', 'M', 'P', 'L'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">4.9/5 — Mas de 3.200 reseñas verificadas</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60">
              <Image
                src={HERO_IMAGE}
                alt="Perchas plegables FoldPro en uso"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-white rounded-xl px-4 py-3 shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Ahorro de espacio</p>
                <p className="text-2xl font-extrabold text-[#0e2a47]">85%</p>
              </div>
              <div className="absolute bottom-6 right-6 bg-[#0e2a47] rounded-xl px-4 py-3 shadow-lg text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-0.5">Capacidad</p>
                <p className="text-xl font-extrabold">Hasta 5 kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d9e8f5]/40 to-transparent pointer-events-none" />
      </section>

      {/* Trust bar */}
      <section className="border-y border-slate-200 bg-white py-5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 justify-center py-4 md:py-0">
                <div className="w-10 h-10 rounded-full bg-[#0e2a47]/6 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-[#0e2a47]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0e2a47]">{label}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a7fc1] mb-3">Por que FoldPro</p>
            <h2 className="text-4xl font-extrabold text-[#0e2a47] tracking-tight">
              La percha que tu armario necesitaba
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Disenadas para la vida moderna. Orden, practicidad y durabilidad en un solo producto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group bg-[#f0f4f8] rounded-2xl p-8 hover:bg-[#0e2a47] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0e2a47]/8 group-hover:bg-white/10 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="h-6 w-6 text-[#0e2a47] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#0e2a47] group-hover:text-white mb-3 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 group-hover:text-white/70 leading-relaxed transition-colors">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      {isLoading ? (
        <section className="py-24 bg-[#f0f4f8]">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-slate-200 rounded mx-auto" />
              <div className="h-8 w-64 bg-slate-200 rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* Lifestyle section */}
      <section className="py-24 bg-[#0e2a47]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 lg:max-w-md order-2 lg:order-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a7fc1]">Nuestra filosofia</p>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                El orden no deberia ocupar espacio
              </h2>
              <p className="text-white/60 leading-relaxed">
                En FoldPro creemos que una percha tiene que hacer su trabajo sin estorbar. Por eso disenamos perchas que desaparecen cuando no las necesitas y aparecen cuando las necesitas, en cualquier lugar del mundo.
              </p>
              <ul className="space-y-3">
                {['Materiales ABS reciclado certificado', 'Disenadas y testadas en Espana', 'Sin plasticos de un solo uso en el packaging'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="w-5 h-5 rounded-full bg-[#1a7fc1]/20 border border-[#1a7fc1]/40 flex items-center justify-center shrink-0">
                      <svg className="h-3 w-3 text-[#1a7fc1]" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white hover:text-[#1a7fc1] transition-colors"
                prefetch={true}
              >
                Conocenos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl shadow-black/30 order-1 lg:order-2">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Lifestyle FoldPro - orden en tu armario"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#f0f4f8]">
        <div className="container-custom max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a7fc1] mb-3">Mantente al dia</p>
          <h2 className="text-3xl font-extrabold text-[#0e2a47] tracking-tight">
            Ofertas exclusivas para suscriptores
          </h2>
          <p className="mt-3 text-slate-500 leading-relaxed">
            Recibe primero los descuentos, lanzamientos y consejos de organizacion para tu hogar.
          </p>
          {newsletterSubmitted ? (
            <div className="mt-8 bg-[#0e2a47] text-white rounded-xl px-6 py-4 text-sm font-semibold">
              Gracias por suscribirte. Bienvenido a la familia FoldPro.
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 border border-slate-300 bg-white rounded-sm px-4 py-3.5 text-sm placeholder:text-slate-400 focus:border-[#0e2a47] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-[#0e2a47] text-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-[#1a3d5c] transition-colors whitespace-nowrap rounded-sm"
              >
                Suscribirme
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
