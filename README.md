# SkillVerse AI — Educational AI & Machine Learning Hub

> A responsive, full-stack educational web application engineered with React 18, React Router v6, Vite, and real LLM AI backend integration.

---

## 🌟 Overview & Key Sections

1. **Homepage (`/`)**: Hero section, core value propositions, quick stats bar, interactive ecosystem navigation, featured roadmap preview, and course showcase.
2. **ML Roadmap (`/roadmap`)**: Interactive 6-stage roadmap (Foundations, Python Stack, Classical ML, Deep Learning, Generative AI & LLMs, MLOps & Production) with milestone progress tracker and expandable syllabus.
3. **Course Catalog (`/courses`)**: Academic course catalog with category filters, real-time search, instructor info, rating, and direct "Start Learning Course" workspace navigation.
4. **Lecture Notes (`/notes`)**: Rigorous mathematical breakdowns (Linear Algebra, Gradient Descent, Bias-Variance tradeoff, Transformers), copy markdown functionality, and one-click `.md` download.
5. **Video Classes (`/videos`)**: High-yield visual lectures with real YouTube & direct HTML5 playback, chapter timestamps seeking, and custom video URL tester.
6. **Previous Year Questions (`/pyqs`)**: Exam and technical interview question bank with difficulty tags and verified examiner model solutions.
7. **Hands-on Projects (`/projects`)**: Portfolio-ready machine learning projects (Churn Prediction, Chest X-Ray Vision, Document RAG, House Price Microservice) with datasets, tech stacks, and architecture features.
8. **VS Code Setup Guide (`/vscode-guide`)**: Guide to setting up a production-ready ML workspace on Windows (Python, Pylance, Jupyter, Ruff, GitLens, `.venv`, `settings.json`, shortcuts).
9. **Git & GitHub Guide (`/github-guide`)**: Git workflow for ML engineers, commit conventions, feature branching, `.gitignore` best practices for data science, and DVC.
10. **AI Tutor Page (`/ai-tutor`)**: Live AI tutor connected to a secure backend API route (`/api/ai-tutor/chat`) supporting Groq, OpenAI, Gemini, and Anthropic. Multi-turn dialogue, markdown code rendering, copy snippets, and clickable prompt starters.
11. **Authentication Screens (`/login`, `/signup`)**: Responsive login & signup interfaces with form validation, password strength meter, password visibility toggles, and track selectors.

---

## 🤖 Configuring Live AI Tutor (Environment Variables)

Create a file named `.env` in the root of your project (`c:\Users\User\OneDrive\Desktop\ml\.env`):

```env
# Choose ONE provider below:

# Option 1: Groq (Recommended - Fast, generous free tier)
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Option 2: OpenAI
# OPENAI_API_KEY=sk-proj-your_key_here
# OPENAI_MODEL=gpt-4o-mini

# Option 3: Google Gemini
# GEMINI_API_KEY=AIzaSy_your_key_here
# GEMINI_MODEL=gemini-1.5-flash

# Option 4: Anthropic Claude
# ANTHROPIC_API_KEY=sk-ant-your_key_here
# ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

> **Security Note:** `.env` is explicitly included in `.gitignore`. Your API keys are kept entirely on the server and are never sent to the browser bundle.

---

## 🚀 Running on Windows PowerShell

### 1. Install Dependencies
```powershell
npm install
```

### 2. Start the Application
```powershell
npm run dev
```
The Vite development server with integrated AI Tutor API middleware will start at:
👉 **`http://localhost:3000`** (or `http://localhost:3001`).

### 3. (Optional) Run Standalone Server
```powershell
npm run server
```

---

## 📂 Project Architecture

```
ml/
├── index.html                   # HTML5 template with Google Fonts & SEO meta tags
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite bundler with integrated AI Tutor API middleware
├── .gitignore                   # Ignore node_modules, dist, .env files
├── .env.example                 # Sample environment variables template
├── README.md                    # Project documentation & run guide
├── server/
│   ├── aiTutorService.js        # Multi-provider LLM handler (Groq, OpenAI, Gemini, Anthropic)
│   ├── index.js                 # HTTP server endpoints (/api/ai-tutor/chat & status)
│   └── testAITutor.js           # Diagnostics script
└── src/
    ├── main.jsx                 # Entry point with BrowserRouter
    ├── App.jsx                  # React Router setup & global layout
    ├── index.css                # CSS Design system tokens, chat bubbles, & animations
    ├── components/
    │   ├── Navbar.jsx           # Responsive top navbar with mobile drawer
    │   ├── Footer.jsx           # Educational footer with quick links
    │   ├── Icons.jsx            # Self-contained SVG icon library
    │   └── VideoPlayer.jsx      # Video player for YouTube and HTML5 video
    ├── data/
    │   ├── sampleData.js        # Centralized academic sample curriculum data
    │   └── courseLessonsData.js # Structured course lessons & fallback generator
    └── pages/
        ├── HomePage.jsx         # Homepage
        ├── RoadmapPage.jsx      # Interactive ML Roadmap
        ├── CoursesPage.jsx      # Programming courses catalog
        ├── CourseLearningPage.jsx # Course learning workspace
        ├── NotesPage.jsx        # Theory notes & downloads
        ├── VideoClassesPage.jsx # Video lecture modules
        ├── PYQsPage.jsx         # Previous year question bank
        ├── ProjectsPage.jsx     # Industry ML portfolio projects
        ├── VSCodeGuidePage.jsx  # VS Code developer environment setup
        ├── GitHubGuidePage.jsx  # Git & GitHub workflow guide
        ├── AITutorPage.jsx      # Live AI Tutor chat interface
        ├── LoginPage.jsx        # Login page with validation
        └── SignupPage.jsx       # Registration with password strength
```
