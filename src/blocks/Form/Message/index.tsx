import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const Message: React.FC<{ message: SerializedEditorState }> = ({ message }) => {
  return (
    <Width className="my-8" width="100">
      {message && (
        <div className="p-6 rounded-lg bg-accent/10 border border-accent/20">
          <RichText data={message} />
        </div>
      )}
    </Width>
  )
}
