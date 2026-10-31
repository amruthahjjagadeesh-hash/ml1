import React, { useState } from 'react'
import { SAMPLE_PYQS } from '../data/sampleData'
import { 
  LayersIcon, 
  SearchIcon, 
  ChevronDownIcon, 
  ChevronRightIcon, 
  CheckCircleIcon,
  SparklesIcon,
  BookIcon
} from '../components/Icons'

export default function PYQsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [expandedSolutions, setExpandedSolutions] = useState({ 'pyq-1': true })

  const difficulties = ['All', 'Medium', 'Hard']

  const toggleSolution = (id) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const filteredPYQs = SAMPLE_PYQS.filter(item => {
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.solution.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDifficulty && matchesSearch
  })

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <LayersIcon size={14} />
            Exam & Interview Bank
          </div>
          <h1>Previous Year Questions <span className="gradient-text">(PYQs) & Solutions</span></h1>
          <p>
            Rigorous technical interview questions, university exam problems, and GATE questions with verified mathematical proofs and model answers.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="filter-search-bar">
          <div className="search-input-wrapper">
            <SearchIcon size={18} className="search-input-icon" />
            <input 
              type="text" 
              placeholder="Search by topic (e.g. Regularization, Sigmoid, Imbalance)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            {difficulties.map((diff) => (
              <button
                key={diff}
                type="button"
                className={`pill-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff === 'All' ? 'All Difficulties' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Sample Notice */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredPYQs.length}</strong> previous year questions
          </span>
          <span className="sample-badge">Sample Question Bank</span>
        </div>

        {/* PYQs Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredPYQs.map((item) => {
            const isExpanded = !!expandedSolutions[item.id]

            return (
              <div key={item.id} className="card">
                {/* Meta details header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span className="live-badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                      {item.exam}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Academic Year: {item.year}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="pill-btn" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {item.topic}
                    </span>
                    <span className="sample-badge" style={{ 
                      color: item.difficulty === 'Hard' ? '#f43f5e' : '#fbbf24',
                      borderColor: item.difficulty === 'Hard' ? 'rgba(244, 63, 94, 0.3)' : undefined,
                      background: item.difficulty === 'Hard' ? 'rgba(244, 63, 94, 0.1)' : undefined
                    }}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {item.question}
                </div>

                {/* Solution Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleSolution(item.id)}
                  className={`btn ${isExpanded ? 'btn-secondary' : 'btn-outline'} btn-sm`}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <span>{isExpanded ? 'Hide Model Solution' : 'Reveal Verified Solution'}</span>
                  {isExpanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                </button>

                {/* Expanded Solution Section */}
                {isExpanded && (
                  <div style={{
                    marginTop: '1.25rem',
                    padding: '1.25rem',
                    background: 'rgba(10, 13, 20, 0.8)',
                    border: '1px solid var(--border-glow)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    fontSize: '0.925rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 700, marginBottom: '0.75rem' }}>
                      <CheckCircleIcon size={18} />
                      <span>Examiner Verified Solution & Proof</span>
                    </div>

                    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {item.solution}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {filteredPYQs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                No questions found matching your filter. Try adjusting your search query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
