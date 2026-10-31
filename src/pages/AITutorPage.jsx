import React, { useState, useEffect, useRef } from 'react'
import { 
  SparklesIcon, 
  BrainIcon, 
  TerminalIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  LayersIcon, 
  ArrowRightIcon, 
  CopyIcon,
  ClockIcon
} from '../components/Icons'

export default function AITutorPage() {
  const [selectedDomain, setSelectedDomain] = useState('Deep Learning')
  const [userQuery, setUserQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState({ checked: false, hasApiKey: false, activeProvider: null })
  const [errorMessage, setErrorMessage] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const chatEndRef = useRef(null)

  const promptStarters = [
    {
      domain: 'Mathematics & Optimization',
      title: 'Derive Backpropagation Gradient',
      query: 'Can you show the step-by-step mathematical chain rule derivation for backpropagation through a 2-layer MLP?'
    },
    {
      domain: 'Deep Learning',
      title: 'Self-Attention Intuition',
      query: 'Explain why the Transformer architecture uses Query, Key, and Value vectors and why the dot product is divided by sqrt(d_k).'
    },
    {
      domain: 'Classical ML',
      title: 'L1 vs L2 Regularization Geometry',
      query: 'Why does L1 regularization cause sparsity while L2 causes uniform weight shrinkage? Explain with geometric contour boundaries.'
    },
    {
      domain: 'MLOps & Systems',
      title: 'Detecting Data Drift in Production',
      query: 'What statistical tests (e.g. KS test, PSI) are best suited for detecting feature distribution drift in a live inference pipeline?'
    },
    {
      domain: 'Python & Data Structures',
      title: 'Debug Vectorized Matrix Operation',
      query: 'I am getting a shape mismatch (128, 64) vs (32, 64) when calculating cross-entropy loss in PyTorch. How do I fix this tensor alignment?'
    }
  ]

  // Check backend server status on mount
  useEffect(() => {
    checkServerStatus()
  }, [])

  // Auto-scroll to bottom of chat thread when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const checkServerStatus = async () => {
    try {
      const res = await fetch('/api/ai-tutor/status')
      if (res.ok) {
        const data = await res.json()
        setServerStatus({
          checked: true,
          hasApiKey: data.hasApiKey,
          activeProvider: data.activeProvider
        })
      } else {
        setServerStatus({ checked: true, hasApiKey: false, activeProvider: null })
      }
    } catch (e) {
      console.warn('Could not contact /api/ai-tutor/status:', e)
      setServerStatus({ checked: true, hasApiKey: false, activeProvider: null })
    }
  }

  const handleSelectStarter = (starter, autoSend = false) => {
    setSelectedDomain(starter.domain)
    setUserQuery(starter.query)
    setErrorMessage(null)
    if (autoSend) {
      submitQuery(starter.query, starter.domain)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!userQuery.trim() || isLoading) return
    submitQuery(userQuery.trim(), selectedDomain)
  }

  const submitQuery = async (queryText, domain) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString(),
      domain: domain
    }

    // Add user message to history
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setUserQuery('')
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/ai-tutor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: queryText,
          domain: domain,
          conversationHistory: updatedMessages.map(m => ({ sender: m.sender, text: m.text }))
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        const errText = data.message || `Server responded with status ${response.status}`
        setErrorMessage({
          code: data.error || 'SERVER_ERROR',
          message: errText
        })
        return
      }

      // Append assistant message
      const assistantMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: data.timestamp || new Date().toLocaleTimeString(),
        provider: data.provider,
        model: data.model
      }

      setMessages(prev => [...prev, assistantMessage])
      // Refresh status if not set
      if (!serverStatus.hasApiKey) {
        checkServerStatus()
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setErrorMessage({
        code: 'NETWORK_FAILURE',
        message: 'Could not connect to the backend AI service. Please make sure your server is running and check your connection.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyText = (text, index) => {
    navigator.clipboard?.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleClearChat = () => {
    setMessages([])
    setErrorMessage(null)
  }

  // Helper to render formatted code blocks and markdown paragraphs
  const renderMessageContent = (text) => {
    if (!text) return null
    // Simple block splitter for ```code blocks```
    const parts = text.split(/(```[\s\S]*?```)/g)

    return parts.map((part, idx) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const firstLineEnd = part.indexOf('\n')
        const language = part.slice(3, firstLineEnd).trim() || 'python'
        const code = part.slice(firstLineEnd + 1, -3)

        return (
          <div key={idx} style={{ position: 'relative', margin: '1rem 0' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#090d16',
              border: '1px solid var(--border-subtle)',
              borderBottom: 'none',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              padding: '0.4rem 0.85rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>{language.toUpperCase()}</span>
              <button
                type="button"
                onClick={() => handleCopyText(code, `code-${idx}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: copiedIndex === `code-${idx}` ? '#10b981' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {copiedIndex === `code-${idx}` ? <CheckCircleIcon size={12} /> : <CopyIcon size={12} />}
                <span>{copiedIndex === `code-${idx}` ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="code-box" style={{ borderRadius: '0 0 var(--radius-sm) var(--radius-sm)', marginTop: 0 }}>
              <code>{code}</code>
            </pre>
          </div>
        )
      }

      return (
        <div key={idx} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, marginBottom: '0.5rem' }}>
          {part}
        </div>
      )
    })
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <SparklesIcon size={14} />
            Live Educational AI Mentor
          </div>
          <h1>Interactive <span className="gradient-text">AI Tutor</span></h1>
          <p>
            An engineering assistant connected to a real LLM backend. Ask mathematical derivations, code explanations, debugging questions, and architectural trade-offs.
          </p>
        </div>

        {/* Backend Provider Status Bar */}
        <div style={{ maxWidth: '960px', margin: '0 auto 2rem auto' }}>
          {serverStatus.checked && !serverStatus.hasApiKey && (
            <div className="notice-box warning" style={{ marginBottom: '1.5rem' }}>
              <AlertCircleIcon size={20} className="notice-icon" style={{ color: '#fbbf24' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#fbbf24' }}>AI Provider Key Required for Live Responses:</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem', lineHeight: 1.6 }}>
                  No LLM API key detected on the server. To enable real-time AI responses, create a <code style={{ color: '#38bdf8' }}>.env</code> file in your project root with your key (e.g. <code style={{ color: '#a5b4fc' }}>GROQ_API_KEY=your_key</code> or <code style={{ color: '#a5b4fc' }}>OPENAI_API_KEY=your_key</code>) and restart the server.
                </p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Tip: Groq offers instant, free API keys at <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>console.groq.com</a>.
                </div>
              </div>
            </div>
          )}

          {serverStatus.checked && serverStatus.hasApiKey && (
            <div className="notice-box success" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
              <CheckCircleIcon size={18} className="notice-icon" style={{ color: '#10b981' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  <strong>Connected to Live AI Backend:</strong> Provider active (<span style={{ textTransform: 'capitalize', color: '#34d399', fontWeight: 700 }}>{serverStatus.activeProvider}</span>).
                </span>
                <span className="live-badge" style={{ fontSize: '0.7rem' }}>API READY</span>
              </div>
            </div>
          )}
        </div>

        {/* Main UI Container */}
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Prompt Starters */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a5b4fc' }}>
                Recommended Engineering Prompt Starters:
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click card to load question</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {promptStarters.map((ps, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectStarter(ps)}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 600 }}>
                      {ps.domain}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Click to Load ↵</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {ps.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    "{ps.query}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Chat Console */}
          <div className="card" style={{ background: '#0a0e1a', border: '1px solid var(--border-glow)', padding: '1.5rem' }}>
            
            {/* Console Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="brand-icon-box" style={{ width: '2.25rem', height: '2.25rem' }}>
                  <BrainIcon size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>SkillVerse AI Tutor Engine</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Multi-turn engineering dialogue & code explanations</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Domain Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Domain:</span>
                  <select 
                    value={selectedDomain} 
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.825rem' }}
                  >
                    <option value="Deep Learning">Deep Learning & PyTorch</option>
                    <option value="Classical ML">Classical ML (Scikit-Learn)</option>
                    <option value="Mathematics & Optimization">Mathematics & Optimization</option>
                    <option value="Python & Data Structures">Python & Data Structures</option>
                    <option value="MLOps & Systems">MLOps & Production Systems</option>
                  </select>
                </div>

                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                  >
                    Clear History
                  </button>
                )}
              </div>
            </div>

            {/* Conversation Thread Display Area */}
            <div className="chat-thread-container">
              {messages.length === 0 && !isLoading && !errorMessage && (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#818cf8' }}>
                    <SparklesIcon size={28} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                    How can I assist your Machine Learning journey today?
                  </h4>
                  <p style={{ fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
                    Select a prompt starter above or type your technical question below. I can derive equations, explain neural networks, and debug Python code.
                  </p>
                </div>
              )}

              {/* Render Message Bubbles */}
              {messages.map((msg, index) => (
                <div 
                  key={msg.id || index}
                  className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
                >
                  {/* Message Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ color: msg.sender === 'user' ? '#a5b4fc' : '#38bdf8' }}>
                        {msg.sender === 'user' ? 'You' : 'SkillVerse AI Tutor'}
                      </strong>
                      {msg.provider && (
                        <span className="live-badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                          {msg.provider} ({msg.model})
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'assistant' && (
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.text, `msg-${index}`)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: copiedIndex === `msg-${index}` ? '#10b981' : 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.7rem'
                          }}
                        >
                          {copiedIndex === `msg-${index}` ? <CheckCircleIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{copiedIndex === `msg-${index}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Text Content */}
                  <div>
                    {renderMessageContent(msg.text)}
                  </div>
                </div>
              ))}

              {/* Loading Indicator Spinner */}
              {isLoading && (
                <div className="chat-bubble chat-bubble-assistant" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '2px solid rgba(99, 102, 241, 0.2)',
                    borderTopColor: '#6366f1',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    AI Tutor is synthesizing an explanation for {selectedDomain}...
                  </span>
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {/* Error Notice Display */}
              {errorMessage && (
                <div className="notice-box warning" style={{ margin: '0.5rem 0' }}>
                  <AlertCircleIcon size={20} className="notice-icon" style={{ color: '#f43f5e' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#f43f5e' }}>AI Request Error ({errorMessage.code}):</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.25rem', lineHeight: 1.6 }}>
                      {errorMessage.message}
                    </p>
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user')
                          if (lastUserMsg) {
                            submitQuery(lastUserMsg.text, lastUserMsg.domain || selectedDomain)
                          }
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        Retry Query
                      </button>
                      <button
                        type="button"
                        onClick={() => setErrorMessage(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Prompt Input Box Form */}
            <form onSubmit={handleFormSubmit} style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <textarea
                  rows={3}
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleFormSubmit(e)
                    }
                  }}
                  placeholder={`Ask a question about ${selectedDomain}... (Press Enter to send, Shift+Enter for newline)`}
                  disabled={isLoading}
                  style={{ width: '100%', resize: 'vertical', fontSize: '0.95rem', lineHeight: 1.6 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Supports Markdown, Python code blocks, and math equations
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {userQuery && (
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setUserQuery('')}
                      disabled={isLoading}
                    >
                      Clear
                    </button>
                  )}
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-sm"
                    disabled={isLoading || !userQuery.trim()}
                    style={{
                      opacity: isLoading || !userQuery.trim() ? 0.6 : 1,
                      cursor: isLoading || !userQuery.trim() ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <SparklesIcon size={16} />
                    <span>{isLoading ? 'Thinking...' : 'Send to AI Tutor'}</span>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
