import React from 'react'
import { Link } from 'react-router-dom'
import { BrainIcon, SparklesIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon-box">
                <BrainIcon size={20} />
              </div>
              <span>SkillVerse <span className="gradient-text">AI</span></span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1rem' }}>
              An open educational foundation for Machine Learning, Artificial Intelligence, and modern software engineering. Learn through curated paths, structured lecture notes, and industry projects.
            </p>
            <div className="sample-badge">
              <span>Frontend Phase 1 Showcase</span>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="footer-col">
            <h4>Curriculum</h4>
            <ul className="footer-links">
              <li><Link to="/roadmap">ML Roadmap</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/notes">Lecture Notes</Link></li>
              <li><Link to="/videos">Video Classes</Link></li>
              <li><Link to="/pyqs">Previous Year Questions</Link></li>
            </ul>
          </div>

          {/* Practical Engineering */}
          <div className="footer-col">
            <h4>Engineering Tools</h4>
            <ul className="footer-links">
              <li><Link to="/projects">Hands-on ML Projects</Link></li>
              <li><Link to="/vscode-guide">VS Code Environment</Link></li>
              <li><Link to="/github-guide">Git & GitHub Guide</Link></li>
              <li><Link to="/ai-tutor">AI Tutor (Preview)</Link></li>
            </ul>
          </div>

          {/* Account & Resources */}
          <div className="footer-col">
            <h4>Community</h4>
            <ul className="footer-links">
              <li><Link to="/login">Student Sign In</Link></li>
              <li><Link to="/signup">Register Account</Link></li>
              <li><a href="#github-repo" onClick={(e) => { e.preventDefault(); alert('SkillVerse AI is currently running in Phase 1 Frontend Foundation.'); }}>Source Code</a></li>
              <li><a href="#discord" onClick={(e) => { e.preventDefault(); alert('Community server joining will open in Phase 2.'); }}>Discord Community</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} SkillVerse AI. Built for machine learning students and engineers.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)' }}>
            <span>Clean Architecture</span>
            <span>Educational License</span>
            <span>No Fake Responses</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
