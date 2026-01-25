import React from 'react'

import { Card, CardData } from '@/components/Card'

export type Props = {
  items: CardData[]
  relationTo?: 'posts' | 'careers'
  emptyMessage?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { items, relationTo = 'posts', emptyMessage = 'No items found.' } = props

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {items?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index} className="group">
                <Card
                  className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  doc={result}
                  relationTo={relationTo}
                  showCategories
                />
              </div>
            )
          }

          return null
        })}
      </div>

      {(!items || items.length === 0) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}
