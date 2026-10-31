import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { SAMPLE_COURSES } from '../data/sampleData'
import { getCourseCurriculum } from '../data/courseLessonsData'
import { 
  BookIcon, 
  ChevronDownIcon, 
  ChevronRightIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  CopyIcon, 
  ClockIcon, 
  CodeIcon, 
  SparklesIcon,
  LayersIcon,
  UserIcon
} from '../components/Icons'

export default function CourseLearningPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  // Find course from sample data or fallback to first course
  const course = SAMPLE_COURSES.find(c => c.id === courseId) || SAMPLE_COURSES[0]
  const curriculum = getCourseCurriculum(course)

  // Flatten all lessons across all 5 modules for linear navigation
  const allLessons = curriculum ? curriculum.modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title }))) : []

  // Active lesson state
  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id || null)
  // Expanded modules state
  const [expandedModules, setExpandedModules] = useState(() => {
    const initial = {}
    if (curriculum?.modules) {
      curriculum.modules.forEach((m, idx) => {
        initial[m.id] = idx === 0 // expand first module by default
      })
    }
    return initial
  })
  // Completed lessons state
  const [completedLessons, setCompletedLessons] = useState({})
  const [copiedCode, setCopiedCode] = useState(false)
  const [showChallengeHint, setShowChallengeHint] = useState(false)

  // Update active lesson when courseId changes
  useEffect(() => {
    if (allLessons.length > 0) {
      setActiveLessonId(allLessons[0].id)
      const initial = {}
      curriculum?.modules.forEach((m, idx) => {
        initial[m.id] = idx === 0
      })
      setExpandedModules(initial)
      window.scrollTo(0, 0)
    }
  }, [courseId])

  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0]
  const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < allLessons.length - 1

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }))
  }

  const handleSelectLesson = (lesson) => {
    setActiveLessonId(lesson.id)
    setShowChallengeHint(false)
    // Make sure its parent module is expanded
    setExpandedModules(prev => ({
      ...prev,
      [lesson.moduleId]: true
    }))
    window.scrollTo({ top: 180, behavior: 'smooth' })
  }

  const handleNextLesson = () => {
    if (hasNext) {
      const nextLesson = allLessons[currentIndex + 1]
      handleSelectLesson(nextLesson)
    } else {
      alert(`🎉 Congratulations! You have completed all lessons in "${course.title}".`)
    }
  }

  const handlePrevLesson = () => {
    if (hasPrevious) {
      const prevLesson = allLessons[currentIndex - 1]
      handleSelectLesson(prevLesson)
    }
  }

  const toggleCompleteActive = () => {
    if (!activeLesson) return
    setCompletedLessons(prev => ({
      ...prev,
      [activeLesson.id]: !prev[activeLesson.id]
    }))
  }

  const handleCopyCode = () => {
    if (!activeLesson?.pythonExample) return
    navigator.clipboard?.writeText(activeLesson.pythonExample)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Calculate course completion percentage
  const totalLessonsCount = allLessons.length
  const completedCount = Object.values(completedLessons).filter(Boolean).length
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0

  if (!course) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2>Course not found</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem 0' }}>The requested course could not be loaded.</p>
          <Link to="/courses" className="btn btn-primary">Return to Courses</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper" style={{ paddingTop: '5rem' }}>
      <div className="container">
        
        {/* Navigation Breadcrumb & Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/courses" style={{ color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>← All Courses</span>
            </Link>
            <span>/</span>
            <span>{course.category}</span>
            <span>/</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{course.title}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {course.title}
                </h1>
                <span className="live-badge">{course.level}</span>
                <span className="sample-badge">Interactive Learning Mode</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <UserIcon size={14} style={{ color: '#818cf8' }} />
                  {course.instructor}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ClockIcon size={14} />
                  {course.duration}
                </span>
              </div>
            </div>

            {/* Course Progress Card */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1.25rem',
              minWidth: '220px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Course Progress</span>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>{progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${progressPercent}%`, 
                    height: '100%', 
                    background: 'var(--gradient-brand)',
                    transition: 'width 0.3s ease'
                  }} 
                />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                {completedCount} of {totalLessonsCount} lessons completed
              </div>
            </div>
          </div>
        </div>

        {/* Learning Workspace Grid: Left Sidebar (Syllabus) + Right Workspace (Lesson Content) */}
        <div className="learning-grid">
          
          {/* Left Sidebar: 5 Syllabus Modules & Lessons */}
          <div className="card" style={{ padding: '1.25rem', background: '#0e1424', position: 'sticky', top: '5rem', maxHeight: 'calc(100vh - 6.5rem)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
                <LayersIcon size={18} style={{ color: '#818cf8' }} />
                <span>Course Syllabus ({curriculum.modules.length} Modules)</span>
              </div>
              <span className="sample-badge" style={{ fontSize: '0.7rem' }}>5 Modules</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {curriculum.modules.map((module, mIdx) => {
                const isExpanded = !!expandedModules[module.id]
                const moduleLessons = module.lessons || []
                const isModuleActive = moduleLessons.some(l => l.id === activeLesson?.id)

                return (
                  <div 
                    key={module.id}
                    style={{
                      border: '1px solid',
                      borderColor: isModuleActive ? 'rgba(99, 102, 241, 0.4)' : 'var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      background: isModuleActive ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Module Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, paddingRight: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                          M{mIdx + 1}
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4, color: isModuleActive ? '#a5b4fc' : 'var(--text-primary)' }}>
                          {module.title.replace(/^Module \d+:\s*/, '')}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {moduleLessons.length} {moduleLessons.length === 1 ? 'lesson' : 'lessons'}
                        </span>
                        {isExpanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                      </div>
                    </button>

                    {/* Lessons List inside Module */}
                    {isExpanded && (
                      <div style={{ padding: '0.35rem 0.5rem 0.65rem 0.5rem', borderTop: '1px solid var(--border-subtle)', background: 'rgba(10, 13, 20, 0.4)' }}>
                        {moduleLessons.map((lesson) => {
                          const isActive = activeLesson?.id === lesson.id
                          const isDone = !!completedLessons[lesson.id]

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => handleSelectLesson({ ...lesson, moduleId: module.id, moduleTitle: module.title })}
                              style={{
                                width: '100%',
                                padding: '0.55rem 0.65rem',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                textAlign: 'left',
                                fontSize: '0.825rem',
                                marginBottom: '0.25rem',
                                background: isActive ? 'var(--accent-primary)' : 'transparent',
                                color: isActive ? '#ffffff' : isDone ? '#34d399' : 'var(--text-secondary)',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                                {isDone ? (
                                  <CheckCircleIcon size={14} style={{ color: isActive ? '#ffffff' : '#34d399', flexShrink: 0 }} />
                                ) : (
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#ffffff' : 'var(--text-muted)', flexShrink: 0 }} />
                                )}
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.7rem', opacity: 0.8, flexShrink: 0, marginLeft: '0.5rem' }}>
                                {lesson.duration}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <Link to="/courses" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                <span>Back to All Courses</span>
              </Link>
            </div>
          </div>

          {/* Right Main Learning Workspace */}
          {activeLesson ? (
            <div className="card" style={{ padding: '2rem', background: '#0e1424', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              
              {/* Lesson Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="pill-btn active" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {activeLesson.moduleTitle || 'Active Module'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ClockIcon size={14} />
                      {activeLesson.duration}
                    </span>
                    {completedLessons[activeLesson.id] && (
                      <span className="live-badge">Completed</span>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {activeLesson.title}
                  </h2>
                </div>

                {/* Mark as Done Toggle */}
                <button
                  type="button"
                  onClick={toggleCompleteActive}
                  className={`btn btn-sm ${completedLessons[activeLesson.id] ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    background: completedLessons[activeLesson.id] ? '#10b981' : undefined,
                    borderColor: completedLessons[activeLesson.id] ? '#10b981' : undefined
                  }}
                >
                  <CheckCircleIcon size={16} />
                  <span>{completedLessons[activeLesson.id] ? 'Lesson Completed' : 'Mark Lesson Complete'}</span>
                </button>
              </div>

              {/* Lesson Explanation Section */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookIcon size={18} />
                  <span>Conceptual Foundations & Explanation</span>
                </h3>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.975rem', whiteSpace: 'pre-line' }}>
                  {activeLesson.explanation}
                </div>
              </div>

              {/* Key Takeaways Box */}
              {activeLesson.keyTakeaways && activeLesson.keyTakeaways.length > 0 && (
                <div style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a5b4fc', marginBottom: '0.75rem' }}>
                    Key Engineering Takeaways:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeLesson.keyTakeaways.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span style={{ color: '#10b981', marginTop: '2px' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Python Example Section */}
              {activeLesson.pythonExample && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CodeIcon size={18} />
                      <span>Python Code Example & Implementation</span>
                    </h3>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="btn btn-secondary btn-sm"
                    >
                      {copiedCode ? <CheckCircleIcon size={14} style={{ color: '#10b981' }} /> : <CopyIcon size={14} />}
                      <span>{copiedCode ? 'Copied' : 'Copy Python Code'}</span>
                    </button>
                  </div>

                  <pre className="code-box" style={{ fontSize: '0.875rem' }}>
                    <code>{activeLesson.pythonExample}</code>
                  </pre>
                </div>
              )}

              {/* Practice Challenge Section */}
              {activeLesson.practiceChallenge && (
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '2.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <SparklesIcon size={16} />
                      <span>Hands-on Practice Challenge</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowChallengeHint(!showChallengeHint)}
                      style={{ fontSize: '0.75rem', color: '#fbbf24', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {showChallengeHint ? 'Hide Hint' : 'View Implementation Hint'}
                    </button>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                    {activeLesson.practiceChallenge}
                  </p>

                  {showChallengeHint && (
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.85rem', color: '#fef08a' }}>
                      💡 <strong>Hint:</strong> Remember to test edge cases such as empty input arrays, negative values, and ensure your function handles exceptions gracefully with type validation.
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Action Navigation Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={handlePrevLesson}
                  disabled={!hasPrevious}
                  className="btn btn-secondary"
                  style={{ opacity: hasPrevious ? 1 : 0.4, cursor: hasPrevious ? 'pointer' : 'not-allowed' }}
                >
                  <span>← Previous Lesson</span>
                </button>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Lesson {currentIndex + 1} of {allLessons.length}
                </div>

                <button
                  type="button"
                  onClick={handleNextLesson}
                  className="btn btn-primary"
                >
                  <span>{hasNext ? 'Next Lesson' : 'Complete Course'}</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>

            </div>
          ) : (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Select a lesson from the syllabus sidebar to begin learning.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
