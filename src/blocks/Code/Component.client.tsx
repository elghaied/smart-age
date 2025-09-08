'use client'
import { Highlight, type PrismTheme } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
}

// Custom theme with teal accents for Smart Age Tech
const customTheme: PrismTheme = {
  plain: {
    color: 'oklch(0.85 0.08 200)', // Light teal for text
    backgroundColor: 'oklch(0.08 0.02 220)', // Dark background with subtle teal tint
  },
  styles: [
    {
      types: ['keyword', 'selector', 'changed'],
      style: {
        color: 'oklch(0.65 0.12 200)', // Light teal for keywords
        fontWeight: 'bold' as const,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: 'oklch(0.75 0.10 160)', // Slightly green-teal for strings
      },
    },
    {
      types: ['function', 'class-name'],
      style: {
        color: 'oklch(0.70 0.12 240)', // Blue-teal for functions
      },
    },
    {
      types: ['number', 'boolean'],
      style: {
        color: 'oklch(0.65 0.12 200)', // Teal accent for numbers
      },
    },
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: 'oklch(0.45 0.04 200)', // Muted teal for comments
        fontStyle: 'italic' as const,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'oklch(0.65 0.06 200)', // Medium teal for punctuation
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'oklch(0.65 0.12 200)', // Teal for HTML tags
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'oklch(0.70 0.10 180)', // Cyan-teal for attributes
      },
    },
    {
      types: ['operator'],
      style: {
        color: 'oklch(0.65 0.12 200)', // Teal for operators
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'oklch(0.80 0.08 200)', // Light teal for variables
      },
    },
    {
      types: ['property'],
      style: {
        color: 'oklch(0.70 0.10 200)', // Medium teal for properties
      },
    },
    {
      types: ['important'],
      style: {
        color: 'oklch(0.65 0.12 200)', // Teal for important
        fontWeight: 'bold' as const,
      },
    },
  ],
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  return (
    <div className="relative group">
      <Highlight code={code} language={language} theme={customTheme}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <pre className="relative bg-[oklch(0.08_0.02_220)] border border-[oklch(0.20_0.03_200)] rounded-lg p-4 text-sm font-mono overflow-x-auto shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="table w-full">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ className: 'table-row', line })}>
                  <span className="table-cell select-none text-right pr-4 text-[oklch(0.45_0.04_200)] font-mono text-xs leading-6 w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell leading-6">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <CopyButton code={code} />
          </pre>
        )}
      </Highlight>
    </div>
  )
}
