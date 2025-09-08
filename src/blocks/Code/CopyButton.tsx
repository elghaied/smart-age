'use client'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <Button
        size="sm"
        variant="secondary"
        onClick={handleCopy}
        className={`
          flex items-center gap-2 px-3 py-1.5 text-xs font-medium
          bg-[oklch(0.12_0.04_200)] hover:bg-[oklch(0.15_0.05_200)]
          border border-[oklch(0.20_0.03_200)] hover:border-[oklch(0.25_0.04_200)]
          text-[oklch(0.85_0.08_200)] hover:text-[oklch(0.90_0.10_200)]
          shadow-sm hover:shadow-md
          transition-all duration-200 ease-in-out
          hover:scale-105 active:scale-95
          focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.12_200)] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.08_0.02_220)]
          ${isCopied ? 'bg-[oklch(0.55_0.15_142)] hover:bg-[oklch(0.55_0.15_142)] border-[oklch(0.55_0.15_142)] text-white' : ''}
        `}
        disabled={isCopied}
      >
        {isCopied ? (
          <>
            <Check className="w-3 h-3" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </>
        )}
      </Button>
    </div>
  )
}
