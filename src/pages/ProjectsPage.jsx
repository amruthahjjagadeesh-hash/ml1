import React, { useState } from 'react'
import { SAMPLE_PROJECTS } from '../data/sampleData'
import { 
  CodeIcon, 
  SearchIcon, 
  ExternalLinkIcon, 
  GitBranchIcon, 
  CheckCircleIcon,
  LayersIcon,
  SparklesIcon
} from '../components/Icons'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Supervised Learning', 'Computer Vision', 'Generative AI', 'Regression & MLOps']

  const filteredProjects = SAMPLE_PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="section-tag">
            <CodeIcon size={14} />
            Industry Portfolio
          </div>
          <h1>End-to-End <span className="gradient-text">Machine Learning Projects</span></h1>
          <p>
            Real-world projects with clean problem formulations, dataset preparation, model training, evaluation metrics, and deployment architectures.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="filter-search-bar">
          <div className="search-input-wrapper">
            <SearchIcon size={18} className="search-input-icon" />
            <input 
              type="text" 
              placeholder="Search projects by tech stack, domain, or model..."
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
            Showing <strong>{filteredProjects.length}</strong> portfolio projects
          </span>
          <span className="sample-badge">Sample Project Specs</span>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Header tags */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="pill-btn active" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                    {project.category}
                  </span>
                  <span className="live-badge">{project.difficulty}</span>
                </div>

                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  {project.title}
                </h2>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {project.overview}
                </p>

                {/* Dataset info */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.25rem'
                }}>
                  <strong style={{ color: '#38bdf8' }}>Dataset: </strong> {project.dataset}
                </div>

                {/* Key Features */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a5b4fc', marginBottom: '0.5rem' }}>
                    Key Architecture Elements:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {project.keyFeatures.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ color: '#10b981', marginTop: '2px' }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack Pills & Action buttons */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="pill-btn" style={{ fontSize: '0.75rem', padding: '0.15rem 0.55rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => alert(`Opening sample repository details for "${project.title}". Repository links and code downloads are part of the Phase 1 curriculum preview.`)}
                  >
                    <GitBranchIcon size={16} />
                    <span>View Repository</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => alert(`Launching live demo container for "${project.title}". Live container hosting will be integrated in Phase 2.`)}
                  >
                    <ExternalLinkIcon size={16} />
                    <span>Project Guide</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
