import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index} className="group">
                <Card
                  className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  doc={result}
                  relationTo="posts"
                  showCategories
                />
              </div>
            )
          }

          return null
        })}
      </div>

      {(!posts || posts.length === 0) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No posts found.</p>
        </div>
      )}
    </div>
  )
}
