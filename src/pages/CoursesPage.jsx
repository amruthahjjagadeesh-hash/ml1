import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SAMPLE_COURSES } from '../data/sampleData'
import { 
  BookIcon, 
  SearchIcon, 
  StarIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon, 
  LayersIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '../components/Icons'

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCourse, setExpandedCourse] = useState(null)

  const categories = ['All', 'Python', 'Machine Learning', 'Deep Learning', 'MLOps']

  const filteredCourses = SAMPLE_COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.modules.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <BookIcon size={14} />
            Academic Catalog
          </div>
          <h1>Structured <span className="gradient-text">Programming & AI Courses</span></h1>
          <p>
            Curated hands-on courses covering Python programming, machine learning theory, deep learning frameworks, and production MLOps engineering.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="filter-search-bar">
          <div className="search-input-wrapper">
            <SearchIcon size={18} className="search-input-icon" />
            <input 
              type="text" 
              placeholder="Search courses, frameworks, or modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Sample Notice */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}
          </span>
          <span className="sample-badge">Sample Course Catalog</span>
        </div>

        {/* Courses Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
          {filteredCourses.map((course) => {
            const isExpanded = expandedCourse === course.id

            return (
              <div 
                key={course.id} 
                className="card" 
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* Top Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="pill-btn active" style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem' }}>
                      {course.category}
                    </span>
                    <span className="sample-badge">{course.badge}</span>
                  </div>

                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
                    {course.title}
                  </h2>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {course.description}
                  </p>

                  {/* Instructor & Stats */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <UserIcon size={16} style={{ color: '#818cf8' }} />
                      <span>{course.instructor}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <ClockIcon size={14} />
                        {course.duration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fbbf24' }}>
                        <StarIcon size={14} />
                        {course.rating} ({course.enrolled})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expandable Syllabus Section */}
                <div>
                  <button 
                    type="button"
                    onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', marginBottom: '0.75rem' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <LayersIcon size={15} />
                      {isExpanded ? 'Hide Syllabus Modules' : `View Syllabus (${course.modules.length} Modules)`}
                    </span>
                    {isExpanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                  </button>

                  {isExpanded && (
                    <div style={{
                      background: 'rgba(10, 13, 20, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem',
                      marginBottom: '1rem',
                      fontSize: '0.825rem'
                    }}>
                      <div style={{ fontWeight: 600, color: '#a5b4fc', marginBottom: '0.5rem' }}>
                        Course Syllabus & Curriculum:
                      </div>
                      <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                        {course.modules.map((mod, idx) => (
                          <li key={idx}>{mod}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <Link 
                    to={`/courses/${course.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', textDecoration: 'none' }}
                  >
                    <span>Start Learning Course</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              No courses found matching "{searchQuery}". Try selecting "All" or a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
