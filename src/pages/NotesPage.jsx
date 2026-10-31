import React, { useState } from 'react'
import { SAMPLE_NOTES } from '../data/sampleData'
import { 
  FileTextIcon, 
  SearchIcon, 
  ClockIcon, 
  DownloadIcon, 
  CopyIcon, 
  SparklesIcon,
  CheckCircleIcon
} from '../components/Icons'

export default function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeNote, setActiveNote] = useState(SAMPLE_NOTES[0])
  const [copiedId, setCopiedId] = useState(null)

  const categories = ['All', 'Mathematics', 'Algorithms', 'Machine Learning', 'Deep Learning']

  const filteredNotes = SAMPLE_NOTES.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.contentMarkdown.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCopy = (note) => {
    navigator.clipboard?.writeText(note.contentMarkdown)
    setCopiedId(note.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownload = (note) => {
    const blob = new Blob([`# ${note.title}\n\nCategory: ${note.category}\n${note.summary}\n\n${note.contentMarkdown}`], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${note.id}-${note.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <FileTextIcon size={14} />
            High-Yield Theory
          </div>
          <h1>Curated <span className="gradient-text">Lecture Notes & Cheatsheets</span></h1>
          <p>
            Concise, rigorous mathematical summaries, algorithm step-by-steps, and architectural breakdowns optimized for rapid review and exam preparation.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="filter-search-bar">
          <div className="search-input-wrapper">
            <SearchIcon size={18} className="search-input-icon" />
            <input 
              type="text" 
              placeholder="Search notes by formula, algorithm, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Notes List on Left, Active Reader on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
          
          {/* Notes List Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                SELECT A TOPIC ({filteredNotes.length})
              </span>
              <span className="sample-badge">Sample Notes</span>
            </div>

            {filteredNotes.map((note) => {
              const isSelected = activeNote?.id === note.id

              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--accent-primary)' : undefined,
                    background: isSelected ? 'rgba(99, 102, 241, 0.12)' : undefined,
                    boxShadow: isSelected ? '0 0 15px rgba(99, 102, 241, 0.25)' : undefined
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="pill-btn active" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                      {note.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <ClockIcon size={12} />
                      {note.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: isSelected ? '#a5b4fc' : 'var(--text-primary)' }}>
                    {note.title}
                  </h3>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {note.summary}
                  </p>
                </div>
              )
            })}

            {filteredNotes.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', padding: '2rem 0' }}>
                No notes found matching your search.
              </p>
            )}
          </div>

          {/* Active Reader Column */}
          {activeNote && (
            <div className="card" style={{ background: '#0e1424', border: '1px solid rgba(99, 102, 241, 0.3)', position: 'sticky', top: '5.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span className="pill-btn active" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {activeNote.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {activeNote.updatedDate}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {activeNote.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeNote)}
                    className="btn btn-secondary btn-sm"
                    title="Copy Markdown note"
                  >
                    {copiedId === activeNote.id ? <CheckCircleIcon size={16} style={{ color: '#10b981' }} /> : <CopyIcon size={16} />}
                    <span>{copiedId === activeNote.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(activeNote)}
                    className="btn btn-primary btn-sm"
                    title="Download Note as Markdown file"
                  >
                    <DownloadIcon size={16} />
                    <span>Download .md</span>
                  </button>
                </div>
              </div>

              {/* Note Content Display */}
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', borderLeft: '3px solid #38bdf8' }}>
                  <strong style={{ color: '#38bdf8' }}>Overview: </strong>
                  {activeNote.summary}
                </div>

                <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                  {activeNote.contentMarkdown}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
