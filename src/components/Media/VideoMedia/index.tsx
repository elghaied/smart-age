'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, onLoad } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      const handleLoadStart = () => setIsLoading(true)
      const handleCanPlay = () => {
        setIsLoading(false)
        setHasError(false)
        onLoad?.()
      }
      const handleError = () => {
        setIsLoading(false)
        setHasError(true)
      }
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleSuspend = () => {
        console.warn('Video was suspended, may need fallback.')
      }

      video.addEventListener('loadstart', handleLoadStart)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('error', handleError)
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('suspend', handleSuspend)

      return () => {
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('suspend', handleSuspend)
      }
    }
  }, [onLoad])

  if (!resource || typeof resource !== 'object') {
    return null
  }

  const { filename, alt } = resource

  // Error fallback
  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted border border-border rounded-lg',
          'min-h-[200px] text-muted-foreground',
          videoClassName,
        )}
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="text-sm font-medium">Failed to load video</p>
          <p className="text-xs text-muted-foreground">{alt || 'Video could not be displayed'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg group">
      {/* Loading state overlay */}
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-center justify-center',
            'bg-muted/50 backdrop-blur-sm transition-opacity duration-300',
          )}
        >
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading video...</span>
          </div>
        </div>
      )}

      <video
        autoPlay
        className={cn(
          'w-full h-full object-cover transition-all duration-300',
          'group-hover:scale-105',
          {
            'opacity-0': isLoading,
            'opacity-100': !isLoading,
          },
          videoClassName,
        )}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
        preload="metadata"
      >
        <source src={getMediaUrl(`/media/${filename}`)} />
        <p className="text-muted-foreground text-sm">
          Your browser does not support the video tag.
        </p>
      </video>

      {/* Play/Pause indicator */}
      {!isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Video caption */}
      {alt && !isLoading && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <p className="text-white text-sm font-medium line-clamp-2">{alt}</p>
        </div>
      )}
    </div>
  )
}
