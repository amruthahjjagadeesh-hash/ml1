import React, { useState } from 'react'
import { GITHUB_GUIDE } from '../data/sampleData'
import { 
  GitBranchIcon, 
  CopyIcon, 
  CheckCircleIcon, 
  AlertCircleIcon 
} from '../components/Icons'

export default function GitHubGuidePage() {
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
            <GitBranchIcon size={14} />
            Version Control & Collaboration
          </div>
          <h1>{GITHUB_GUIDE.title}</h1>
          <p>{GITHUB_GUIDE.summary}</p>
        </div>

        {/* Steps Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Step 1: Git Init & First Commit */}
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
                {GITHUB_GUIDE.sections[0].title}
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {GITHUB_GUIDE.sections[0].details}
            </p>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(GITHUB_GUIDE.sections[0].commands.join('\n'), 'git-step-1')}
                  className="btn btn-secondary btn-sm"
                >
                  {copiedSnippet === 'git-step-1' ? <CheckCircleIcon size={14} style={{ color: '#10b981' }} /> : <CopyIcon size={14} />}
                  <span>{copiedSnippet === 'git-step-1' ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <pre className="code-box" style={{ paddingTop: '2.5rem' }}>
                <code>{GITHUB_GUIDE.sections[0].commands.join('\n')}</code>
              </pre>
            </div>
          </div>

          {/* Step 2: .gitignore Caution */}
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
                {GITHUB_GUIDE.sections[1].title}
              </h2>
            </div>

            <div className="notice-box warning" style={{ marginBottom: '1.25rem' }}>
              <AlertCircleIcon size={20} className="notice-icon" style={{ color: '#fbbf24' }} />
              <div>
                <strong style={{ color: '#fbbf24' }}>Critical ML Repository Rule:</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {GITHUB_GUIDE.sections[1].details}
                </p>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(GITHUB_GUIDE.sections[1].sampleGitignore, 'git-step-2')}
                  className="btn btn-secondary btn-sm"
                >
                  {copiedSnippet === 'git-step-2' ? <CheckCircleIcon size={14} style={{ color: '#10b981' }} /> : <CopyIcon size={14} />}
                  <span>{copiedSnippet === 'git-step-2' ? 'Copied' : 'Copy .gitignore'}</span>
                </button>
              </div>

              <pre className="code-box" style={{ paddingTop: '2.5rem' }}>
                <code>{GITHUB_GUIDE.sections[1].sampleGitignore}</code>
              </pre>
            </div>
          </div>

          {/* Step 3: Branching & PRs */}
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
                {GITHUB_GUIDE.sections[2].title}
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {GITHUB_GUIDE.sections[2].details}
            </p>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(GITHUB_GUIDE.sections[2].commands.join('\n'), 'git-step-3')}
                  className="btn btn-secondary btn-sm"
                >
                  {copiedSnippet === 'git-step-3' ? <CheckCircleIcon size={14} style={{ color: '#10b981' }} /> : <CopyIcon size={14} />}
                  <span>{copiedSnippet === 'git-step-3' ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <pre className="code-box" style={{ paddingTop: '2.5rem' }}>
                <code>{GITHUB_GUIDE.sections[2].commands.join('\n')}</code>
              </pre>
            </div>
          </div>

          {/* Step 4: DVC & Large Files */}
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
                {GITHUB_GUIDE.sections[3].title}
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {GITHUB_GUIDE.sections[3].details}
            </p>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(GITHUB_GUIDE.sections[3].commands.join('\n'), 'git-step-4')}
                  className="btn btn-secondary btn-sm"
                >
                  {copiedSnippet === 'git-step-4' ? <CheckCircleIcon size={14} style={{ color: '#10b981' }} /> : <CopyIcon size={14} />}
                  <span>{copiedSnippet === 'git-step-4' ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <pre className="code-box" style={{ paddingTop: '2.5rem' }}>
                <code>{GITHUB_GUIDE.sections[3].commands.join('\n')}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
