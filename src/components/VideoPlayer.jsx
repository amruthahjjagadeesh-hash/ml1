import React, { useState, useEffect, useRef } from 'react'
import { 
  PlayIcon, 
  ExternalLinkIcon, 
  AlertCircleIcon, 
  ClockIcon, 
  CheckCircleIcon,
  VideoIcon
} from './Icons'

/**
 * Converts timestamp string (e.g. "05:20" or "01:15:30") to total seconds.
 */
export function timestampToSeconds(timeStr) {
  if (!timeStr) return 0
  if (typeof timeStr === 'number') return timeStr
  const parts = timeStr.trim().split(':').map(Number)
  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1]
  } else if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2]
  }
  return 0
}

/**
 * Parses normal or embed URLs (YouTube, Vimeo, direct MP4/WebM)
 * and returns clean embed info, watch URL, and source type.
 */
export function parseVideoSource(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      type: 'invalid',
      error: 'No video URL provided.'
    }
  }

  const trimmed = rawUrl.trim()

  // 1. YouTube detection (handles watch?v=, youtu.be/, embed/, shorts/)
  const ytWatchRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  const ytMatch = trimmed.match(ytWatchRegex)

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1]
    return {
      type: 'youtube',
      videoId: videoId,
      // Using youtube-nocookie for privacy and optimal iframe embedding compatibility
      embedBaseUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`
    }
  }

  // 2. Direct Video File detection (MP4, WebM, OGG)
  const isDirectFile = /\.(mp4|webm|ogg)($|\?)/i.test(trimmed)
  if (isDirectFile) {
    return {
      type: 'direct',
      url: trimmed,
      watchUrl: trimmed
    }
  }

  // 3. Generic iframe embed URL (e.g. Vimeo or custom hosting)
  if (/^https?:\/\//i.test(trimmed)) {
    return {
      type: 'generic_iframe',
      embedBaseUrl: trimmed,
      watchUrl: trimmed
    }
  }

  return {
    type: 'invalid',
    error: 'Unrecognized video format or URL.'
  }
}

export default function VideoPlayer({ 
  video, 
  seekTime = "00:00",
  onPlaybackChange
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [playbackError, setPlaybackError] = useState(null)
  const [seekSeconds, setSeekSeconds] = useState(0)
  const videoRef = useRef(null)

  const parsedSource = parseVideoSource(video?.videoUrl)

  // When video prop changes, reset state
  useEffect(() => {
    setIsPlaying(false)
    setIsLoading(false)
    setPlaybackError(null)
    setSeekSeconds(0)
  }, [video?.id, video?.videoUrl])

  // When seekTime changes, calculate seconds and initiate play
  useEffect(() => {
    if (seekTime) {
      const secs = timestampToSeconds(seekTime)
      setSeekSeconds(secs)
      setIsPlaying(true)
      setIsLoading(true)

      // If direct HTML5 video is rendered, seek directly
      if (videoRef.current && parsedSource.type === 'direct') {
        try {
          videoRef.current.currentTime = secs
          videoRef.current.play().catch(() => {})
        } catch (e) {
          console.warn("Direct video seek error:", e)
        }
      }
    }
  }, [seekTime])

  const handleStartPlay = () => {
    setIsPlaying(true)
    setIsLoading(true)
    setPlaybackError(null)
    if (onPlaybackChange) onPlaybackChange(true)
  }

  const handleRetry = () => {
    setPlaybackError(null)
    setIsLoading(true)
    setIsPlaying(true)
  }

  // Construct YouTube embed URL with optimal parameters & timestamp
  const getYouTubeEmbedSrc = () => {
    if (parsedSource.type !== 'youtube') return ''
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      enablejsapi: '1',
      playsinline: '1',
      origin: window.location.origin
    })

    if (seekSeconds > 0) {
      params.set('start', seekSeconds.toString())
    }

    return `${parsedSource.embedBaseUrl}?${params.toString()}`
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingTop: '56.25%', // Strict 16:9 Aspect Ratio
      background: '#040711',
      overflow: 'hidden',
      borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* State 1: Poster Canvas (Before User Clicks Play) */}
        {!isPlaying && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)',
            padding: '2rem',
            textAlign: 'center',
            zIndex: 10
          }}>
            {/* Play Button Trigger */}
            <button
              type="button"
              onClick={handleStartPlay}
              aria-label="Play video lecture"
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 35px rgba(99, 102, 241, 0.55)',
                cursor: 'pointer',
                marginBottom: '1.25rem',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)'
                e.currentTarget.style.boxShadow = '0 0 45px rgba(99, 102, 241, 0.75)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 0 35px rgba(99, 102, 241, 0.55)'
              }}
            >
              <PlayIcon size={34} style={{ marginLeft: '4px' }} />
            </button>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem', maxWidth: '600px' }}>
              {video?.thumbnailText || video?.title}
            </h3>

            <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: '480px', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Click to start stream with interactive chapter seeking and high-definition playback.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span className="live-badge">HD STREAM READY</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ClockIcon size={14} />
                {video?.duration}
              </span>
              {parsedSource.watchUrl && (
                <a
                  href={parsedSource.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <span>Open on YouTube</span>
                  <ExternalLinkIcon size={12} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* State 2: Active Player (YouTube Iframe or Direct HTML5) */}
        {isPlaying && (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Loading Spinner Indicator */}
            {isLoading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(5, 7, 13, 0.85)',
                zIndex: 5,
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  border: '3px solid rgba(99, 102, 241, 0.2)',
                  borderTopColor: '#6366f1',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Loading video stream at {seekTime}...
                </span>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {/* Error Notification / Fallback Screen */}
            {playbackError && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(9, 13, 22, 0.95)',
                padding: '2rem',
                textAlign: 'center',
                zIndex: 20
              }}>
                <AlertCircleIcon size={36} style={{ color: '#f43f5e', marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                  Video Playback Notice
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: '460px', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  {playbackError}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="btn btn-secondary btn-sm"
                  >
                    Retry Player
                  </button>
                  {parsedSource.watchUrl && (
                    <a
                      href={parsedSource.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <span>Watch Directly on YouTube</span>
                      <ExternalLinkIcon size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Branch A: YouTube Source */}
            {parsedSource.type === 'youtube' && (
              <iframe
                key={`${parsedSource.videoId}-${seekSeconds}`}
                src={getYouTubeEmbedSrc()}
                title={video?.title || "Educational Lecture"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setPlaybackError("Embedding could not be established. Video owner may have restricted embedded playback, or network blocked iframe. You can watch directly on YouTube below.")
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block'
                }}
              />
            )}

            {/* Branch B: Direct HTML5 Video File Source */}
            {parsedSource.type === 'direct' && (
              <video
                ref={videoRef}
                src={parsedSource.url}
                controls
                autoPlay
                playsInline
                onLoadedData={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setPlaybackError("Unable to load direct media stream. Check video source file availability or network CORS.")
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  background: '#000000'
                }}
              >
                <source src={parsedSource.url} type="video/mp4" />
                Your browser does not support HTML5 video tags.
              </video>
            )}

            {/* Branch C: Generic Iframe Embed */}
            {parsedSource.type === 'generic_iframe' && (
              <iframe
                src={parsedSource.embedBaseUrl}
                title={video?.title || "Video Player"}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setPlaybackError("Unable to load external video frame.")
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block'
                }}
              />
            )}

            {/* Branch D: Invalid URL */}
            {parsedSource.type === 'invalid' && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <AlertCircleIcon size={32} style={{ color: '#fbbf24', marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>Invalid Video Source</h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  {parsedSource.error || "Please verify the video URL in your configuration."}
                </p>
              </div>
            )}

            {/* Top Quick Action Bar: Direct Watch Link */}
            {parsedSource.watchUrl && !playbackError && (
              <div style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                zIndex: 4,
                display: 'flex',
                gap: '0.5rem'
              }}>
                <a
                  href={parsedSource.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{
                    background: 'rgba(10, 13, 20, 0.85)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '0.75rem',
                    padding: '0.35rem 0.65rem',
                    borderColor: 'rgba(255, 255, 255, 0.15)'
                  }}
                  title="Open in new YouTube tab"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLinkIcon size={12} />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
