import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'
import CoursesPage from './pages/CoursesPage'
import NotesPage from './pages/NotesPage'
import VideoClassesPage from './pages/VideoClassesPage'
import PYQsPage from './pages/PYQsPage'
import ProjectsPage from './pages/ProjectsPage'
import VSCodeGuidePage from './pages/VSCodeGuidePage'
import GitHubGuidePage from './pages/GitHubGuidePage'
import AITutorPage from './pages/AITutorPage'
import CourseLearningPage from './pages/CourseLearningPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="page-wrapper" style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>404</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Page not found. The path you are looking for does not exist in SkillVerse AI.
        </p>
        <a href="/" className="btn btn-primary">
          Return to Homepage
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseLearningPage />} />
          <Route path="/courses/:courseId/learn" element={<CourseLearningPage />} />
          <Route path="/learn/:courseId" element={<CourseLearningPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/videos" element={<VideoClassesPage />} />
          <Route path="/pyqs" element={<PYQsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/vscode-guide" element={<VSCodeGuidePage />} />
          <Route path="/github-guide" element={<GitHubGuidePage />} />
          <Route path="/ai-tutor" element={<AITutorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
