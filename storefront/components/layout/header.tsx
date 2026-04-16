'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: collections } = useCollections()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuCloseRef.current?.focus()
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
            : 'bg-white border-b border-slate-200'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#0e2a47] rounded-sm flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4h12M2 8h12M2 12h12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 4v8M11 4v8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                  </svg>
                </div>
                <span className="font-heading text-xl font-bold tracking-tight text-[#0e2a47]">
                  FoldPro
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/products" className="text-sm font-medium tracking-wide uppercase link-underline py-1 text-slate-700 hover:text-[#0e2a47] transition-colors" prefetch={true}>
                Tienda
              </Link>
              {collections?.slice(0, 3).map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="text-sm font-medium tracking-wide uppercase link-underline py-1 text-slate-700 hover:text-[#0e2a47] transition-colors"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
              <Link href="/about" className="text-sm font-medium tracking-wide uppercase link-underline py-1 text-slate-700 hover:text-[#0e2a47] transition-colors" prefetch={true}>
                Nosotros
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/search"
                className="p-2.5 hover:opacity-70 transition-opacity text-slate-700"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 hover:opacity-70 transition-opacity hidden sm:block text-slate-700"
                aria-label={isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión'}
              >
                {isLoggedIn ? <User className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-70 transition-opacity text-slate-700"
                aria-label="Carrito de compra"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0e2a47] text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <span className="font-heading text-xl font-bold text-[#0e2a47]">FoldPro</span>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-70"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg font-medium tracking-wide border-b border-slate-100 text-slate-800"
                prefetch={true}
              >
                Tienda
              </Link>
              {collections?.map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium tracking-wide border-b border-slate-100 text-slate-800"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg font-medium tracking-wide border-b border-slate-100 text-slate-800"
                prefetch={true}
              >
                Nosotros
              </Link>
              <div className="pt-4 space-y-1">
                <Link
                  href={isLoggedIn ? '/account' : '/auth/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-muted-foreground"
                >
                  {isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión'}
                </Link>
                <Link
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-muted-foreground"
                >
                  Buscar
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
