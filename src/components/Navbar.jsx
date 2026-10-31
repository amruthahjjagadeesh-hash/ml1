import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { 
  BrainIcon, 
  MenuIcon, 
  XIcon, 
  SparklesIcon, 
  UserIcon 
} from './Icons'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'ML Roadmap', path: '/roadmap' },
    { label: 'Courses', path: '/courses' },
    { label: 'Notes', path: '/notes' },
    { label: 'Video Classes', path: '/videos' },
    { label: 'PYQs', path: '/pyqs' },
    { label: 'Projects', path: '/projects' },
    { label: 'VS Code', path: '/vscode-guide' },
    { label: 'GitHub', path: '/github-guide' },
    { label: 'AI Tutor', path: '/ai-tutor', isFeatured: true }
  ]

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="navbar-sticky">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="brand-icon-box">
            <BrainIcon size={22} />
          </div>
          <span>SkillVerse <span className="gradient-text">AI</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''} ${link.isFeatured ? 'gradient-text' : ''}`
              }
            >
              {link.isFeatured && <SparklesIcon size={14} style={{ display: 'inline', marginRight: '4px' }} />}
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="nav-auth-buttons">
          <Link to="/login" className="btn btn-secondary btn-sm">
            <UserIcon size={16} />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            <span>Get Started</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {link.isFeatured && <SparklesIcon size={16} />}
                <span>{link.label}</span>
              </div>
            </NavLink>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link to="/login" className="btn btn-secondary" style={{ flex: 1 }} onClick={closeMenu}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ flex: 1 }} onClick={closeMenu}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
