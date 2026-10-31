import React, { useState } from 'react'
import { VS_CODE_GUIDE } from '../data/sampleData'
import { 
  TerminalIcon, 
  CopyIcon, 
  CheckCircleIcon, 
  SparklesIcon, 
  CodeIcon,
  LayersIcon
} from '../components/Icons'

export default function VSCodeGuidePage() {
  const [copiedSnippet, setCopiedSnippet] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard?.writeText(text)
    setCopiedSnippet(id)
    setTimeout(() => setCopiedSnippet(null), 2000)
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <TerminalIcon size={14} />
            Developer Environment
          </div>
          <h1>{VS_CODE_GUIDE.title}</h1>
          <p>{VS_CODE_GUIDE.summary}</p>
        </div>

        {/* Setup Flow Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Step 1: Extensions */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#ffffff'
              }}>
                1
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {VS_CODE_GUIDE.sections[0].title}
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {VS_CODE_GUIDE.sections[0].details}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {VS_CODE_GUIDE.sections[0].items.map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem'
                }}>
                  <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.35rem', fontSize: '0.95rem' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Virtual Environment Setup */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#ffffff'
              }}>
                2
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {VS_CODE_GUIDE.sections[1].title}
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {VS_CODE_GUIDE.sections[1].details}
            </p>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(VS_CODE_GUIDE.sections[1].commands.join('\n'), 'step-2')}
                  className="btn btn-secondary btn-sm"
                >
                  {copiedSnippet === 'step-2' ? <CheckCircleIcon size={14} style={{ color: '#10b981' }} /> : <CopyIcon size={14} />}
                  <span>{copiedSnippet === 'step-2' ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <pre className="code-box" style={{ paddingTop: '2.5rem' }}>
                <code>{VS_CODE_GUIDE.sections[1].commands.join('\n')}</code>
              </pre>
            </div>
          </div>

          {/* Step 3: settings.json */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#ffffff'
              }}>
                3
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {VS_CODE_GUIDE.sections[2].title}
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {VS_CODE_GUIDE.sections[2].details}
            </p>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(VS_CODE_GUIDE.sections[2].codeSnippet, 'step-3')}
                  className="btn btn-secondary btn-sm"
                >
                  {copiedSnippet === 'step-3' ? <CheckCircleIcon size={14} style={{ color: '#10b981' }} /> : <CopyIcon size={14} />}
                  <span>{copiedSnippet === 'step-3' ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>

              <pre className="code-box" style={{ paddingTop: '2.5rem' }}>
                <code>{VS_CODE_GUIDE.sections[2].codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Step 4: Shortcuts */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#ffffff'
              }}>
                4
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {VS_CODE_GUIDE.sections[3].title}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {VS_CODE_GUIDE.sections[3].shortcuts.map((sc, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {sc.action}
                  </span>
                  <kbd style={{
                    background: '#151f38',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: '#38bdf8'
                  }}>
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
