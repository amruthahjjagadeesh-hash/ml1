import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  UserIcon, 
  LockIcon, 
  MailIcon, 
  BrainIcon, 
  CheckCircleIcon,
  CompassIcon,
  ArrowRightIcon
} from '../components/Icons'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [track, setTrack] = useState('Machine Learning Engineer')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [validationSuccess, setValidationSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: 'None', color: 'var(--text-muted)' }
    if (pass.length < 6) return { score: 1, text: 'Weak', color: '#f43f5e' }
    if (pass.length < 10) return { score: 2, text: 'Medium', color: '#fbbf24' }
    return { score: 3, text: 'Strong', color: '#10b981' }
  }

  const strength = calculatePasswordStrength(password)

  const handleSignup = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    }

    if (!email) {
      newErrors.email = 'Email address is required.'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email.'
    }

    if (!password) {
      newErrors.password = 'Password is required.'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.'
    }

    if (!agreeTerms) {
      newErrors.terms = 'Please accept the terms of service.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setValidationSuccess(false)
      return
    }

    setErrors({})
    setValidationSuccess(true)
  }

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        
        <div className="card" style={{ padding: '2.5rem 2rem', background: 'linear-gradient(180deg, #121a2f 0%, #0c1221 100%)' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" className="brand-logo" style={{ justifyContent: 'center', marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon-box">
                <BrainIcon size={22} />
              </div>
              <span>SkillVerse <span className="gradient-text">AI</span></span>
            </Link>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Create Your Student Account
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Access structured learning roadmaps and study notes.
            </p>
          </div>

          {/* Validation Notice */}
          {validationSuccess && (
            <div className="notice-box success" style={{ marginBottom: '1.5rem', padding: '0.85rem 1rem' }}>
              <CheckCircleIcon size={20} className="notice-icon" style={{ color: '#10b981' }} />
              <div>
                <strong style={{ color: '#10b981' }}>Account Form Validated!</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Welcome {fullName}! Target Track: {track}. (Phase 1 Frontend Foundation: Registration endpoint will connect to database in Phase 2).
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.fullName && (
                <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.35rem', display: 'block' }}>
                  {errors.fullName}
                </span>
              )}
            </div>

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
                  placeholder="alex@example.com"
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.email && (
                <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.35rem', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Target Track */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Target Learning Pathway
              </label>
              <div style={{ position: 'relative' }}>
                <CompassIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select 
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                >
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Deep Learning & Computer Vision">Deep Learning & Computer Vision</option>
                  <option value="Generative AI & LLM Specialist">Generative AI & LLM Specialist</option>
                  <option value="MLOps & Production Systems">MLOps & Production Systems</option>
                  <option value="Python & Mathematics Foundations">Python & Mathematics Foundations</option>
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Create Password
              </label>
              <div style={{ position: 'relative' }}>
                <LockIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                />
              </div>

              {/* Password strength bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div style={{ flex: 1, height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(strength.score / 3) * 100}%`,
                    height: '100%',
                    background: strength.color,
                    transition: 'width 0.3s'
                  }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: strength.color, fontWeight: 600 }}>
                  {strength.text}
                </span>
              </div>

              {errors.password && (
                <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.35rem', display: 'block' }}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Terms checkbox */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.825rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input 
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ width: 'auto', accentColor: 'var(--accent-primary)' }}
                />
                <span>I agree to the educational learning terms and academic code of honor.</span>
              </label>
              {errors.terms && (
                <span style={{ fontSize: '0.75rem', color: '#f43f5e', marginTop: '0.35rem', display: 'block' }}>
                  {errors.terms}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <span>Create Free Account</span>
              <ArrowRightIcon size={16} />
            </button>
          </form>

          {/* Bottom Link to Login */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#818cf8', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
