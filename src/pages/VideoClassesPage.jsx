import React, { useState } from 'react'
import { SAMPLE_VIDEOS } from '../data/sampleData'
import VideoPlayer from '../components/VideoPlayer'
import { 
  VideoIcon, 
  PlayIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon,
  SparklesIcon,
  LayersIcon,
  AlertCircleIcon,
  ExternalLinkIcon
} from '../components/Icons'

export default function VideoClassesPage() {
  const [videoList, setVideoList] = useState(SAMPLE_VIDEOS)
  const [selectedVideo, setSelectedVideo] = useState(SAMPLE_VIDEOS[0])
  const [currentTimestamp, setCurrentTimestamp] = useState("00:00")
  const [customUrlInput, setCustomUrlInput] = useState("")
  const [customInputError, setCustomInputError] = useState(null)
  const [showTester, setShowTester] = useState(false)

  const handleSelectTimestamp = (ts) => {
    setCurrentTimestamp(ts.time)
  }

  const handleSelectVideo = (vid) => {
    setSelectedVideo(vid)
    setCurrentTimestamp(vid.timestamps?.[0]?.time || "00:00")
  }

  const handleLoadCustomUrl = (e) => {
    e.preventDefault()
    if (!customUrlInput.trim()) {
      setCustomInputError("Please enter a valid YouTube or direct video URL.")
      return
    }

    const customVideo = {
      id: `custom-${Date.now()}`,
      title: "Custom Stream Source",
      category: "Custom Stream",
      videoUrl: customUrlInput.trim(),
      duration: "User Media",
      instructor: "External Source",
      thumbnailText: "Custom Video Stream",
      views: "1 view",
      timestamps: [
        { time: "00:00", title: "Start of stream" }
      ],
      summary: `Loaded custom external video URL: ${customUrlInput.trim()}`
    }

    setVideoList([customVideo, ...videoList])
    setSelectedVideo(customVideo)
    setCurrentTimestamp("00:00")
    setCustomUrlInput("")
    setCustomInputError(null)
    setShowTester(false)
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <VideoIcon size={14} />
            Visual Masterclasses
          </div>
          <h1>High-Yield <span className="gradient-text">Video Lectures</span></h1>
          <p>
            Curated video walkthroughs of complex algorithms, mathematical derivations, and end-to-end MLOps pipeline deployments with synchronized chapter seeking.
          </p>
        </div>

        {/* Video Player & Playlist Layout */}
        <div className="video-page-grid">
          
          {/* Main Video Player Section */}
          <div>
            <div className="card" style={{ padding: '0', overflow: 'hidden', background: '#070b16', marginBottom: '2rem' }}>
              {/* Responsive 16:9 Video Player */}
              <VideoPlayer 
                video={selectedVideo} 
                seekTime={currentTimestamp}
              />

              {/* Video Info Footer */}
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <span className="pill-btn active" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', marginBottom: '0.5rem', display: 'inline-block' }}>
                      {selectedVideo.category}
                    </span>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {selectedVideo.title}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span>{selectedVideo.views}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ClockIcon size={14} />
                      {selectedVideo.duration}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <UserIcon size={15} style={{ color: '#818cf8' }} />
                  <span>Lecturer: <strong style={{ color: 'var(--text-primary)' }}>{selectedVideo.instructor}</strong></span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {selectedVideo.summary}
                </p>

                {/* Timestamps Chapter Index */}
                {selectedVideo.timestamps && selectedVideo.timestamps.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a5b4fc' }}>
                        Interactive Chapter Timestamps:
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Click to jump directly to topic
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {selectedVideo.timestamps.map((ts, idx) => {
                        const isCurrent = currentTimestamp === ts.time

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectTimestamp(ts)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.65rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              background: isCurrent ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid',
                              borderColor: isCurrent ? 'var(--accent-primary)' : 'var(--border-subtle)',
                              textAlign: 'left',
                              width: '100%',
                              color: 'var(--text-primary)',
                              fontSize: '0.875rem',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span style={{ 
                                fontFamily: 'var(--font-mono)', 
                                color: isCurrent ? '#38bdf8' : '#818cf8', 
                                fontWeight: 700,
                                background: 'rgba(15, 23, 42, 0.6)',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px'
                              }}>
                                {ts.time}
                              </span>
                              <span style={{ fontWeight: isCurrent ? 600 : 400 }}>
                                {ts.title}
                              </span>
                            </div>

                            <span style={{ fontSize: '0.75rem', color: isCurrent ? '#38bdf8' : 'var(--text-muted)' }}>
                              {isCurrent ? 'Current Seek' : 'Jump →'}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Educational Notice Regarding Embedding & YouTube Restrictions */}
            <div className="notice-box" style={{ marginBottom: '1.5rem' }}>
              <AlertCircleIcon size={20} className="notice-icon" style={{ color: '#38bdf8' }} />
              <div>
                <strong style={{ color: '#38bdf8' }}>About YouTube Video Playback & Embedding:</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.6 }}>
                  Videos are embedded using enhanced privacy (<code style={{ color: '#a5b4fc' }}>youtube-nocookie.com</code>) with automatic conversion from standard watch links to embed URLs. If an owner restricts external embedding (Error 150/101), you can click <strong>"Watch on YouTube"</strong> in the top-right overlay to view it directly in a new tab.
                </p>
              </div>
            </div>

            {/* Custom Video URL Tester Drawer */}
            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showTester ? '1rem' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SparklesIcon size={18} style={{ color: '#a855f7' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Test Custom Video Source</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTester(!showTester)}
                  className="btn btn-secondary btn-sm"
                >
                  {showTester ? 'Hide Tester' : 'Load Custom Video URL'}
                </button>
              </div>

              {showTester && (
                <form onSubmit={handleLoadCustomUrl} style={{ marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Paste any YouTube watch link (e.g. <code style={{ color: '#38bdf8' }}>https://www.youtube.com/watch?v=...</code>), YouTube short link (<code style={{ color: '#38bdf8' }}>https://youtu.be/...</code>), embed link, or direct MP4 URL:
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=YOUR_VIDEO_ID or .mp4 URL"
                      style={{ flex: 1, minWidth: '240px' }}
                    />
                    <button type="submit" className="btn btn-primary btn-sm">
                      Play Video
                    </button>
                  </div>
                  {customInputError && (
                    <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.35rem', display: 'block' }}>
                      {customInputError}
                    </span>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Course Video Playlist
              </h3>
              <span className="sample-badge">{videoList.length} Lectures</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {videoList.map((vid) => {
                const isSelected = selectedVideo.id === vid.id

                return (
                  <div
                    key={vid.id}
                    className="card"
                    onClick={() => handleSelectVideo(vid)}
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--accent-primary)' : undefined,
                      background: isSelected ? 'rgba(99, 102, 241, 0.12)' : undefined,
                      boxShadow: isSelected ? '0 0 15px rgba(99, 102, 241, 0.2)' : undefined,
                      padding: '1.15rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="pill-btn active" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                        {vid.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {vid.duration}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: isSelected ? '#a5b4fc' : 'var(--text-primary)', lineHeight: 1.4 }}>
                      {vid.title}
                    </h4>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <UserIcon size={12} />
                        {vid.instructor}
                      </span>
                      {isSelected && (
                        <span style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.75rem' }}>
                          Now Playing ▶
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
