'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded!{' '}
    <a target="_blank" href="/" rel="noreferrer">
      Visit your website
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Database already seeded.')
        return
      }
      if (loading) {
        toast.info('Seeding already in progress.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        toast.promise(
          fetch('/next/seed', { method: 'POST', credentials: 'include' }).then((res) => {
            if (res.ok) {
              setSeeded(true)
              return true
            }
            throw new Error('Seed failed')
          }),
          {
            loading: 'Seeding database...',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding.',
          },
        )
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    },
    [loading, seeded],
  )

  return (
    <Fragment>
      <div className="seed-button-wrapper">
        <div className="seed-button-content">
          <h4>Seed Database</h4>
          <p>
            Click the button below to populate the database with sample data for Smart Age. This
            will add values, services, projects, goals, features, team members, and configure the
            homepage.
          </p>
          <p className="seed-warning">
            <strong>Warning:</strong> This will clear existing data in the seeded collections.
          </p>
          <button
            className="seed-button"
            onClick={handleClick}
            disabled={loading || seeded}
            type="button"
          >
            {loading ? 'Seeding...' : seeded ? 'Seeded!' : 'Seed Database'}
          </button>
          {error && <span className="seed-error">Error: {error}</span>}
        </div>
      </div>
    </Fragment>
  )
}

export default SeedButton
