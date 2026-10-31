import React, { useState } from 'react'
import { SAMPLE_ROADMAP } from '../data/sampleData'
import { 
  CompassIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ChevronDownIcon, 
  ChevronRightIcon, 
  SparklesIcon,
  LayersIcon
} from '../components/Icons'

export default function RoadmapPage() {
  const [completedSteps, setCompletedSteps] = useState({})
  const [expandedSteps, setExpandedSteps] = useState({ 'step-1': true, 'step-2': true })

  const toggleComplete = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
  }

  const toggleExpand = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
  }

  const totalStages = SAMPLE_ROADMAP.length
  const completedCount = Object.values(completedSteps).filter(Boolean).length
  const progressPercent = Math.round((completedCount / totalStages) * 100)

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <CompassIcon size={14} />
            Career Pathway
          </div>
          <h1>Machine Learning & AI <span className="gradient-text">Master Roadmap</span></h1>
          <p>
            A comprehensive, step-by-step engineering curriculum starting from mathematical foundations and proceeding to full-stack MLOps & Generative AI deployment.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="card" style={{ marginBottom: '2.5rem', background: 'linear-gradient(135deg, rgba(20, 29, 51, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Your Roadmap Progress</span>
                <span className="sample-badge">Local Session Tracker</span>
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Mark stages as completed as you progress through the recommended curriculum.
              </p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              {completedCount} / {totalStages} Stages ({progressPercent}%)
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${progressPercent}%`, 
                height: '100%', 
                background: 'var(--gradient-brand)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Roadmap Stages Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {SAMPLE_ROADMAP.map((stage) => {
            const isCompleted = !!completedSteps[stage.id]
            const isExpanded = !!expandedSteps[stage.id]

            return (
              <div 
                key={stage.id} 
                className="card"
                style={{
                  borderLeft: isCompleted ? '4px solid #10b981' : '4px solid #6366f1',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Stage Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', cursor: 'pointer' }} onClick={() => toggleExpand(stage.id)}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <div style={{
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: isCompleted ? '#10b981' : '#818cf8',
                      lineHeight: 1
                    }}>
                      {stage.step}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {stage.title}
                        </h2>
                        <span className="live-badge">{stage.level}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '750px' }}>
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={(e) => e.stopPropagation()}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ClockIcon size={14} />
                      {stage.duration}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleComplete(stage.id)}
                      className={`btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        background: isCompleted ? '#10b981' : undefined,
                        borderColor: isCompleted ? '#10b981' : undefined
                      }}
                    >
                      <CheckCircleIcon size={16} />
                      <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleExpand(stage.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.45rem' }}
                      aria-label="Toggle stage details"
                    >
                      {isExpanded ? <ChevronDownIcon size={18} /> : <ChevronRightIcon size={18} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a5b4fc' }}>
                      Detailed Learning Milestones
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {stage.topics.map((topic, i) => (
                        <div 
                          key={i}
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.75rem 1rem',
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem'
                          }}
                        >
                          <span style={{ color: '#6366f1', marginTop: '2px' }}>▸</span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tools and Libraries */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                        Recommended Stack:
                      </span>
                      {stage.recommendedTools.map((tool, idx) => (
                        <span key={idx} className="pill-btn" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
