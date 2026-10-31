import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  UserIcon, 
  LockIcon, 
  MailIcon, 
  BrainIcon, 
  CheckCircleIcon,
  AlertCircleIcon,
  ArrowRightIcon
} from '../components/Icons'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationMessage, setValidationMessage] = useState(null)
  const [errors, setErrors] = useState({})

  const handleLogin = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email) {
      newErrors.email = 'Email address is required.'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!password) {
      newErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setValidationMessage(null)
      return
    }

    setErrors({})
    setValidationMessage({
      type: 'success',
      text: `Form validated successfully for ${email}. (Phase 1 Frontend Foundation: Backend JWT session authentication will be wired in Phase 2).`
    })
  }

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        
        {/* Card */}
        <div className="card" style={{ padding: '2.5rem 2rem', background: 'linear-gradient(180deg, #121a2f 0%, #0c1221 100%)' }}>
          
          {/* Brand header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" className="brand-logo" style={{ justifyContent: 'center', marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon-box">
                <BrainIcon size={22} />
              </div>
              <span>SkillVerse <span className="gradient-text">AI</span></span>
            </Link>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Sign in to track roadmap milestones and lecture notes.
            </p>
          </div>

          {/* Validation Notice Banner */}
          {validationMessage && (
            <div className="notice-box success" style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem' }}>
              <CheckCircleIcon size={18} className="notice-icon" style={{ color: '#10b981' }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                {validationMessage.text}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Email Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <MailIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.email && (
                <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.35rem', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={() => alert('Password reset workflow will be linked to backend email service in Phase 2.')}
                  style={{ fontSize: '0.75rem', color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <LockIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ width: '100%', paddingLeft: '2.75rem', paddingRight: '4.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    padding: '0.25rem 0.5rem'
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.35rem', display: 'block' }}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <span>Sign In to Account</span>
              <ArrowRightIcon size={16} />
            </button>
          </form>

          {/* Bottom link to Signup */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Don't have an account yet?{' '}
            <Link to="/signup" style={{ color: '#818cf8', fontWeight: 600 }}>
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
