'use client'

import Link from 'next/link'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'
import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  shop: [
    { label: 'Todos los productos', href: '/products' },
    { label: 'Novedades', href: '/products?sort=newest' },
    { label: 'Colecciones', href: '/collections' },
  ],
  help: [
    { label: 'Preguntas frecuentes', href: '/faq' },
    { label: 'Envíos y devoluciones', href: '/shipping' },
    { label: 'Contacto', href: '/contact' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'Sobre FoldPro', href: '/about' },
  ]

  if (policies?.privacy_policy) {
    companyLinks.push({ label: 'Política de privacidad', href: '/privacy' })
  }
  if (policies?.terms_of_service) {
    companyLinks.push({ label: 'Términos de servicio', href: '/terms' })
  }
  if (policies?.refund_policy) {
    companyLinks.push({ label: 'Política de devoluciones', href: '/refund-policy' })
  }
  if (policies?.cookie_policy) {
    companyLinks.push({ label: 'Política de cookies', href: '/cookie-policy' })
  }

  return (
    <footer className="border-t bg-[#0e2a47] text-white">
      <div className="container-custom py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-white/15 rounded-sm flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 4v8M11 4v8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                FoldPro
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Perchas plegables de alta calidad. Compactas, resistentes y elegantes para organizar tu ropa en cualquier lugar.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hola@foldpro.es</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-white/40">Tienda</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-white/40">Ayuda</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-white/40">Empresa</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} FoldPro. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Gestionar cookies
            </button>
            <span className="text-xs text-white/30">Con tecnología de Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
