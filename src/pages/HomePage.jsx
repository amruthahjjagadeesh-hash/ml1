import React from 'react'
import { Link } from 'react-router-dom'
import { 
  SAMPLE_COURSES, 
  SAMPLE_ROADMAP, 
  SAMPLE_PROJECTS 
} from '../data/sampleData'
import { 
  BrainIcon, 
  CodeIcon, 
  BookIcon, 
  VideoIcon, 
  FileTextIcon, 
  TerminalIcon, 
  GitBranchIcon, 
  SparklesIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  StarIcon,
  CompassIcon,
  LayersIcon
} from '../components/Icons'

export default function HomePage() {
  const quickLinks = [
    { title: "ML Roadmap", desc: "Step-by-step career pathway from Math to MLOps", path: "/roadmap", icon: CompassIcon, color: "#6366f1" },
    { title: "Course Catalog", desc: "Structured lessons in Python, PyTorch & Classical ML", path: "/courses", icon: BookIcon, color: "#8b5cf6" },
    { title: "Lecture Notes", desc: "Comprehensive theory, formulas, and visual breakdowns", path: "/notes", icon: FileTextIcon, color: "#38bdf8" },
    { title: "Video Classes", desc: "High-yield video modules with topic timestamps", path: "/videos", icon: VideoIcon, color: "#ec4899" },
    { title: "Previous Exam PYQs", desc: "Exam & technical interview questions with full solutions", path: "/pyqs", icon: LayersIcon, color: "#f59e0b" },
    { title: "Industry Projects", desc: "Portfolio-ready machine learning code repositories", path: "/projects", icon: CodeIcon, color: "#10b981" },
    { title: "VS Code Setup", desc: "Optimize VS Code for Python virtual environments & Jupyter", path: "/vscode-guide", icon: TerminalIcon, color: "#06b6d4" },
    { title: "Git & GitHub Guide", desc: "Version control, branching, and DVC for data science", path: "/github-guide", icon: GitBranchIcon, color: "#a855f7" },
    { title: "AI Tutor (Preview)", desc: "Interactive query prompt templates & tutor interface", path: "/ai-tutor", icon: SparklesIcon, color: "#6366f1" },
  ]

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Transparency Banner */}
        <div className="notice-box">
          <SparklesIcon size={20} className="notice-icon" style={{ color: '#a5b4fc' }} />
          <div>
            <strong>Phase 1: Frontend Foundation Active</strong>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Welcome to SkillVerse AI. This frontend architecture features responsive navigation, structured course modules, interactive study notes, and developer guides populated with realistic sample curriculum data. Backend APIs and live AI connections will be connected in Phase 2.
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '3.5rem 0 4.5rem 0' }}>
          <div className="section-tag">
            <SparklesIcon size={14} />
            Next-Gen AI & Machine Learning Education
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: '950px', margin: '0 auto 1.5rem auto' }}>
            Master Machine Learning from <br />
            <span className="gradient-text">First Principles to Production</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            A unified, distraction-free learning ecosystem. Follow interactive roadmaps, study structured mathematical notes, practice university PYQs, and build portfolio-ready ML pipelines.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/roadmap" className="btn btn-primary btn-lg">
              <span>Explore ML Roadmap</span>
              <ArrowRightIcon size={18} />
            </Link>
            <Link to="/courses" className="btn btn-secondary btn-lg">
              <span>Browse All Courses</span>
            </Link>
            <Link to="/ai-tutor" className="btn btn-outline btn-lg">
              <SparklesIcon size={18} />
              <span>AI Tutor UI</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>6 Stages</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full-Stack ML Roadmap</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7' }}>180+ Hrs</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Curated Course Curriculum</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>100% Free</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sample Study Access</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>Zero Fluff</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Code-First & Math-Sound</div>
            </div>
          </div>
        </section>

        {/* Feature Pathways Grid */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Explore the Learning Ecosystem
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Everything an aspiring AI engineer needs, structured into purposeful sections.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.path} to={item.path} className="card" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      flexShrink: 0
                    }}>
                      <Icon size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {item.title}
                        </h3>
                        <ArrowRightIcon size={16} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Featured Roadmap Preview */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-tag">Guided Progression</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Machine Learning Roadmap Highlights</h2>
              <p style={{ color: 'var(--text-secondary)' }}>From mathematical foundations to cutting-edge Generative AI and MLOps.</p>
            </div>
            <Link to="/roadmap" className="btn btn-outline btn-sm">
              <span>View All 6 Stages</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {SAMPLE_ROADMAP.slice(0, 3).map((stage) => (
              <div key={stage.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#818cf8', fontFamily: 'var(--font-mono)' }}>
                    {stage.step}
                  </span>
                  <span className="sample-badge">{stage.duration}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{stage.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>
                  {stage.description}
                </p>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Key Focus Areas:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {stage.topics.slice(0, 2).map((topic, i) => (
                      <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#10b981' }}>✓</span> {topic.split(':')[0]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Courses Showcase */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-tag">Interactive Catalog</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Featured Core Courses</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Master practical skills with structured modules and code demonstrations.</p>
            </div>
            <Link to="/courses" className="btn btn-outline btn-sm">
              <span>View All Courses</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {SAMPLE_COURSES.slice(0, 3).map((course) => (
              <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="pill-btn active" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {course.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#fbbf24' }}>
                      <StarIcon size={15} />
                      <span style={{ fontWeight: 600 }}>{course.rating}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{course.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    {course.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                    <span>{course.duration}</span>
                    <span>{course.enrolled}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to="/courses" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                      <span>Curriculum</span>
                    </Link>
                    <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      <span>Start Course</span>
                      <ArrowRightIcon size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Begin Your AI & ML Journey?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1.05rem' }}>
            Set up your development environment, follow the structured roadmap, and start building real-world machine learning solutions today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn btn-primary btn-lg">
              <span>Create Free Account</span>
              <ArrowRightIcon size={18} />
            </Link>
            <Link to="/vscode-guide" className="btn btn-secondary btn-lg">
              <TerminalIcon size={18} />
              <span>Setup VS Code</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
