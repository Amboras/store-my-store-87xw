'use client'

import { useState } from 'react'
import { X, Tag } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[#0e2a47] text-white">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-sm tracking-wide">
        <Tag className="h-3.5 w-3.5 shrink-0 opacity-80" />
        <p className="font-medium">
          Envio gratis en pedidos superiores a 30€ &mdash; Compra 2 packs y ahorra un 20%
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Cerrar anuncio"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
