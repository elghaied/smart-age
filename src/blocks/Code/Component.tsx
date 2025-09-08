import React from 'react'

import { Code } from './Component.client'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div
      className={[
        className,
        'not-prose',
        'my-6', // Consistent vertical spacing
        'rounded-lg', // Rounded corners for modern look
        'overflow-hidden', // Ensure clean edges
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Code code={code} language={language} />
    </div>
  )
}
